"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface LogoutButtonProps {
  onLogout?: () => void; // 👈 add callback prop
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {setIsAuthed} = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try{

      // 🔑 Remove token from localStorage/sessionStorage
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include"
      });

      setIsAuthed(!res.ok);
      console.log("Logged out successfully!");

      // 🔥 Call parent callback (Navbar)
      //if (onLogout) onLogout();
      alert("Logged out successfully! Redirecting to login page...");

      // Optional: redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Error logging out", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
