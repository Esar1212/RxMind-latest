import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader() {
  return (
    <View style={styles.header}>
      <Ionicons name="person-circle" size={100} color="white" />

      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.subtitle}>Manage your account info</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2563eb",
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  name: { color: "white", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "white", opacity: 0.8 },
});
