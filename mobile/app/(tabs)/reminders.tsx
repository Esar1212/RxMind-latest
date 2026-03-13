import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

/* ---------------- MOCK DATA ---------------- */

const reminders = [
  {
    id: 1,
    medication: "Amoxicillin",
    dosage: "500mg",
    time: "8:00 AM",
    frequency: "Twice daily",
    nextDue: "Today, 8:00 PM",
    status: "active",
    color: "#3b82f6",
  },
  {
    id: 2,
    medication: "Lisinopril",
    dosage: "10mg",
    time: "9:00 AM",
    frequency: "Once daily",
    nextDue: "Tomorrow, 9:00 AM",
    status: "active",
    color: "#22c55e",
  },
  {
    id: 3,
    medication: "Vitamin D3",
    dosage: "1000 IU",
    time: "12:00 PM",
    frequency: "Once daily",
    nextDue: "Today, 12:00 PM",
    status: "overdue",
    color: "#f97316",
  },
  {
    id: 4,
    medication: "Metformin",
    dosage: "850mg",
    time: "7:00 PM",
    frequency: "Twice daily",
    nextDue: "Today, 7:00 PM",
    status: "completed",
    color: "#8b5cf6",
  },
];

/* ---------------- SCREEN ---------------- */

export default function RemindersPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filtered = reminders.filter((r) =>
    selectedFilter === "all" ? true : r.status === selectedFilter
  );

  const getStatusColor = (status: string) => {
    if (status === "overdue") return "#ef4444";
    if (status === "completed") return "#22c55e";
    return "#3b82f6";
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Medication Reminders</Text>
          <Text style={styles.subtitle}>
            Never miss a dose
          </Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* FILTER TABS */}
      <View style={styles.tabs}>
        {["all", "active", "overdue", "completed"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setSelectedFilter(f)}
            style={[
              styles.tabBtn,
              selectedFilter === f && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedFilter === f && { color: "white" },
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <StatCard
          label="Total"
          value={reminders.length}
          icon="notifications"
          color="#3b82f6"
        />
        <StatCard
          label="Active"
          value={reminders.filter((r) => r.status === "active").length}
          icon="check-circle"
          color="#22c55e"
        />
        <StatCard
          label="Overdue"
          value={reminders.filter((r) => r.status === "overdue").length}
          icon="error"
          color="#ef4444"
        />
      </View>

      {/* LIST */}
      {filtered.map((r) => (
        <View key={r.id} style={styles.card}>
          <View style={styles.cardRow}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: r.color },
              ]}
            >
              <Ionicons name="medkit" size={22} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.medName}>
                {r.medication}
              </Text>
              <Text style={styles.small}>
                {r.dosage} • {r.frequency}
              </Text>

              <View style={styles.timeRow}>
                <Text style={styles.small}>
                  ⏰ {r.time}
                </Text>
                <Text style={styles.small}>
                  Next: {r.nextDue}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <MaterialIcons
                name="circle"
                size={14}
                color={getStatusColor(r.status)}
              />
              <Text style={styles.status}>
                {r.status}
              </Text>
            </View>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  label,
  value,
  icon,
  color,
}: any) {
  return (
    <View style={styles.statCard}>
      <MaterialIcons name={icon} size={28} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f7ff",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
  },

  addBtn: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  addText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "600",
  },

  tabs: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  tabActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: "white",
    width: "31%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },

  statLabel: {
    color: "#666",
    fontSize: 12,
  },

  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  medName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  small: {
    color: "#666",
    fontSize: 12,
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  status: {
    fontSize: 12,
    textTransform: "capitalize",
  },
});
