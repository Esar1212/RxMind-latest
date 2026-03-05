"use client"
import { createContext, useContext, useState, useEffect } from "react"
import {jwtDecode} from "jwt-decode"

type AuthContextType = {
  isAuthed: boolean
  setIsAuthed: (value: boolean) => void
}

type JwtPayload = {
  exp: number
  [key: string]: any
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token)

        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthed(true)
        } else {
          setIsAuthed(false)
          localStorage.removeItem("token") // expired token
        }
      } catch (err) {
        setIsAuthed(false)
        localStorage.removeItem("token") // invalid token
      }
    } else {
      setIsAuthed(false)
    }
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
