import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Bell, ArrowLeft } from "lucide-react-native";

export default function PrescriptionsScreen() {
  const router = useRouter();

  const summary = [
    { label: "Active Medications", value: "6", color: "#2563EB" },
    { label: "Due for Refill", value: "2", color: "#EA580C" },
    { label: "Prescriptions", value: "12", color: "#16A34A" },
    { label: "Doctors", value: "6", color: "#9333EA" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.push("/")}>
            <ArrowLeft size={24} color="#374151" />
          </Pressable>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.title}>My Prescriptions</Text>
            <Text style={styles.subtitle}>
              Manage your medications and prescriptions
            </Text>
          </View>

          <Pressable>
            <Bell size={24} color="#374151" />
          </Pressable>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.summaryGrid}>
          {summary.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={[styles.cardValue, { color: item.color }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsRow}>
            <Pressable
              style={styles.actionBtn}
              onPress={() => router.push("/prescriptions/add")}
            >
              <Text style={styles.actionText}>Add Prescription</Text>
            </Pressable>

            <Pressable
              style={styles.actionBtn}
              onPress={() => router.push("/reports" as any)}
            >
              <Text style={styles.actionText}>View Reports</Text>
            </Pressable>
          </View>
        </View>

        {/* PRESCRIPTION LIST PLACEHOLDER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescription List</Text>
          <Text style={styles.placeholder}>
            Table UI will go here
          </Text>
        </View>

        {/* DOCUMENTS PLACEHOLDER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <Text style={styles.placeholder}>
            Uploaded prescription files will appear here
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  cardLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    width: "48%",
  },

  actionText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },

  placeholder: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 10,
  },
});
