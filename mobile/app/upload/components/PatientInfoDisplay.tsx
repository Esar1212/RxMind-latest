import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import {
  User,
  FileText,
  Download,
  Eye,
  Calendar,
  Plus,
} from "lucide-react-native";

export default function PatientInfoDisplay({ patientData }: any) {
  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Patient Information</Text>
          <Text style={styles.subtitle}>
            Extracted from prescription document
          </Text>
        </View>

        <Pressable style={styles.reminderBtn}>
          <Plus size={16} color="white" />
          <Text style={styles.reminderText}>Set Reminder</Text>
        </Pressable>
      </View>

      {/* PATIENT DETAILS */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <User size={18} color="#2563EB" />
          <Text style={styles.cardTitle}>Patient Details</Text>
        </View>

        {[
          ["Patient Name", patientData.patientName],
          ["Date of Birth", patientData.dateOfBirth],
          ["Contact Number", patientData.contactNumber],
          ["Patient ID", patientData.patientId],
          ["Gender", patientData.gender],
          ["Primary Physician", patientData.primaryPhysician],
        ].map(([label, value], i) => (
          <View key={i} style={styles.infoRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      {/* DOCUMENT PREVIEW */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FileText size={18} color="#2563EB" />
          <Text style={styles.cardTitle}>Prescription Document</Text>
        </View>

        <View style={styles.previewBox}>
          <FileText size={40} color="#9CA3AF" />
          <Text style={styles.previewText}>
            Prescription document preview
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.outlineBtn}>
            <Download size={16} color="#2563EB" />
            <Text style={styles.outlineText}>Download</Text>
          </Pressable>

          <Pressable style={styles.outlineBtn}>
            <Eye size={16} color="#2563EB" />
            <Text style={styles.outlineText}>View</Text>
          </Pressable>
        </View>
      </View>

      {/* MEDICATION LIST */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Calendar size={18} color="#2563EB" />
          <Text style={styles.cardTitle}>Prescribed Medications</Text>
        </View>

        <FlatList
          data={patientData.medications}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.medRow}>
              <Text style={styles.medName}>{item.name}</Text>
              <Text style={styles.medText}>{item.dosage}</Text>
              <Text style={styles.medText}>{item.frequency}</Text>
              <Text style={styles.medText}>{item.startDate}</Text>
              <Text style={styles.medText}>
                {item.endDate === "Ongoing" ? "Ongoing" : item.endDate}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 13, color: "#6B7280" },

  reminderBtn: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  reminderText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },

  infoRow: { marginBottom: 8 },
  label: { fontSize: 12, color: "#6B7280" },
  value: { fontSize: 14, fontWeight: "500" },

  previewBox: {
    height: 150,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  previewText: { color: "#6B7280", marginTop: 6 },

  buttonRow: { flexDirection: "row", gap: 10 },

  outlineBtn: {
    borderWidth: 1,
    borderColor: "#BFDBFE",
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  outlineText: { color: "#2563EB", marginLeft: 4 },

  medRow: { marginBottom: 10 },
  medName: { fontWeight: "600" },
  medText: { fontSize: 12, color: "#6B7280" },
});
