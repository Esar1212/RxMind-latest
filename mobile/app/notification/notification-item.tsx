import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------------- TYPES ---------------- */

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "appointment"
  | "medication"
  | "message"
  | "system"
  | "security";

interface NotificationItemProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
  onMarkAsRead?: (id: string) => void;
}

/* ---------------- ICON LOGIC ---------------- */

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "appointment":
      return { name: "calendar", color: "#16a34a" };

    case "medication":
      return { name: "medical", color: "#2563eb" };

    case "message":
      return { name: "chatbubble", color: "#9333ea" };

    case "system":
      return { name: "settings", color: "#ea580c" };

    case "security":
      return { name: "shield-checkmark", color: "#dc2626" };

    case "success":
      return { name: "checkmark-circle", color: "#16a34a" };

    case "warning":
      return { name: "warning", color: "#eab308" };

    default:
      return { name: "information-circle", color: "#2563eb" };
  }
};

/* ---------------- COMPONENT ---------------- */

export default function NotificationItem({
  id,
  type,
  title,
  message,
  time,
  isRead = false,
  onMarkAsRead,
}: NotificationItemProps) {
  const icon = getNotificationIcon(type);

  return (
    <View
      style={[
        styles.container,
        isRead ? styles.readBg : styles.unreadBg,
      ]}
    >
      <View style={styles.row}>
        {/* ICON */}
        <Ionicons
          name={icon.name as any}
          size={24}
          color={icon.color}
        />

        {/* TEXT CONTENT */}
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              isRead ? styles.readText : styles.unreadText,
            ]}
          >
            {title}
          </Text>

          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        {/* MARK READ BUTTON */}
        {!isRead && onMarkAsRead && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onMarkAsRead(id)}
          >
            <Text style={styles.buttonText}>Mark</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderLeftWidth: 4,
    borderRadius: 12,
    marginBottom: 10,
  },

  unreadBg: {
    backgroundColor: "#eef4ff",
    borderLeftColor: "#2563eb",
  },

  readBg: {
    backgroundColor: "white",
    borderLeftColor: "#ddd",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  content: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
  },

  unreadText: { color: "#111" },
  readText: { color: "#666" },

  message: {
    marginTop: 3,
    color: "#555",
  },

  time: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 12,
  },
});
