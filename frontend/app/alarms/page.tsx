"use client";

import { useCallback, useEffect, useState } from "react";

type Notification = {
  id: number;
  scheduled_time: string;
  medicine: { medicine_name: string };
};

export default function AlarmPage() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin.replace(":3000", ":3001")
      : "");

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [active, setActive] = useState<Notification | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("rxmind_audio_unlocked") === "1";
    } catch {
      return false;
    }
  });

  const [Capacitor, setCapacitor] = useState<any>(null);
  const [LocalNotifications, setLocalNotifications] = useState<any>(null);

  const isNativeAndroid =
    typeof window !== "undefined" &&
    Capacitor?.isNativePlatform &&
    Capacitor?.getPlatform() === "android";

  // Initialize alarm audio
  useEffect(() => {
    if (isNativeAndroid) return;
    const alarmAudio = new Audio("/alarm.mp3");
    alarmAudio.loop = true;
    alarmAudio.volume = 0.9;
    alarmAudio.preload = "auto";
    alarmAudio.setAttribute("data-background", "true");
    alarmAudio.addEventListener("play", () => setIsPlaying(true));
    alarmAudio.addEventListener("pause", () => setIsPlaying(false));
    alarmAudio.addEventListener("ended", () => setIsPlaying(false));
    setAudio(alarmAudio);
  }, [isNativeAndroid]);

  // Capacitor dynamic imports
  useEffect(() => {
    if (typeof window === "undefined") return;
    (async () => {
      const capMod = await import("@capacitor/core");
      setCapacitor(capMod.Capacitor);
      const lnMod = await import("@capacitor/local-notifications");
      setLocalNotifications(lnMod.LocalNotifications);
    })();
  }, []);

  // Unlock audio on user interaction
  const unlockAudio = useCallback(async () => {
    if (!audio || audioUnlocked || isNativeAndroid) return;
    try {
      const prev = audio.volume;
      audio.volume = 0;
      await audio.play();
      await new Promise((r) => setTimeout(r, 50));
      audio.pause();
      audio.currentTime = 0;
      audio.volume = prev;
      setAudioUnlocked(true);
      localStorage.setItem("rxmind_audio_unlocked", "1");
      console.log("🔓 Audio unlocked by user");

      // Auto-play if there’s an active notification
      if (active && audio) {
        audio.currentTime = 0;
        await audio.play();
        console.log("🔊 Browser alarm started automatically");
      }
    } catch (e) {
      console.log("❌ Failed to unlock audio:", e);
    }
  }, [audio, audioUnlocked, isNativeAndroid, active]);

  // Native notifications setup
  const setupNativeNotifications = useCallback(async () => {
    if (!isNativeAndroid || !LocalNotifications) return;
    console.log("📱 Initializing native notifications...");
    try {
      await LocalNotifications.requestPermissions();
      const res = await fetch(`${API_BASE}/api/notifications/upcoming`);
      const data: Notification[] = await res.json();
      await LocalNotifications.cancel({ notifications: [] });
      const scheduled = data.map((item) => ({
        id: item.id,
        title: "Time to take your medicine 💊",
        body: `Please take ${item.medicine.medicine_name}`,
        schedule: { at: new Date(item.scheduled_time), allowWhileIdle: true },
        sound: "alarm.mp3",
        smallIcon: "ic_launcher",
      }));
      await LocalNotifications.schedule({ notifications: scheduled });
      console.log("✅ Native alarms scheduled successfully:", scheduled);
    } catch (err) {
      console.error("❌ Failed to setup native notifications:", err);
    }
  }, [API_BASE, isNativeAndroid, LocalNotifications]);

  // Init fetch loop
  useEffect(() => {
    if (isNativeAndroid && LocalNotifications) {
      setupNativeNotifications();
    } else {
      const id = setInterval(fetchNotifications, 5000);
      return () => clearInterval(id);
    }
  }, [setupNativeNotifications, isNativeAndroid, LocalNotifications]);

  // Fetch due notifications
  const fetchNotifications = useCallback(async () => {
    if (isNativeAndroid) return;
    try {
      const res = await fetch(`${API_BASE}/api/notifications/due`);
      if (!res.ok) return;
      const data: Notification[] = await res.json();
      if (data.length > 0) {
        setActive(data[0]);
        if (audio && !isPlaying && audioUnlocked) {
          try {
            audio.currentTime = 0;
            await audio.play();
            console.log("🔊 Browser alarm started");
          } catch (error) {
            console.error("❌ Failed to play alarm sound:", error);
          }
        }
      } else {
        setActive(null);
        if (audio && isPlaying) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  }, [API_BASE, audio, isPlaying, audioUnlocked, isNativeAndroid]);

  const acknowledge = async (action: "taken" | "snooze") => {
    if (!active) return;
    try {
      await fetch(`${API_BASE}/api/notifications/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: active.id, action }),
      });
    } catch (error) {
      console.error("❌ Failed to acknowledge notification:", error);
    }
  };

  const handleTaken = async () => {
    if (!isNativeAndroid && audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
    await acknowledge("taken");
    setActive(null);
    alert("✅ Medicine Taken!");
  };

  const handleSnooze = async () => {
    if (!isNativeAndroid && audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
    await acknowledge("snooze");
    setActive(null);
    alert("⏰ Snoozed! You'll be reminded again soon.");
  };

  // ✅ Render
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-b from-rose-50 to-white px-4">
      <div className="w-full max-w-2xl relative">
        {/* Click-to-unlock overlay */}
        {!audioUnlocked && active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <button
              onClick={unlockAudio}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
            >
              Click to Start Alarm 🔊
            </button>
          </div>
        )}

        {!active ? (
          <div className="text-center">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
              <span className="text-4xl">🔕</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              No active alarms
            </h2>
            <p className="text-gray-500 mt-1">
              {isNativeAndroid
                ? "Alarms will trigger natively even if the app is closed."
                : "We'll alert you with push notifications and sound when it's time to take your medicine."}
            </p>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl">
            <div className="relative p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl">⏰</span>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Time to take{" "}
                    <span className="text-rose-600">
                      {active.medicine.medicine_name}
                    </span>
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <button
                  onClick={handleTaken}
                  className="w-full rounded-2xl bg-green-600 px-6 py-5 text-white font-semibold text-lg shadow-lg hover:bg-green-700"
                >
                  ✅ Taken
                </button>

                <button
                  onClick={handleSnooze}
                  className="w-full rounded-2xl bg-yellow-500 px-6 py-5 text-white font-semibold text-lg shadow-lg hover:bg-yellow-600"
                >
                  😴 Snooze 5 min
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                {isNativeAndroid
                  ? "📱 Native alarms will ring even if the app is closed."
                  : "💡 Keep this tab open for background audio!"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
