
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Clock, Pill } from "lucide-react-native";

const upcomingReminders = [
  {
    id: 1,
    medication: "Vitamin D3",
    dosage: "1 tablet",
    time: "8:00 AM",
    bg: "#FFF7ED",
    text: "#9A3412",
    pillColor: "#F97316",
  },
  {
    id: 2,
    medication: "Amoxicillin",
    dosage: "500 mg capsule",
    time: "1:00 PM",
    bg: "#EFF6FF",
    text: "#1D4ED8",
    pillColor: "#3B82F6",
  },
  {
    id: 3,
    medication: "Insulin (Humalog)",
    dosage: "10 units",
    time: "7:00 PM",
    bg: "#ECFDF5",
    text: "#047857",
    pillColor: "#10B981",
  },
];

export default function UpcomingReminders() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Clock size={18} color="#2563EB" />
        <Text style={styles.title}>Upcoming Reminders</Text>
      </View>

      {/* Reminder List */}
      {upcomingReminders.map((reminder) => (
        <View
          key={reminder.id}
          style={[
            styles.reminderCard,
            { backgroundColor: reminder.bg, borderColor: reminder.text },
          ]}
        >
          <View style={styles.row}>
            <View
              style={[
                styles.pillIcon,
                { backgroundColor: reminder.pillColor },
              ]}
            >
              <Pill size={16} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.medName}>{reminder.medication}</Text>
              <Text style={styles.dosage}>{reminder.dosage}</Text>
            </View>

            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{reminder.time}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* View All Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View All Reminders</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  reminderCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  pillIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  medName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  dosage: {
    fontSize: 12,
    color: "#6B7280",
  },

  timeBadge: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
