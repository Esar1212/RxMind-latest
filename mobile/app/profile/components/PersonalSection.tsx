import { View, Text, TextInput, StyleSheet } from "react-native";
import { UserProfile } from "../../(tabs)/profile";

interface Props {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

export default function PersonalSection({ profile, setProfile }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Personal Information</Text>

      <TextInput
        placeholder="Email"
        value={profile.email}
        style={styles.input}
        onChangeText={(v) => setProfile({ ...profile, email: v })}
      />

      <TextInput
        placeholder="Age"
        value={profile.age}
        style={styles.input}
        onChangeText={(v) => setProfile({ ...profile, age: v })}
      />

      <TextInput
        placeholder="Phone"
        value={profile.phone}
        style={styles.input}
        onChangeText={(v) => setProfile({ ...profile, phone: v })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "white", padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
