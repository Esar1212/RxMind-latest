import NotificationItem from "./notification-item";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { NotificationType } from "./notification-item";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};


/* ---------------- MOCK DATA ---------------- */
const mockNotifications : Notification[] = [
  {
    id: "1",
    type: "info",
    title: "New Policy Update",
    message: "Privacy policy updated.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "appointment",
    title: "Appointment Confirmed",
    message: "Your appointment is confirmed.",
    time: "1 day ago",
    isRead: false,
  },
];

// const mockNotifications = [
//   {
//     id: "1",
//     title: "New Policy Update",
//     message: "Privacy policy updated.",
//     time: "2 hours ago",
//     isRead: false,
//   },
//   {
//     id: "2",
//     title: "Appointment Confirmed",
//     message: "Your appointment is confirmed.",
//     time: "1 day ago",
//     isRead: false,
//   },
// ];

// /* ---------------- ITEM COMPONENT ---------------- */

// function NotificationItem({ item, onMark }: any) {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.item,
//         !item.isRead && { backgroundColor: "#eef4ff" },
//       ]}
//       onPress={() => onMark(item.id)}
//     >
//       <Ionicons
//         name={item.isRead ? "mail-open" : "mail-unread"}
//         size={24}
//         color="#2563eb"
//       />

//       <View style={{ flex: 1, marginLeft: 10 }}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.msg}>{item.message}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

/* ---------------- MAIN SCREEN ---------------- */

export default function NotificationsPage() {
  // const [notifications, setNotifications] =
  //   useState(mockNotifications);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);


  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const markAll = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notifications ({unreadCount})
        </Text>

        <TouchableOpacity onPress={markAll}>
          <Ionicons name="checkmark-done" size={22} />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // <NotificationItem item={item} onMark={markAsRead} />
          <NotificationItem
            {...item}
            onMarkAsRead={markAsRead}
          />

        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },

  headerTitle: { fontSize: 18, fontWeight: "bold" },

  item: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
  },

  title: { fontWeight: "bold" },
  msg: { color: "gray", marginTop: 3 },
  time: { fontSize: 12, color: "gray", marginTop: 5 },
});
