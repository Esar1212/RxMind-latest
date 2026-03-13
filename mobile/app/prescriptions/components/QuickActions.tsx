import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import {
  RefreshCw,
  Download,
  Bell,
  AlertTriangle,
  Zap,
} from "lucide-react-native";

const quickActions = [
  {
    title: "Request Refill",
    description: "Order refills for your medications",
    icon: RefreshCw,
    color: "#2563EB",
    count: "3 available",
  },
  {
    title: "Download History",
    description: "Get your medication history report",
    icon: Download,
    color: "#16A34A",
    count: "PDF format",
  },
  {
    title: "Schedule Reminder",
    description: "Set up medication reminders",
    icon: Bell,
    color: "#9333EA",
    count: "6 medications",
  },
  {
    title: "View Interactions",
    description: "Check drug interactions",
    icon: AlertTriangle,
    color: "#EA580C",
    count: "Safety check",
  },
];

export default function QuickActions() {
  const renderItem = ({ item }: any) => {
    const Icon = item.icon;

    return (
      <Pressable style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: item.color }]}>
          <Icon size={22} color="white" />
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.count}>{item.count}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Zap size={18} color="#2563EB" />
        <Text style={styles.headerText}>Quick Actions</Text>
      </View>

      <FlatList
        data={quickActions}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },

  card: {
    backgroundColor: "white",
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  desc: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },

  count: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 6,
  },
});
