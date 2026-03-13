import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TrendingUp } from "lucide-react-native";

const weeklyData = [
  { day: "M", percentage: 100 },
  { day: "T", percentage: 85 },
  { day: "W", percentage: 90 },
  { day: "T", percentage: 75 },
  { day: "F", percentage: 95 },
  { day: "S", percentage: 80 },
  { day: "S", percentage: 100 },
];

export default function AdherenceChart() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TrendingUp size={18} color="#2563EB" />
        <Text style={styles.title}>Weekly Adherence</Text>
      </View>

      {/* Chart Bars */}
      <View style={styles.chartRow}>
        {weeklyData.map((data, index) => (
          <View key={index} style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { height: data.percentage * 0.6 }, // scale height
              ]}
            />
            <Text style={styles.dayText}>{data.day}</Text>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <Text style={styles.weekText}>This Week</Text>

        <View style={styles.legendGroup}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#2563EB" }]} />
            <Text style={styles.legendText}>Medication A</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#60A5FA" }]} />
            <Text style={styles.legendText}>Medication B</Text>
          </View>
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          <Text style={{ fontWeight: "700" }}>Great job! </Text>
          You maintained 89% adherence this week.
        </Text>
      </View>
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

  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 80,
    marginBottom: 12,
  },

  barContainer: {
    alignItems: "center",
    flex: 1,
  },

  bar: {
    width: "70%",
    backgroundColor: "#2563EB",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  dayText: {
    fontSize: 12,
    marginTop: 4,
    color: "#6B7280",
    fontWeight: "600",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  weekText: {
    color: "#6B7280",
    fontSize: 13,
  },

  legendGroup: {
    flexDirection: "row",
    gap: 14,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },

  legendText: {
    fontSize: 12,
    color: "#6B7280",
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },

  infoText: {
    fontSize: 13,
    color: "#1D4ED8",
  },
});
