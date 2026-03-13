
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Plus, Bell, FileText, Zap } from "lucide-react-native";

const quickActions = [
  {
    title: "Add New Prescription",
    description: "Upload or scan a new prescription",
    route: "/prescriptions/add",
    icon: Plus,
    color: "#2563EB",
  },
  {
    title: "Set Reminder",
    description: "Create a medication reminder",
    route: "/reminders/add",
    icon: Bell,
    color: "#16A34A",
  },
  {
    title: "View Reports",
    description: "Check your medication history",
    route: "/reports",
    icon: FileText,
    color: "#9333EA",
  },
];

export default function QuickActions() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Zap size={18} color="#2563EB" />
        <Text style={styles.title}>Quick Actions</Text>
      </View>

      {/* Actions */}
      {quickActions.map((action, index) => {
        const Icon = action.icon;

        return (
          <TouchableOpacity
            key={index}
            style={styles.actionRow}
            onPress={() => router.push(action.route as any)}
          >
            <View
              style={[styles.iconBox, { backgroundColor: action.color }]}
            >
              <Icon size={18} color="white" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDesc}>{action.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    marginBottom: 10,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  actionDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
});
