import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import PharmacyList from "./components/PharmacyList";
import PharmacyFilters from "./components/PharmacyFilters";
import PharmacyMap from "./components/PharmacyMap";

export default function PharmacyLocatorPage() {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Pharmacy Locator</Text>
          <Text style={styles.subtitle}>
            Find pharmacies near you
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {/* VIEW TOGGLE */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === "list" && styles.activeBtn,
            ]}
            onPress={() => setViewMode("list")}
          >
            <Ionicons name="list" size={18} />
            <Text style={styles.toggleText}>List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === "map" && styles.activeBtn,
            ]}
            onPress={() => setViewMode("map")}
          >
            <Ionicons name="map" size={18} />
            <Text style={styles.toggleText}>Map</Text>
          </TouchableOpacity>
        </View>

        {/* FILTERS */}
        <PharmacyFilters onFiltersChange={setFilters} />

        {/* CONTENT */}
        {viewMode === "list" ? (
          <PharmacyList filters={filters} />
        ) : (
          <PharmacyMap />
        )}
      </ScrollView>
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
  },

  title: { fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "gray", fontSize: 12 },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
  },

  toggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },

  activeBtn: {
    backgroundColor: "#2563eb",
  },

  toggleText: {
    marginLeft: 5,
    fontWeight: "600",
  },
});
