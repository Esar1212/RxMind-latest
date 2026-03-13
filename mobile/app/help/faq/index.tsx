import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

/* ---------------- FAQ DATA ---------------- */

const faqData = [
  {
    question: "How do I refill my prescription online?",
    answer:
      "Go to My Prescriptions → Request Refill. You’ll get confirmation once processed.",
    category: "Prescriptions",
  },
  {
    question: "What should I do if I miss a dose?",
    answer:
      "Take it when you remember. If near next dose, skip missed dose.",
    category: "Reminders",
  },
  {
    question: "How can I update my personal info?",
    answer:
      "Go to Settings → Account Info and edit your details.",
    category: "Account",
  },
];

/* ---------------- FAQ ITEM COMPONENT ---------------- */

function FaqItem({ question, answer, category }: any) {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity style={styles.faqCard} onPress={() => setOpen(!open)}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} />
      </View>

      <Text style={styles.category}>{category}</Text>

      {open && <Text style={styles.answer}>{answer}</Text>}
    </TouchableOpacity>
  );
}

/* ---------------- MAIN SCREEN ---------------- */

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const categories = [
    "All Categories",
    "Prescriptions",
    "Account",
    "Reminders",
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push("/help" as any)}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>
            Find answers to common questions
          </Text>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search questions..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />
      </View>

      {/* CATEGORY FILTER */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.activeCategory,
            ]}
          >
            <Text
              style={
                selectedCategory === cat
                  ? styles.activeText
                  : styles.categoryText
              }
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAQ LIST */}
      <View style={{ marginTop: 20 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, i) => (
            <FaqItem key={i} {...faq} />
          ))
        ) : (
          <Text style={styles.noResult}>No questions found</Text>
        )}
      </View>

      {/* STILL NEED HELP */}
      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>Still Need Help?</Text>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/help/chat")}
        >
          <Ionicons name="chatbubble" size={20} color="white" />
          <Text style={styles.actionText}>Live Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineBtn}>
          <Text>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineBtn}>
          <Text>Call Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f6fa" },

  headerRow: { flexDirection: "row", alignItems: "center" },

  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { color: "gray" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  searchInput: { marginLeft: 10, flex: 1 },

  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 10,
    marginTop: 20,
  },

  activeCategory: { backgroundColor: "#2563eb" },
  activeText: { color: "white" },
  categoryText: { color: "gray" },

  faqCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  faqHeader: { flexDirection: "row", justifyContent: "space-between" },
  faqQuestion: { fontWeight: "bold", flex: 1 },

  category: { fontSize: 12, color: "#2563eb", marginTop: 6 },
  answer: { marginTop: 10, color: "gray" },

  noResult: { textAlign: "center", marginTop: 40, color: "gray" },

  helpCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
  },

  helpTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
  },

  actionText: { color: "white", marginLeft: 8 },

  outlineBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
});
