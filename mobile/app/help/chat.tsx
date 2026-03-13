import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

/* ---------------- INITIAL MESSAGES ---------------- */

const initialMessages = [
  {
    message: "Hello! Thank you for contacting RxCare support.",
    time: "10:00 AM",
    isUser: false,
    senderName: "Sarah M.",
  },
  {
    message: "Hi! I need help understanding my prescription.",
    time: "10:01 AM",
    isUser: true,
  },
];

/* ---------------- CHAT BUBBLE COMPONENT ---------------- */

function ChatBubble({ message, time, isUser }: any) {
  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.agentBubble,
      ]}
    >
      <Text style={isUser ? styles.userText : styles.agentText}>
        {message}
      </Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

/* ---------------- MAIN SCREEN ---------------- */

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages([
      ...messages,
      { message: newMessage, time: timeString, isUser: true },
    ]);

    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/help" as any)}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Live Chat Support</Text>
          <Text style={styles.subText}>Connected to Sarah M.</Text>
        </View>

        <View style={styles.online}>
          <View style={styles.dot} />
          <Text style={{ color: "green", fontSize: 12 }}>Online</Text>
        </View>
      </View>

      {/* CHAT LIST */}
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => <ChatBubble {...item} />}
      />

      {/* INPUT AREA */}
      <View style={styles.inputBar}>
        <TouchableOpacity>
          <Ionicons name="attach" size={22} color="gray" />
        </TouchableOpacity>

        <TextInput
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
          style={styles.sendBtn}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  headerTitle: { fontSize: 18, fontWeight: "bold" },
  subText: { fontSize: 12, color: "gray" },

  online: { flexDirection: "row", alignItems: "center" },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "green",
    borderRadius: 10,
    marginRight: 5,
  },

  bubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },

  userBubble: {
    backgroundColor: "#2563eb",
    alignSelf: "flex-end",
  },

  agentBubble: {
    backgroundColor: "white",
    alignSelf: "flex-start",
  },

  userText: { color: "white" },
  agentText: { color: "#333" },

  time: { fontSize: 10, marginTop: 5, opacity: 0.6 },

  inputBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },

  sendBtn: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 20,
  },
});
