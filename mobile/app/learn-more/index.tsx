import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function LearnMorePage() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.badge}>Why RxMind Matters</Text>

        <Text style={styles.title}>
          The Global Problem of Medication Non-Adherence
        </Text>

        <Text style={styles.subtitle}>
          Medication non-adherence is one of the biggest challenges in
          healthcare today. RxMind is designed to solve this.
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Key Facts & Statistics
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Global & U.S. Impact
          </Text>

          <Text style={styles.listItem}>
            • 50% of chronic patients don’t follow prescriptions.
          </Text>
          <Text style={styles.listItem}>
            • 125,000 deaths annually in the U.S.
          </Text>
          <Text style={styles.listItem}>
            • 25% hospital admissions from non-compliance.
          </Text>
          <Text style={styles.listItem}>
            • $100–300B avoidable costs yearly.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            India & LMIC Context
          </Text>

          <Text style={styles.listItem}>
            • Adherence rates lower than global average.
          </Text>
          <Text style={styles.listItem}>
            • 45% prescriptions incomplete.
          </Text>
          <Text style={styles.listItem}>
            • Higher out-of-pocket expenses.
          </Text>
          <Text style={styles.listItem}>
            • 80% NCD deaths in LMICs.
          </Text>
        </View>
      </View>

      {/* WHY IT MATTERS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Why It Matters
        </Text>

        <Text style={styles.paragraph}>
          Non-adherence leads to worsening conditions,
          unnecessary hospitalizations, and financial burden.
          This directly supports UN SDG-3: Good Health.
        </Text>

        <View style={styles.highlight}>
          <Text style={styles.highlightText}>
            Addressing adherence improves outcomes,
            reduces costs, and promotes health equity.
          </Text>
        </View>
      </View>

      {/* SOLUTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          How RxMind Solves This
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📱 Smart Reminders
          </Text>
          <Text style={styles.cardText}>
            Automated alerts ensure doses are never missed.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📝 Prescription OCR
          </Text>
          <Text style={styles.cardText}>
            Upload prescriptions and extract medicine details.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            👨‍👩‍👦 Caregiver Support
          </Text>
          <Text style={styles.cardText}>
            Family gets notified when doses are missed.
          </Text>
        </View>
      </View>

      {/* MISSION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Our Mission
        </Text>

        <Text style={styles.paragraph}>
          RxMind empowers patients to stay consistent with
          treatments and supports caregivers to create a
          healthier future.
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f9ff" },

  header: { padding: 20, alignItems: "center" },

  badge: {
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "gray",
    lineHeight: 20,
  },

  section: { padding: 20 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: { fontWeight: "bold", marginBottom: 6 },

  cardText: { color: "gray" },

  listItem: { marginBottom: 4, color: "#444" },

  paragraph: { color: "#555", lineHeight: 20 },

  highlight: {
    backgroundColor: "#ecfdf5",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  highlightText: { color: "#065f46" },
});
