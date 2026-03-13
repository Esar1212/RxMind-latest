import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { FileText, Download, Eye, Calendar } from "lucide-react-native";

const prescriptionDocuments = [
  {
    id: 1,
    name: "Amoxicillin Script",
    medication: "Amoxicillin 500mg",
    dosage: "2x daily",
    date: "April 25, 2024",
    image: require("../../../assets/amoxicillin-prescription.png"),
    // image: require("../../assets/amoxicillin-prescription.png"),
  },
  {
    id: 2,
    name: "Lisinopril Prescription",
    medication: "Lisinopril 10mg",
    dosage: "1x daily",
    date: "May 1, 2024",
    image: require("../../../assets/prescription-lisinopril.png"),
  },
];

export default function PrescriptionDocuments() {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{item.name}</Text>

      <Text style={styles.medication}>{item.medication}</Text>
      <Text style={styles.dosage}>{item.dosage}</Text>

      <View style={styles.dateRow}>
        <Calendar size={14} color="#6B7280" />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.outlineBtn}>
          <Download size={14} color="#2563EB" />
          <Text style={styles.outlineText}>Download</Text>
        </Pressable>

        <Pressable style={styles.outlineBtn}>
          <Eye size={14} color="#2563EB" />
          <Text style={styles.outlineText}>View</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FileText size={18} color="#2563EB" />
        <Text style={styles.headerText}>Prescription Documents</Text>
      </View>

      <FlatList
        data={prescriptionDocuments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
    marginBottom: 10,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },

  card: {
    backgroundColor: "white",
    width: "48%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  medication: {
    fontSize: 12,
    color: "#374151",
  },

  dosage: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dateText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: "#BFDBFE",
    padding: 6,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  outlineText: {
    fontSize: 12,
    color: "#2563EB",
    marginLeft: 4,
  },
});
