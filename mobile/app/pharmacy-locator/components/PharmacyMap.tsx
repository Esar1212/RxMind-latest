import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------------- COMPONENT ---------------- */

export default function PharmacyMap() {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="location" size={20} color="#2563eb" />
        <Text style={styles.title}>Map View</Text>
      </View>

      {/* MAP AREA */}
      <View style={styles.map}>
        {/* PIN EXAMPLES */}
        <View style={[styles.pin, { top: 60, left: 60 }]}>
          <Ionicons name="location" size={20} color="white" />
        </View>

        <View style={[styles.pinBlue, { top: 120, left: 150 }]}>
          <Ionicons name="location" size={20} color="white" />
        </View>

        <View style={[styles.pinGreen, { top: 200, right: 80 }]}>
          <Ionicons name="location" size={20} color="white" />
        </View>

        {/* USER LOCATION */}
        <View style={styles.userLocation} />

        {/* MAP CONTROLS */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* NAVIGATION BUTTON */}
        <TouchableOpacity style={styles.navigateBtn}>
          <Ionicons name="navigate" size={18} color="white" />
          <Text style={styles.navigateText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    marginLeft: 6,
    fontWeight: "bold",
    fontSize: 16,
  },

  map: {
    height: 350,
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    overflow: "hidden",
  },

  /* PINS */

  pin: {
    position: "absolute",
    backgroundColor: "red",
    padding: 6,
    borderRadius: 20,
  },

  pinBlue: {
    position: "absolute",
    backgroundColor: "#2563eb",
    padding: 6,
    borderRadius: 20,
  },

  pinGreen: {
    position: "absolute",
    backgroundColor: "#16a34a",
    padding: 6,
    borderRadius: 20,
  },

  userLocation: {
    position: "absolute",
    width: 12,
    height: 12,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    top: "50%",
    left: "50%",
  },

  /* CONTROLS */

  controls: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  controlBtn: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    elevation: 2,
  },

  controlText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  navigateBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#2563eb",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  navigateText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
