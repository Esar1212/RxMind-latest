import { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ProfileHeader from "../profile/components/ProfileHeader";
import PersonalSection from "../profile/components/PersonalSection";
import CaregiverSection from "../profile/components/CaregiverSection";
import FamilySection from "../profile/components/FamilySection";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";


export interface FamilyMember {
    id: string;
    name: string;
    relation: string;
}

export interface UserProfile {
    email: string;
    age: string;
    phone: string;
    needsCaregiver: boolean;
    familyMembers: FamilyMember[];
}

interface PatientMedication {
    name: string;
    dosage: string;
    frequency: string;
}

interface PatientInfo {
    patientName: string;
    primaryPhysician: string;
    medications: PatientMedication[];
}

const patientInfo: PatientInfo = {
    patientName: "Sarah Jenkins",
    primaryPhysician: "Dr. Emily Chen",
    medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "Twice daily" },
        { name: "Ibuprofen", dosage: "200mg", frequency: "As needed" },
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    ],
};

function PatientInfoSection({ info }: { info: PatientInfo }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Medical Information</Text>

            <Text style={styles.label}>Patient Name</Text>
            <Text style={styles.value}>{info.patientName}</Text>

            <Text style={styles.label}>Primary Physician</Text>
            <Text style={styles.value}>{info.primaryPhysician}</Text>

            <Text style={[styles.label, { marginTop: 10 }]}>
                Prescribed Medications
            </Text>

            {info.medications.map((med, i) => (
                <View key={i} style={styles.medCard}>
                    <Text style={styles.medName}>{med.name}</Text>
                    <Text style={styles.medText}>
                        {med.dosage} • {med.frequency}
                    </Text>
                </View>
            ))}
        </View>
    );
}


export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile>({
        email: "john.doe@example.com",
        age: "35",
        phone: "+91 9876543210",
        needsCaregiver: false,
        familyMembers: [
            { id: "1", name: "Jane Doe", relation: "Spouse" },
            { id: "2", name: "Emily Doe", relation: "Child" },
        ],
    });

    return (
        <ScrollView style={styles.container}>
            <ProfileHeader />
            <TouchableOpacity
                style={{
                    margin: 16,
                    padding: 14,
                    backgroundColor: "#2563eb",
                    borderRadius: 12,
                    alignItems: "center",
                }}
                onPress={() => router.push("/prescriptions")}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Go to Prescriptions
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginHorizontal: 16,
                    padding: 14,
                    backgroundColor: "#16a34a",
                    borderRadius: 12,
                    alignItems: "center",
                    marginTop: 10,
                }}
                onPress={() => router.push("/settings" as any)}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Go to Settings
                </Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <PatientInfoSection info={patientInfo} />
                <PersonalSection profile={profile} setProfile={setProfile} />
                <CaregiverSection profile={profile} setProfile={setProfile} />
                <FamilySection profile={profile} setProfile={setProfile} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3f6ff" },
    content: { padding: 16, gap: 20 },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    label: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 6,
    },

    value: {
        fontSize: 16,
        fontWeight: "600",
    },

    medCard: {
        backgroundColor: "#F9FAFB",
        padding: 10,
        borderRadius: 8,
        marginTop: 8,
    },

    medName: {
        fontWeight: "600",
    },

    medText: {
        color: "#6B7280",
        fontSize: 13,
    },

});
