import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import crypto from "crypto";

const app = express();
const httpServer = createServer(app);

const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";

const io = new Server(httpServer, {
  cors: { origin: frontendURL },
});

// In-memory stores
const groups = {}; // { groupId: { name, creator, members: [], messages: [] } }
const pendingInvites = {}; // { email: [groupId, ...] }
const socketToEmail = new Map();
const emailToSockets = new Map();

function addSocket(email, socketId) {
  if (!emailToSockets.has(email)) emailToSockets.set(email, new Set());
  emailToSockets.get(email).add(socketId);
  socketToEmail.set(socketId, email);
}
function removeSocket(socketId) {
  const email = socketToEmail.get(socketId);
  if (email) {
    const set = emailToSockets.get(email);
    if (set) {
      set.delete(socketId);
      if (set.size === 0) emailToSockets.delete(email);
    }
  }
  socketToEmail.delete(socketId);
}
function socketsFor(email) {
  return Array.from(emailToSockets.get(email) || []);
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Register user
  socket.on("registerUser", (email) => {
    if (!email) return;
    addSocket(email, socket.id);

    // deliver offline invites
    (pendingInvites[email] || []).forEach((groupId) => {
      const g = groups[groupId];
      if (g) {
        socket.emit("groupInvitation", {
          groupId,
          groupName: g.name,
          from: g.creator,
        });
      }
    });

    // auto-join groups user already belongs to
    Object.entries(groups).forEach(([groupId, g]) => {
      if (g.members.includes(email)) {
        socket.join(groupId);
        socket.emit("joinedGroup", {
          groupId,
          groupName: g.name,
          messages: g.messages,
        });
      }
    });
  });

  // Create a new group
  socket.on("createGroup", ({ groupName, creator, invitees }) => {
    if (!creator || !groupName) return;
    const groupId = crypto.randomUUID();
    groups[groupId] = {
      name: groupName,
      creator,
      members: [creator],
      messages: [],
    };

    // join creator
    socket.join(groupId);

    // notify creator’s UI
    socket.emit("groupCreated", { groupId, groupName, creator });
    socket.emit("joinedGroup", { groupId, groupName, messages: [] });

    // invitations
    (invitees || []).forEach((email) => {
      if (!pendingInvites[email]) pendingInvites[email] = [];
      if (!pendingInvites[email].includes(groupId)) {
        pendingInvites[email].push(groupId);
      }
      socketsFor(email).forEach((sid) => {
        io.to(sid).emit("groupInvitation", {
          groupId,
          groupName,
          from: creator,
        });
      });
    });
  });

  // Accept invitation
  socket.on("respondInvitation", ({ groupId, userEmail, action }) => {
    if (!groups[groupId] || !userEmail) return;
    if (pendingInvites[userEmail]) {
      pendingInvites[userEmail] = pendingInvites[userEmail].filter(
        (id) => id !== groupId
      );
    }
    if (action === "accept") {
      if (!groups[groupId].members.includes(userEmail)) {
        groups[groupId].members.push(userEmail);
      }
      socket.join(groupId);
      socket.emit("joinedGroup", {
        groupId,
        groupName: groups[groupId].name,
        messages: groups[groupId].messages,
      });
      io.to(groupId).emit("systemMessage", `${userEmail} joined the group.`);
    }
  });

  // Messages
  socket.on("chatMessage", ({ groupId, msg }) => {
    if (groups[groupId]) {
      groups[groupId].messages.push(msg);
      if (groups[groupId].messages.length > 100) {
        groups[groupId].messages.shift();
      }
      io.to(groupId).emit("chatMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    removeSocket(socket.id);
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});
