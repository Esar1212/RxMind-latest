import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Pill, Plus, Search, Calendar, User } from "lucide-react-native";
import { useRouter } from "expo-router";

const prescriptions = [
  {
    id: 1,
    medication: "Amoxicillin",
    dosage: "500 mg, twice daily",
    prescribedBy: "Dr. Smith",
    nextRefill: "May 10, 2024",
    status: "Active",
    color: "#DCFCE7",
    textColor: "#15803D",
  },
  {
    id: 2,
    medication: "Atorvastatin",
    dosage: "20 mg, once daily",
    prescribedBy: "Dr. Patel",
    nextRefill: "May 22, 2024",
    status: "Due Soon",
    color: "#FED7AA",
    textColor: "#C2410C",
  },
];

export default function PrescriptionTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = prescriptions.filter(
    (p) =>
      p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.medTitle}>{item.medication}</Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: item.color },
          ]}
        >
          <Text style={{ color: item.textColor, fontSize: 12 }}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>{item.dosage}</Text>

      <View style={styles.infoRow}>
        <User size={14} color="#6B7280" />
        <Text style={styles.infoText}>{item.prescribedBy}</Text>
      </View>

      <View style={styles.infoRow}>
        <Calendar size={14} color="#6B7280" />
        <Text style={styles.infoText}>
          Next refill: {item.nextRefill}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Pill size={18} color="#2563EB" />
          <Text style={styles.title}>Current Medications</Text>
        </View>

        <Pressable
          style={styles.addBtn}
          onPress={() => router.push("/prescriptions/add")}
        >
          <Plus size={16} color="white" />
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Search size={16} color="#9CA3AF" />
        <TextInput
          placeholder="Search prescriptions..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 6,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  addText: {
    color: "white",
    marginLeft: 4,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  input: {
    marginLeft: 8,
    flex: 1,
  },

  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  medTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  info: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
  },
});
