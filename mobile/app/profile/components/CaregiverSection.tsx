import { View, Text, Switch, StyleSheet } from "react-native";
import { UserProfile } from "../../(tabs)/profile";

interface Props {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

export default function CaregiverSection({ profile, setProfile }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Care Preferences</Text>

      <View style={styles.row}>
        <Text>Need caregiver assistance</Text>
        <Switch
          value={profile.needsCaregiver}
          onValueChange={(v) =>
            setProfile({ ...profile, needsCaregiver: v })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "white", padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
