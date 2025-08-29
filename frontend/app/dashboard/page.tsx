"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/navigation/sidebar"
import { UpcomingReminders } from "@/components/dashboard/upcoming-reminders"
import { AdherenceChart } from "@/components/dashboard/adherence-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

interface Prescription {
  id: string
  name: string
  active: boolean
}

interface Notification {
  id: string
  message: string
  createdAt: string
}

interface User {
  id: string
  email: string
  prescriptions?: Prescription[]
  notifications?: Notification[]
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiBaseurl = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("token") // ✅ read token from localStorage
        if (!token) {
          throw new Error("No token found")
        }

        const res = await fetch(`${apiBaseurl}/api/dashboard`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ attach token
          },
        })

        if (!res.ok) throw new Error("Failed to fetch dashboard data")

        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
        setError("Unable to load dashboard data. Please login again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [apiBaseurl])

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    }
    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handle = () => setSidebarCollapsed(window.innerWidth < 1024)
    handle()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading dashboard...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className={`flex-1 transition-all duration-300 overflow-auto ${
          !sidebarCollapsed ? "shadow-2xl shadow-black/40 ring-1 ring-black/10" : ""
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold font-serif text-gray-800">
                  Welcome back, {user?.email}
                </h1>
                <p className="text-gray-600 mt-1">{currentDate}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{currentTime}</div>
                  <div className="text-sm text-gray-500">Current Time</div>
                </div>
                <Link href="/notifications" className="relative">
                  <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Link>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Doses</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {user?.prescriptions?.length ?? 0}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Pending
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Adherence Rate</p>
                      <p className="text-2xl font-bold text-green-600">89%</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Good
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Meds</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {user?.prescriptions?.filter(p => p.active).length ?? 0}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Next Refill</p>
                      <p className="text-2xl font-bold text-purple-600">5</p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Days
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <UpcomingReminders />
              <AdherenceChart />
            </div>

            <div className="space-y-6">
              <QuickActions />
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {user?.notifications && user.notifications.length > 0 ? (
                      user.notifications.slice(0, 3).map((note, i) => (
                        <div key={note.id || i} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{note.message}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(note.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No recent activity</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
