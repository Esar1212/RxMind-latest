"use client"
import { useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { Send, X } from "lucide-react"
import { Sidebar } from "@/components/navigation/sidebar"
import Image from "next/image"

interface Message {
  from?: string
  text: string
  system?: boolean
}
interface User {
  id: string
  email: string
}
interface Group {
  groupId: string
  groupName: string
}

export default function MediBuddyChat() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // group logic
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [invitations, setInvitations] = useState<any[]>([])

  // modal state
  const [showModal, setShowModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupInvitees, setNewGroupInvitees] = useState("")

  const apiBaseurl = process.env.NEXT_PUBLIC_API_BASE_URL

  // fetch user
  useEffect(() => {
    async function fetchUser() {
      try {
        
        const res = await fetch(`${apiBaseurl}/api/medibuddy`, {
          method: "GET",
          credentials: "include"
        })
        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.error("Fetch user error:", err)
        setError("Unable to load user. Please login again.")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [apiBaseurl])

  // collapse sidebar on resize
  useEffect(() => {
    const handle = () => setSidebarCollapsed(window.innerWidth < 1024)
    handle()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [])

  // socket logic
  useEffect(() => {
    if (!user || loading) return

    const newSocket = io("http://localhost:4000")
    setSocket(newSocket)

    newSocket.emit("registerUser", user.email)

    newSocket.on("chatHistory", (msgs: Message[]) => setMessages(msgs))
    newSocket.on("chatMessage", (msg: Message) =>
      setMessages(prev => [...prev, msg])
    )
    newSocket.on("systemMessage", (text: string) =>
      setMessages(prev => [...prev, { system: true, text }])
    )

    newSocket.on("groupCreated", ({ groupId, groupName, creator }) => {
      if (creator === user.email) {
        setGroups(prev => [...prev, { groupId, groupName }])
        setCurrentGroup({ groupId, groupName })
        newSocket.emit("joinGroup", { groupId, userEmail: user.email })
      }
    })

    newSocket.on("groupInvitation", ({ groupId, groupName, from }) => {
      setInvitations(prev => [...prev, { groupId, groupName, from }])
    })

    newSocket.on(
      "joinedGroup",
      ({ groupId, groupName, messages: groupMsgs }) => {
        setCurrentGroup({ groupId, groupName })
        setGroups(prev => {
          if (prev.find(g => g.groupId === groupId)) return prev
          return [...prev, { groupId, groupName }]
        })
        setMessages(groupMsgs)
      }
    )

    return () => {
      newSocket.disconnect()
    }
  }, [user, loading])

  // auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (socket && input.trim() && user && currentGroup) {
      const msg = { from: user.email, text: input }
      socket.emit("chatMessage", { groupId: currentGroup.groupId, msg })
      setInput("")
    }
  }

  const handleCreateGroup = () => {
    if (!socket || !user) return
    if (!newGroupName) return
    const invitees =
      newGroupInvitees.split(",").map(e => e.trim()).filter(Boolean) || []
    socket.emit("createGroup", {
      groupName: newGroupName,
      creator: user.email,
      invitees,
    })
    setShowModal(false)
    setNewGroupName("")
    setNewGroupInvitees("")
  }

  const respondInvitation = (groupId: string, action: "accept" | "reject") => {
    if (!socket || !user) return
    socket.emit("respondInvitation", { groupId, userEmail: user.email, action })
    if (action === "accept") {
      const inv = invitations.find(i => i.groupId === groupId)
      if (inv) {
        setGroups(prev => [...prev, { groupId, groupName: inv.groupName }])
        setCurrentGroup({ groupId, groupName: inv.groupName })
        socket.emit("joinGroup", {
          groupId,
          userEmail: user.email,
        })
      }
    }
    setInvitations(prev => prev.filter(i => i.groupId !== groupId))
  }

  return (
    <div className="relative flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="relative flex-1 flex items-center justify-center min-h-screen bg-transparent text-foreground transition-all duration-300 overflow-auto z-20">
        {/* Background */}
        <div className="absolute left-0 top-0 w-full h-full -z-10">
          <Image
            src="/medibuddy.png"
            alt="MediBuddy Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 w-full">
          {/* Header */}
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Connect and Feel Secure</h1>
              <p className="text-sm text-muted-foreground">
                {currentGroup
                  ? `Group: ${currentGroup.groupName}`
                  : "No group selected"}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  user ? "bg-emerald-500" : "bg-gray-400"
                }`}
              />
              <span className="max-w-[160px] truncate">
                {user?.email ?? "Guest"}
              </span>
            </div>
          </header>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-md border bg-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Invitations */}
          {invitations.length > 0 && (
            <div className="mb-4 rounded-md border bg-yellow-100 p-3 text-sm">
              <h2 className="font-semibold mb-2">Invitations</h2>
              {invitations.map(inv => (
                <div key={inv.groupId} className="flex justify-between mb-1">
                  <span>
                    {inv.groupName} (from {inv.from})
                  </span>
                  <div>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-1"
                      onClick={() => respondInvitation(inv.groupId, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => respondInvitation(inv.groupId, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Groups */}
          {groups.length > 0 && (
            <div className="flex space-x-2 mb-2">
              {groups.map(g => (
                <button
                  key={g.groupId}
                  className={`px-3 py-1 rounded ${
                    currentGroup?.groupId === g.groupId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setCurrentGroup(g)
                    socket?.emit("joinGroup", {
                      groupId: g.groupId,
                      userEmail: user?.email,
                    })
                  }}
                >
                  {g.groupName}
                </button>
              ))}
            </div>
          )}

          {/* Chat */}
          <section className="flex h-[70vh] flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && !loading && (
                <p className="text-center text-sm text-muted-foreground">
                  Create or join a group from any pending invitation to start chatting!
                </p>
              )}
              {messages.map((m, idx) =>
                m.system ? (
                  <div
                    key={idx}
                    className="text-center text-gray-500 text-sm italic"
                  >
                    {m.text}
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={`flex ${
                      m.from === user?.email ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[80%]">
                      <div
                        className={`mb-1 text-xs ${
                          m.from === user?.email
                            ? "text-primary text-right"
                            : "text-gray-500"
                        }`}
                      >
                        {m.from}
                      </div>
                      <div
                        className={`${
                          m.from === user?.email
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-black"
                        } rounded-2xl px-4 py-2`}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                )
              )}
              <div ref={messagesEndRef} />
            </div>

            {currentGroup && (
              <div className="border-t bg-card px-3 py-3">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 rounded-full border px-4 py-2 text-sm"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                  />
                  <button
                    className="rounded-full bg-primary px-4 py-2 text-sm text-white"
                    onClick={sendMessage}
                    disabled={!input.trim() || !user}
                  >
                    <Send />
                  </button>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Press Enter to send
                </p>
              </div>
            )}
          </section>

          {/* Loading */}
          {loading && (
            <div className="fixed inset-0 z-30 grid place-items-center bg-background/40">
              <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-sm shadow">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Loading your previous chats...
              </div>
            </div>
          )}

          {/* Create Group Button */}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            ➕ New Group
          </button>
        </div>

        {/* Inline Modal */}
        {showModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>
              <h2 className="text-lg font-bold mb-4">Create New Group</h2>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mb-3"
                placeholder="Group Name"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
              />
              <textarea
                className="w-full border rounded px-3 py-2 mb-3"
                placeholder="Invitee emails (comma separated)"
                value={newGroupInvitees}
                onChange={e => setNewGroupInvitees(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                  onClick={handleCreateGroup}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
