import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type FamilyMember = {
    name: string;
    relation: string;
};


export default function signup({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [caregiverPhone, setCaregiverPhone] = useState("");
    const [needsCaregiver, setNeedsCaregiver] = useState(false);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
        { name: "", relation: "" },
    ]);


    const passwordsMatch = password === confirmPassword;

    const handlePhoneInput = (value: string, setter: any) => {
        setter(value.replace(/[^0-9]/g, ""));
    };

    const addFamilyMember = () => {
        setFamilyMembers([...familyMembers, { name: "", relation: "" }]);
    };

    const removeFamilyMember = (index: number) => {
        if (familyMembers.length > 1) {
            setFamilyMembers(familyMembers.filter((_, i) => i !== index));
        }
    };

    //   const updateFamilyMember = (index: number, field: any, value: string) => {
    //     const updated = [...familyMembers];
    //     updated[index][field] = value;
    //     setFamilyMembers(updated);
    //   };
    const updateFamilyMember = (
        index: number,
        field: keyof FamilyMember,
        value: string
    ) => {
        const updated = [...familyMembers];
        updated[index][field] = value;
        setFamilyMembers(updated);
    };


    const handleRegister = async () => {
        if (!passwordsMatch) {
            Alert.alert("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            Alert.alert("Password must be at least 8 characters");
            return;
        }

        const body = {
            email,
            password,
            age: Number(age),
            phone_number: phoneNumber,
            caregiver_phone: needsCaregiver ? caregiverPhone : null,
            family_members: familyMembers,
        };

        try {
            const res = await fetch("YOUR_API_URL/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                Alert.alert(data.error || "Registration failed");
                return;
            }

            Alert.alert("Success", "Registration successful!");
            navigation.navigate("Login");
        } catch (err) {
            Alert.alert("Error", "Something went wrong");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>RxMind</Text>

            {/* EMAIL */}
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            {/* AGE */}
            <TextInput
                placeholder="Age"
                style={styles.input}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            {/* PHONE */}
            <TextInput
                placeholder="Phone Number"
                style={styles.input}
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(v) => handlePhoneInput(v, setPhoneNumber)}
            />

            {/* PASSWORD */}
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* CONFIRM */}
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {!passwordsMatch && confirmPassword.length > 0 && (
                <Text style={styles.error}>Passwords do not match</Text>
            )}

            {/* CAREGIVER */}
            <View style={styles.switchRow}>
                <Text>I need caregiver assistance</Text>
                <Switch value={needsCaregiver} onValueChange={setNeedsCaregiver} />
            </View>

            {needsCaregiver && (
                <TextInput
                    placeholder="Caregiver Phone"
                    style={styles.input}
                    keyboardType="numeric"
                    value={caregiverPhone}
                    onChangeText={(v) => handlePhoneInput(v, setCaregiverPhone)}
                />
            )}

            {/* FAMILY MEMBERS */}
            <Text style={styles.section}>Family Members</Text>

            {familyMembers.map((member, index) => (
                <View key={index} style={styles.memberBox}>
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={member.name}
                        onChangeText={(v) => updateFamilyMember(index, "name", v)}
                    />

                    <Picker
                        selectedValue={member.relation}
                        onValueChange={(v) => updateFamilyMember(index, "relation", v)}
                    >
                        <Picker.Item label="Select Relation" value="" />
                        <Picker.Item label="Spouse" value="spouse" />
                        <Picker.Item label="Parent" value="parent" />
                        <Picker.Item label="Child" value="child" />
                        <Picker.Item label="Sibling" value="sibling" />
                    </Picker>

                    {familyMembers.length > 1 && (
                        <TouchableOpacity onPress={() => removeFamilyMember(index)}>
                            <Text style={styles.remove}>Remove</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}

            <TouchableOpacity style={styles.addBtn} onPress={addFamilyMember}>
                <Text style={{ color: "white" }}>+ Add Member</Text>
            </TouchableOpacity>

            {/* SUBMIT */}
            <TouchableOpacity
                style={[
                    styles.button,
                    (!passwordsMatch || password.length < 8) && { opacity: 0.5 },
                ]}
                disabled={!passwordsMatch || password.length < 8}
                onPress={handleRegister}
            >
                <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#2563eb",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    btnText: { color: "white", fontWeight: "bold" },
    section: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
    memberBox: { backgroundColor: "#f3f6ff", padding: 10, marginBottom: 10 },
    addBtn: {
        backgroundColor: "#2563eb",
        padding: 10,
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
    },
    remove: { color: "red", marginTop: 5 },
    error: { color: "red", marginBottom: 10 },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
