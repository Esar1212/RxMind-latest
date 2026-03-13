import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
} from "react-native";
import {
    Upload,
    Camera,
    FileText,
    Check,
    ArrowLeft,
    ArrowRight,
} from "lucide-react-native";

export default function UploadSteps({ onComplete }: any) {
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState<"upload" | "scan" | null>(null);
    const [data, setData] = useState<any>(null);

    const simulateExtraction = () => {
        setTimeout(() => {
            setData({
                patientName: "Sarah Jenkins",
                medications: [
                    { name: "Amoxicillin", dosage: "500mg", frequency: "Twice daily" },
                ],
            });
            setStep(3);
        }, 1500);
    };

    /* ---------- STEP 1 ---------- */

    if (step === 1)
        return (
            <View>
                <Text style={styles.title}>Choose Method</Text>

                <Pressable
                    style={styles.option}
                    onPress={() => {
                        setMethod("upload");
                        setStep(2);
                    }}
                >
                    <Upload size={30} color="#2563EB" />
                    <Text style={styles.optionText}>Upload Document</Text>
                </Pressable>

                <Pressable
                    style={styles.option}
                    onPress={() => {
                        setMethod("scan");
                        setStep(2);
                    }}
                >
                    <Camera size={30} color="#2563EB" />
                    <Text style={styles.optionText}>Scan with Camera</Text>
                </Pressable>
            </View>
        );

    /* ---------- STEP 2 ---------- */

    if (step === 2)
        return (
            <View>
                <Text style={styles.title}>
                    {method === "upload" ? "Upload File" : "Scan Prescription"}
                </Text>

                <Pressable style={styles.bigBtn} onPress={simulateExtraction}>
                    <Text style={styles.btnText}>
                        {method === "upload" ? "Select File" : "Capture Photo"}
                    </Text>
                </Pressable>

                <Pressable style={styles.backBtn} onPress={() => setStep(1)}>
                    <ArrowLeft size={16} />
                    <Text style={styles.backText}>Back</Text>
                </Pressable>
            </View>
        );

    /* ---------- STEP 3 ---------- */

    if (step === 3 && data)
        return (
            <View>
                <Text style={styles.title}>Review Extracted Data</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Patient:</Text>
                    <Text>{data.patientName}</Text>
                </View>

                <Text style={styles.subtitle}>Medications</Text>

                <FlatList
                    data={data.medications}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                            <Text>{item.dosage}</Text>
                            <Text>{item.frequency}</Text>
                        </View>
                    )}
                />

                <View style={styles.row}>
                    <Pressable style={styles.backBtn} onPress={() => setStep(2)}>
                        <ArrowLeft size={16} />
                        <Text style={styles.backText}>Back</Text>
                    </Pressable>

                    <Pressable style={styles.nextBtn} onPress={() => setStep(4)}>
                        <Text style={styles.btnText}>Continue</Text>
                        <ArrowRight size={16} color="white" />
                    </Pressable>
                </View>
            </View>
        );

    /* ---------- STEP 4 ---------- */

    if (step === 4)
        return (
            <View style={{ alignItems: "center" }}>
                <View style={styles.successCircle}>
                    <Check size={40} color="#16A34A" />
                </View>

                <Text style={styles.title}>Prescription Added!</Text>

                <Pressable style={styles.nextBtn} onPress={onComplete}>
                    <Text style={styles.btnText}>View Prescriptions</Text>
                </Pressable>

                <Pressable
                    style={styles.backBtn}
                    onPress={() => {
                        setStep(1);
                        setMethod(null);
                        setData(null);
                    }}
                >
                    <Text style={styles.backText}>Add Another</Text>
                </Pressable>
            </View>
        );

    return null;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
    },

    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
    },

    option: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: "center",
        elevation: 2,
    },

    optionText: {
        marginTop: 8,
        fontWeight: "600",
    },

    bigBtn: {
        backgroundColor: "#2563EB",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },

    nextBtn: {
        flexDirection: "row",
        gap: 8,
        backgroundColor: "#2563EB",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },

    backText: {
        marginLeft: 6,
        color: "#2563EB",
        fontWeight: "600",
    },

    btnText: {
        color: "white",
        fontWeight: "600",
    },

    card: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    successCircle: {
        width: 80,
        height: 80,
        backgroundColor: "#DCFCE7",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
    }

});
