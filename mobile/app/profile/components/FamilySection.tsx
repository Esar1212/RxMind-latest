import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { UserProfile } from "../../(tabs)/profile";

interface Props {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

export default function FamilySection({ profile, setProfile }: Props) {
  const addMember = () => {
    setProfile({
      ...profile,
      familyMembers: [
        ...profile.familyMembers,
        { id: Date.now().toString(), name: "", relation: "" },
      ],
    });
  };

  const updateMember = (id: string, field: string, value: string) => {
    setProfile({
      ...profile,
      familyMembers: profile.familyMembers.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Family Members</Text>

      {profile.familyMembers.map((m) => (
        <View key={m.id} style={styles.member}>
          <TextInput
            placeholder="Name"
            value={m.name}
            style={styles.input}
            onChangeText={(v) => updateMember(m.id, "name", v)}
          />

          <TextInput
            placeholder="Relation"
            value={m.relation}
            style={styles.input}
            onChangeText={(v) => updateMember(m.id, "relation", v)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.btn} onPress={addMember}>
        <Text style={{ color: "white" }}>+ Add Member</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "white", padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  member: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  btn: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});
