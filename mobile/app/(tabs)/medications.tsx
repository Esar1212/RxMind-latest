import { Pressable } from "react-native";
import { router } from "expo-router";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import {
    Pill,
    AlertTriangle,
    Sun,
    Sunrise,
    Sunset,
    Moon,
} from "lucide-react-native";

export default function MedicationsScreen() {
    const medications = [
        { name: "Aspirin", dosage: "75mg", time: "Morning", critical: false },
        { name: "Metformin", dosage: "500mg", time: "Noon", critical: true },
        { name: "Atorvastatin", dosage: "20mg", time: "Evening", critical: false },
        { name: "Warfarin", dosage: "5mg", time: "Night", critical: true },
    ];

    const timeStyles: any = {
        Morning: { bg: "#FEF9C3", text: "#854D0E", iconBg: "#FDE68A" },
        Noon: { bg: "#FFEDD5", text: "#9A3412", iconBg: "#FDBA74" },
        Evening: { bg: "#F3E8FF", text: "#6B21A8", iconBg: "#E9D5FF" },
        Night: { bg: "#DBEAFE", text: "#1E3A8A", iconBg: "#BFDBFE" },
    };

    const getIcon = (time: string) => {
        switch (time) {
            case "Morning":
                return <Sun size={18} />;
            case "Noon":
                return <Sunrise size={18} />;
            case "Evening":
                return <Sunset size={18} />;
            case "Night":
                return <Moon size={18} />;
        }
    };

   
    const renderItem = ({ item }: any) => {
        const style = timeStyles[item.time];

        return (
            <View style={[styles.card, { backgroundColor: style.bg }]}>

                {/* HEADER */}
                <View style={styles.row}>
                    <View style={[styles.iconCircle, { backgroundColor: style.iconBg }]}>
                        {getIcon(item.time)}
                    </View>

                    <View>
                        <Text style={[styles.medName, { color: style.text }]}>
                            {item.name}
                        </Text>
                        <Text style={styles.dosage}>{item.dosage}</Text>
                    </View>
                </View>

                {/* TIME BADGE */}
                <View style={[styles.timeBadge, { backgroundColor: style.iconBg }]}>
                    <Text style={[styles.timeText, { color: style.text }]}>
                        {item.time}
                    </Text>
                </View>

                {/* ACTION BUTTONS */}
                {/* <View style={styles.navRow}>
                    <Pressable
                        style={styles.navBtn}
                        onPress={() => router.push("/upload" as any)}
                    >
                        <Text style={styles.navText}>Add</Text>
                    </Pressable>

                    <Pressable
                        style={styles.navBtn}
                        onPress={() => router.push("/reports" as any)}
                    >
                        <Text style={styles.navText}>Reports</Text>
                    </Pressable>
                </View> */}

                {/* WARNING */}
                {item.critical && (
                    <View style={styles.warningBox}>
                        <AlertTriangle size={16} color="#B91C1C" />
                        <Text style={styles.warningText}>
                            Critical: Must not be missed!
                        </Text>
                    </View>
                )}
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pill size={28} color="#2563EB" />
                <Text style={styles.title}>My Medications</Text>
            </View>

            <FlatList
                data={medications}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F9FAFB",
//         padding: 20,
//     },

//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//     },

//     title: {
//         fontSize: 26,
//         fontWeight: "700",
//         marginLeft: 10,
//         color: "#111827",
//     },

//     // card: {
//     //     borderRadius: 16,
//     //     padding: 16,
//     //     marginBottom: 16,
//     // },

//     card: {
//         borderRadius: 16,
//         padding: 18,
//         marginBottom: 18,
//         gap: 12,
//         elevation: 2,
//     },

//     row: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 6,
//     },

//     iconCircle: {
//         width: 36,
//         height: 36,
//         borderRadius: 18,
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 10,
//     },

//     medName: {
//         fontSize: 18,
//         fontWeight: "600",
//     },

//     dosage: {
//         fontSize: 14,
//         color: "#374151",
//         marginBottom: 12,
//     },

//     timeBadge: {
//         alignSelf: "flex-start",
//         paddingHorizontal: 12,
//         paddingVertical: 4,
//         borderRadius: 20,
//     },

//     timeText: {
//         fontSize: 12,
//         fontWeight: "600",
//     },

//     warningBox: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 12,
//         backgroundColor: "#FEE2E2",
//         padding: 10,
//         borderRadius: 10,
//     },

//     warningText: {
//         marginLeft: 6,
//         color: "#B91C1C",
//         fontSize: 12,
//         fontWeight: "600",
//     },
//     navRow: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         marginBottom: 20,
//     },

//     navBtn: {
//         backgroundColor: "#2563EB",
//         paddingVertical: 10,
//         paddingHorizontal: 16,
//         borderRadius: 12,
//     },

//     navText: {
//         color: "white",
//         fontWeight: "600",
//     },

// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 10,
    color: "#111827",
  },

  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    gap: 12,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  medName: {
    fontSize: 18,
    fontWeight: "600",
  },

  dosage: {
    fontSize: 14,
    color: "#374151",
  },

  timeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  timeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  navBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },

  navText: {
    color: "white",
    fontWeight: "600",
  },

  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 10,
  },

  warningText: {
    marginLeft: 6,
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
});
