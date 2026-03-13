import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------------- TYPES ---------------- */

type Pharmacy = {
  id: number;
  name: string;
  address: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  phone: string;
  services: string[];
  image?: string;
};

interface Props {
  pharmacy: Pharmacy;
}

/* ---------------- COMPONENT ---------------- */

export default function PharmacyCard({ pharmacy }: Props) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Ionicons
        key={i}
        name="star"
        size={16}
        color={i < Math.floor(rating) ? "#facc15" : "#ddd"}
      />
    ));
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* LEFT CONTENT */}
        <View style={{ flex: 1 }}>
          {/* TITLE + OPEN BADGE */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{pharmacy.name}</Text>

            {pharmacy.isOpen && (
              <View style={styles.openBadge}>
                <Text style={styles.openText}>Open</Text>
              </View>
            )}
          </View>

          {/* ADDRESS */}
          <View style={styles.iconRow}>
            <Ionicons name="location" size={16} />
            <Text style={styles.text}>{pharmacy.address}</Text>
          </View>

          {/* RATING + DISTANCE */}
          <View style={styles.ratingRow}>
            <View style={styles.starRow}>
              {renderStars(pharmacy.rating)}
              <Text style={styles.ratingText}>
                {pharmacy.rating}
              </Text>
            </View>

            <View style={styles.iconRow}>
              <Ionicons name="navigate" size={16} color="#2563eb" />
              <Text style={styles.distance}>
                {pharmacy.distance}
              </Text>
            </View>
          </View>

          {/* PHONE */}
          <View style={styles.iconRow}>
            <Ionicons name="call" size={16} />
            <Text style={styles.text}>{pharmacy.phone}</Text>
          </View>

          {/* SERVICES */}
          <View style={styles.services}>
            {pharmacy.services.slice(0, 3).map((s, i) => (
              <View key={i} style={styles.serviceBadge}>
                <Text style={styles.serviceText}>{s}</Text>
              </View>
            ))}

            {pharmacy.services.length > 3 && (
              <View style={styles.moreBadge}>
                <Text style={styles.moreText}>
                  +{pharmacy.services.length - 3}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* IMAGE */}
        {pharmacy.image && (
          <Image
            source={{ uri: pharmacy.image }}
            style={styles.image}
          />
        )}
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Ionicons name="navigate" size={16} />
          <Text style={styles.secondaryText}>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  row: { flexDirection: "row" },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  title: { fontSize: 16, fontWeight: "bold", flex: 1 },

  openBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },

  openText: { color: "#15803d", fontSize: 12 },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  text: { marginLeft: 5, color: "#555" },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  starRow: { flexDirection: "row", alignItems: "center" },

  ratingText: { marginLeft: 5, fontWeight: "600" },

  distance: { marginLeft: 5, color: "#2563eb" },

  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },

  serviceBadge: {
    backgroundColor: "#eef4ff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },

  serviceText: { fontSize: 12, color: "#2563eb" },

  moreBadge: {
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 5,
  },

  moreText: { fontSize: 12, color: "#666" },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 10,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },

  btnText: { color: "white", fontWeight: "bold" },

  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
  },

  secondaryText: {
    marginLeft: 5,
    color: "#2563eb",
    fontWeight: "600",
  },
});
