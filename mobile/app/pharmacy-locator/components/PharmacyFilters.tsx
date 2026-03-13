import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface Props {
  onFiltersChange?: (filters: any) => void;
}

export default function PharmacyFilters({ onFiltersChange }: Props) {
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [openNow, setOpenNow] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    "Prescription Filling",
    "Vaccinations",
    "Health Screenings",
    "Medication Counseling",
    "Delivery Service",
    "24/7 Pharmacy",
  ];

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    setSelectedServices(updated);

    onFiltersChange?.({
      distance: selectedDistance,
      openNow,
      services: updated,
    });
  };

  const clearFilters = () => {
    setSelectedDistance("all");
    setOpenNow(false);
    setSelectedServices([]);

    onFiltersChange?.({
      distance: "all",
      openNow: false,
      services: [],
    });
  };

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="filter" size={20} color="#2563eb" />
        <Text style={styles.title}>Filters</Text>
      </View>

      {/* DISTANCE */}
      <Text style={styles.label}>Distance</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={selectedDistance}
          onValueChange={(value) => {
            setSelectedDistance(value);
            onFiltersChange?.({
              distance: value,
              openNow,
              services: selectedServices,
            });
          }}
        >
          <Picker.Item label="All distances" value="all" />
          <Picker.Item label="Within 1 km" value="1" />
          <Picker.Item label="Within 2 km" value="2" />
          <Picker.Item label="Within 5 km" value="5" />
          <Picker.Item label="Within 10 km" value="10" />
        </Picker>
      </View>

      {/* OPEN NOW */}
      <TouchableOpacity
        style={[
          styles.openBtn,
          openNow && styles.openBtnActive,
        ]}
        onPress={() => {
          setOpenNow(!openNow);
          onFiltersChange?.({
            distance: selectedDistance,
            openNow: !openNow,
            services: selectedServices,
          });
        }}
      >
        <Ionicons name="time" size={16} />
        <Text style={styles.openText}>Open Now</Text>
      </TouchableOpacity>

      {/* SERVICES */}
      <Text style={styles.label}>Services</Text>
      <View style={styles.services}>
        {services.map((service) => {
          const selected = selectedServices.includes(service);
          return (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceBadge,
                selected && styles.serviceSelected,
              ]}
              onPress={() => handleServiceToggle(service)}
            >
              <Text
                style={[
                  styles.serviceText,
                  selected && { color: "white" },
                ]}
              >
                {service}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CLEAR */}
      <TouchableOpacity
        style={styles.clearBtn}
        onPress={clearFilters}
      >
        <Text style={styles.clearText}>Clear All Filters</Text>
      </TouchableOpacity>
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

  label: {
    marginTop: 10,
    fontWeight: "600",
    marginBottom: 5,
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },

  openBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  openBtnActive: {
    backgroundColor: "#2563eb",
  },

  openText: {
    marginLeft: 6,
    fontWeight: "600",
  },

  services: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  serviceBadge: {
    borderWidth: 1,
    borderColor: "#2563eb",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 5,
    marginTop: 5,
  },

  serviceSelected: {
    backgroundColor: "#2563eb",
  },

  serviceText: {
    fontSize: 12,
    color: "#2563eb",
  },

  clearBtn: {
    marginTop: 15,
    alignItems: "center",
  },

  clearText: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
