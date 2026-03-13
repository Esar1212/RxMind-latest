import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Upload, Camera, Plus } from "lucide-react-native";

export default function AddPrescriptionScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.push("/prescriptions")}>
            <ArrowLeft size={24} color="#374151" />
          </Pressable>

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>Add New Prescription</Text>
            <Text style={styles.subtitle}>
              Upload or manually enter prescription details
            </Text>
          </View>
        </View>

        {/* STEP INDICATOR */}
        <View style={styles.stepRow}>
          {[1, 2, 3].map((num) => (
            <View key={num} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  step >= num && styles.activeCircle,
                ]}
              >
                <Text style={styles.stepText}>{num}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* STEP 1 */}
        {step === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Choose Upload Method</Text>

            <Pressable style={styles.card} onPress={() => setStep(2)}>
              <Upload size={30} color="#2563EB" />
              <Text style={styles.cardTitle}>Upload Document</Text>
              <Text style={styles.cardDesc}>
                Upload prescription files from device
              </Text>
            </Pressable>

            <Pressable style={styles.card} onPress={() => setStep(2)}>
              <Camera size={30} color="#2563EB" />
              <Text style={styles.cardTitle}>Scan with Camera</Text>
              <Text style={styles.cardDesc}>
                Capture a photo of your prescription
              </Text>
            </Pressable>
          </View>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Manual Entry</Text>

            <TextInput style={styles.input} placeholder="Medication Name" />
            <TextInput style={styles.input} placeholder="Dosage" />
            <TextInput style={styles.input} placeholder="Frequency" />
            <TextInput style={styles.input} placeholder="Doctor Name" />

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Special Instructions"
              multiline
            />

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.secondaryBtn}
                onPress={() => setStep(1)}
              >
                <Text>Back</Text>
              </Pressable>

              <Pressable
                style={styles.primaryBtn}
                onPress={() => setStep(3)}
              >
                <Text style={styles.btnText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <View>
            <Text style={styles.sectionTitle}>Review & Confirm</Text>

            <View style={styles.reviewBox}>
              <Text>Medication: Amoxicillin</Text>
              <Text>Dosage: 500mg</Text>
              <Text>Frequency: Twice Daily</Text>
              <Text>Doctor: Dr. Smith</Text>
            </View>

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.secondaryBtn}
                onPress={() => setStep(2)}
              >
                <Text>Back</Text>
              </Pressable>

              <Pressable
                style={styles.primaryBtn}
                onPress={() => router.push("/prescriptions")}
              >
                <Plus size={16} color="white" />
                <Text style={styles.btnText}> Add Prescription</Text>
              </Pressable>
            </View>
          </View>
        )}

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
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },

  stepRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  stepItem: {
    alignItems: "center",
  },

  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  activeCircle: {
    backgroundColor: "#2563EB",
  },

  stepText: {
    color: "white",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  cardDesc: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  secondaryBtn: {
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 10,
  },

  btnText: {
    color: "white",
    fontWeight: "600",
  },

  reviewBox: {
    backgroundColor: "#DBEAFE",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
});
