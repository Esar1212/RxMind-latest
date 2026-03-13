import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Settings, User } from "lucide-react-native";

/* MOCK HOOK — replace with your real hook */
const useCurrentUser = () => {
  return {
    user: {
      email: "souma@gmail.com",
      phone_number: "9876543210",
      age: 22,
    },
  };
};

export default function SettingsScreen() {
  const { user: me } = useCurrentUser();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    if (me) {
      setUser({
        name: me.email.split("@")[0],
        email: me.email,
        phone: me.phone_number,
        age: me.age + " years",
      });
    }
  }, [me]);

  const [preferences, setPreferences] = useState({
    emailUpdates: true,
    smsAlerts: true,
    promotionalOffers: false,
    appointmentReminders: true,
    prescriptionReminders: true,
    healthTips: true,
    messageNotifications: true,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Settings size={28} color="#2563EB" />
        <Text style={styles.title}>Account Settings</Text>
      </View>

      <Text style={styles.subtitle}>
        Manage your account and preferences
      </Text>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <User size={28} color="white" />
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.age}>{user.age}</Text>
      </View>

      {/* ACCOUNT INFO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Phone" value={user.phone} />
        <InfoRow label="Age" value={user.age} />
      </View>

      {/* PREFERENCES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        {Object.entries(preferences).map(([key, value]) => (
          <InfoRow key={key} label={key} value={value ? "ON" : "OFF"} />
        ))}
      </View>
    </ScrollView>
  );
}

/* SIMPLE REUSABLE ROW */
function InfoRow({ label, value }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },

  email: {
    color: "#DBEAFE",
  },

  age: {
    color: "#BFDBFE",
    marginTop: 4,
  },

  section: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  rowLabel: {
    color: "#6B7280",
  },

  rowValue: {
    fontWeight: "600",
  },
});
