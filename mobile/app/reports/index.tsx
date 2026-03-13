import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------------- MOCK DATA ---------------- */

const reports = [
  {
    id: "P-001",
    type: "Prescription Fill",
    provider: "RxCare Pharmacy",
    date: "July 15, 2024",
    category: "prescription",
  },
  {
    id: "L-045",
    type: "Lab Report",
    provider: "Health Diagnostics Lab",
    date: "July 12, 2024",
    category: "lab",
  },
];

const adherenceData = [
  { medication: "Medication A", adherence: 95 },
  { medication: "Medication B", adherence: 87 },
];

/* ---------------- SCREEN ---------------- */

export default function ReportsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredReports = reports.filter((r) =>
    selectedFilter === "all" ? true : r.category === selectedFilter
  );

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Reports & History</Text>
      <Text style={styles.subtitle}>
        View your medical history
      </Text>

      {/* FILTER BUTTONS */}
      <View style={styles.filterRow}>
        {["all", "prescription", "lab"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setSelectedFilter(f)}
            style={[
              styles.filterBtn,
              selectedFilter === f && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === f && { color: "white" },
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ADHERENCE CHART */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Medication Trends</Text>

        {adherenceData.map((item, i) => (
          <View key={i} style={{ marginBottom: 12 }}>
            <Text style={styles.medName}>
              {item.medication}
            </Text>

            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  { width: `${item.adherence}%` },
                ]}
              />
            </View>

            <Text style={styles.percent}>
              {item.adherence}%
            </Text>
          </View>
        ))}
      </View>

      {/* REPORT LIST */}
      {filteredReports.map((r) => (
        <View key={r.id} style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="document-text"
              size={22}
              color="#2563eb"
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.reportTitle}>
                {r.type}
              </Text>

              <Text style={styles.provider}>
                {r.provider}
              </Text>

              <Text style={styles.date}>
                {r.date} • {r.id}
              </Text>
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnOutline}>
              <Text style={styles.btnText}>
                View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnPrimary}>
              <Text style={{ color: "white" }}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {filteredReports.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No reports found
        </Text>
      )}
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f7ff" },

  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "gray", marginBottom: 16 },

  filterRow: { flexDirection: "row", gap: 10, marginBottom: 20 },

  filterBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  activeFilter: { backgroundColor: "#2563eb" },

  filterText: { fontWeight: "600" },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  medName: { fontWeight: "600" },

  barBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 4,
  },

  barFill: {
    height: 8,
    backgroundColor: "#2563eb",
    borderRadius: 10,
  },

  percent: { fontSize: 12, marginTop: 2 },

  row: { flexDirection: "row", alignItems: "center" },

  reportTitle: { fontWeight: "bold", fontSize: 16 },
  provider: { color: "gray" },
  date: { fontSize: 12, color: "gray" },

  btnRow: { flexDirection: "row", gap: 10, marginTop: 10 },

  btnOutline: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#2563eb",
  },

  btnPrimary: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#2563eb",
  },

  btnText: { color: "#2563eb" },
});
