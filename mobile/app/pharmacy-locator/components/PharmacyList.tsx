import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PharmacyCard from "./PharmacyCard";

/* ---------------- MOCK DATA ---------------- */

const pharmacies = [
  {
    id: 1,
    name: "GreenLeaf Apothecary",
    address: "10 Pine Lane, Anytown",
    rating: 4.9,
    distance: "0.8",
    isOpen: true,
    phone: "+1 (555) 123-4567",
    services: ["Prescription Filling", "Vaccinations", "Delivery Service"],
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "CityCare Pharmacy",
    address: "123 Main Street",
    rating: 4.8,
    distance: "1.2",
    isOpen: true,
    phone: "+1 (555) 234-5678",
    services: ["Medication Counseling", "24/7 Pharmacy"],
    image: "https://picsum.photos/201",
  },
];

/* ---------------- PROPS ---------------- */

interface Props {
  filters?: any;
}

/* ---------------- COMPONENT ---------------- */

export default function PharmacyList({ filters }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOpenNow = !filters?.openNow || pharmacy.isOpen;

    const matchesDistance =
      !filters?.distance ||
      filters.distance === "all" ||
      Number(pharmacy.distance) <= Number(filters.distance);

    const matchesServices =
      !filters?.services?.length ||
      filters.services.some((s: string) =>
        pharmacy.services.includes(s)
      );

    return (
      matchesSearch &&
      matchesOpenNow &&
      matchesDistance &&
      matchesServices
    );
  });

  return (
    <View>
      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search pharmacies..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />
      </View>

      {/* RESULT HEADER */}
      <View style={styles.header}>
        <Text style={styles.count}>
          {filteredPharmacies.length} found
        </Text>
        <Text style={styles.sort}>Sorted by distance</Text>
      </View>

      {/* LIST */}
      {filteredPharmacies.length > 0 ? (
        <FlatList
          data={filteredPharmacies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PharmacyCard pharmacy={item} />
          )}
        />
      ) : (
        <View style={styles.empty}>
          <Ionicons name="search" size={50} color="#ccc" />
          <Text style={styles.emptyTitle}>
            No pharmacies found
          </Text>
          <Text style={styles.emptyText}>
            Try adjusting filters
          </Text>
        </View>
      )}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  input: {
    marginLeft: 8,
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  count: { fontWeight: "bold", fontSize: 16 },

  sort: { color: "gray" },

  empty: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyText: {
    color: "gray",
    marginTop: 5,
  },
});
