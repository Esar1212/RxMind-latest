import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function UploadScreen() {
  const router = useRouter();

  const handleUploadComplete = () => {
    router.push("/prescriptions");
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.push("/")}>
          <ArrowLeft size={24} color="#374151" />
        </Pressable>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>Upload / Scan Prescription</Text>
          <Text style={styles.subtitle}>
            Multi-step process to add your prescription
          </Text>
        </View>
      </View>

      {/* UPLOAD STEPS PLACEHOLDER */}
      <View style={styles.stepsBox}>
        <Text style={styles.placeholder}>
          UploadSteps component will be placed here
        </Text>

        {/* TEMP BUTTON TO SIMULATE COMPLETE */}
        <Pressable
          style={styles.completeBtn}
          onPress={handleUploadComplete}
        >
          <Text style={styles.btnText}>Finish Upload</Text>
        </Pressable>
      </View>
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
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },

  stepsBox: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  placeholder: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  completeBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  btnText: {
    color: "white",
    fontWeight: "600",
  },
});
