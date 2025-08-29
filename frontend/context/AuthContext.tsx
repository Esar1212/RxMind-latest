"use client"
import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
  isAuthed: boolean
  setIsAuthed: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthed(!!token)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthed, setIsAuthed }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
