import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";

export default function HelpPage() {
  const handleEmailSupport = () => {
    const subject = "RxCare Support Request";
    const body =
      "Hello RxCare Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you,\n[Your Name]";

    Linking.openURL(
      `mailto:support@rxcare.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handleCallSupport = () => {
    Linking.openURL("tel:+18001234567");
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="gray" />
        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>How can we help you today?</Text>
        </View>
      </View>

      {/* WELCOME CARD */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome to RxCare Help</Text>
        <Text style={styles.welcomeText}>
          Explore resources or connect with our team for assistance.
        </Text>
      </View>

      {/* SUPPORT CHANNELS */}
      <Text style={styles.sectionTitle}>Direct Support Channels</Text>

      <View style={styles.grid}>
        <SupportCard
          icon="document-text"
          color="#2563eb"
          title="FAQs"
          desc="Find answers quickly"
          onPress={() => router.push("/help/faq")}
        />

        <SupportCard
          icon="chatbubble"
          color="#16a34a"
          title="Live Chat"
          desc="Connect instantly"
          onPress={() => router.push("/help/chat")}
        />

        <SupportCard
          icon="mail"
          color="#9333ea"
          title="Email Support"
          desc="Send detailed message"
          onPress={handleEmailSupport}
        />

        <SupportCard
          icon="call"
          color="#ea580c"
          title="Call Our Team"
          desc="Speak with specialist"
          onPress={handleCallSupport}
        />
      </View>

      {/* QUICK LINKS */}
      <Text style={styles.sectionTitle}>Quick Links & Resources</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Policies</Text>
        <Text style={styles.link}>Privacy Policy</Text>
        <Text style={styles.link}>Terms of Service</Text>
        <Text style={styles.link}>Data Usage Policy</Text>
      </View>

      {/* FEEDBACK */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/help/feedback")}
      >
        <Text style={styles.cardTitle}>Feedback Form</Text>
        <Text style={styles.cardText}>
          Share your thoughts and help us improve.
        </Text>
      </TouchableOpacity>

      {/* CONTACT */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Need Assistance?</Text>

        <Text style={styles.contact}>support@rxcare.com</Text>
        <Text style={styles.contact}>+1 (800) 123-4567</Text>
      </View>
    </ScrollView>
  );
}

/* ------------------ REUSABLE CARD ------------------ */

function SupportCard({ icon, color, title, desc, onPress }: any) {
  return (
    <TouchableOpacity style={styles.supportCard} onPress={onPress}>
      <Ionicons name={icon} size={26} color={color} />
      <Text style={styles.supportTitle}>{title}</Text>
      <Text style={styles.supportDesc}>{desc}</Text>
    </TouchableOpacity>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 20 },

  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },

  title: { fontSize: 26, fontWeight: "bold" },
  subtitle: { color: "gray" },

  welcomeCard: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  welcomeTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  welcomeText: { color: "#dbeafe", marginTop: 6 },

  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 15 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  supportCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  supportTitle: { fontWeight: "bold", marginTop: 8 },
  supportDesc: { color: "gray", fontSize: 12 },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  link: { color: "#2563eb", marginVertical: 3 },

  cardText: { color: "gray" },

  contact: { color: "#2563eb", marginTop: 5 },
});
