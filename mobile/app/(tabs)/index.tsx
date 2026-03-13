// v2
// import { Dimensions } from "react-native";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SCREEN_WIDTH,
  isTablet,
  isSmallPhone,
  clamp,
} from "../utils/responsive";

/* ===============================
   HOME SCREEN
================================ */

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ================= HERO ================= */}
      <ImageBackground
        source={require("../../assets/images/Bgimg.jpg")}
        resizeMode="cover"
        style={styles.heroBg}
      >
        <View style={styles.overlay} />

        <View style={styles.centered}>
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Giving your prescriptions, the wings of reminders
              </Text>
            </View>

            <Text style={styles.title}>
              Never Miss a Dose Again.
            </Text>

            <Text style={styles.subtitle}>
              Seamlessly manage your medications, set personalized reminders,
              and track your health with RxMind — your trusted partner in
              well-being.
            </Text>

            <View style={styles.heroButtons}>
              <PrimaryButton
                label="Get Started"
                onPress={() => router.push("/(auth)/signup")}
              />
              <OutlineButton
                label="Learn More"
                onPress={() => router.push("/learn-more")}
              />
              <OutlineButton
                label="Find Nearby Pharmacies"
                onPress={() => router.push("/pharmacy-locator")}
              />
            </View>
          </View>
        </View>
        {/* PHARMACY SECTION */}

      </ImageBackground>

      {/* ================= PHONE MOCK ================= */}
      <View style={styles.phoneWrapper}>
        <View style={styles.phoneOuter}>
          <View style={styles.phoneInner}>
            <Text style={styles.mockTime}>10:00 AM</Text>

            <MockMedicationCard
              title="AMOXICILLIN"
              subtitle="Take one capsule with water"
              status="On time"
              color="#2563EB"
            />

            <MockSmallCard title="Vitamin D3" time="1:00 PM" color="#F97316" />
            <MockSmallCard title="Insulin" time="7:00 PM" color="#9333EA" />
          </View>
        </View>
      </View>

      {/* ================= FEATURES ================= */}
      <View style={[styles.section, styles.centered]}>
        <Text style={styles.sectionTitle}>
          Everything you need to stay healthy
        </Text>
        <Text style={styles.sectionSubtitle}>
          Comprehensive medication management tools designed for your peace of
          mind
        </Text>

        <View style={styles.featuresGrid}>
          <FeatureCard
            emoji="⏰"
            title="Easy Reminders"
            description="Set dose times, refill alerts, and get timely notifications."
          />
          <FeatureCard
            emoji="📋"
            title="Track Prescriptions"
            description="Maintain dosage history and share reports with doctors."
          />
          <FeatureCard
            emoji="🏥"
            title="Pharmacy Near You"
            description="Locate nearby pharmacies and manage refills easily."
          />
        </View>
      </View>

      {/* ================= CTA ================= */}
      <View style={styles.cta}>
        <View style={styles.centered}>
          <Text style={styles.ctaTitle}>
            Ready to take control of your health?
          </Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands who trust RxMind for medication safety.
          </Text>

          <PrimaryButton
            label="Get Started Free"
            onPress={() => router.push("/(auth)/signup")}
          />

          <OutlineButton
            label="Need help? Chat with Support"
            onPress={() => router.push("/help" as any)}
            light
          />
        </View>
      </View>
    </ScrollView>
  );
}

/* ===============================
   COMPONENTS
================================ */

function PrimaryButton({ label, onPress }: any) {
  return (
    <Pressable style={styles.primaryBtn} onPress={onPress}>
      <Text style={styles.primaryBtnText}>{label}</Text>
    </Pressable>
  );
}

function OutlineButton({ label, onPress, light }: any) {
  return (
    <Pressable
      style={[
        styles.outlineBtn,
        light && { borderColor: "#BFDBFE" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.outlineBtnText,
          light && { color: "#FFFFFF" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function FeatureCard({ emoji, title, description }: any) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </View>
  );
}

function MockMedicationCard({ title, subtitle, status, color }: any) {
  return (
    <View style={styles.mockMainCard}>
      <Text style={[styles.mockTitle, { color }]}>{title}</Text>
      <Text style={styles.mockSubtitle}>{subtitle}</Text>
      <Text style={styles.mockStatus}>{status}</Text>
    </View>
  );
}

function MockSmallCard({ title, time, color }: any) {
  return (
    <View style={styles.mockSmallCard}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View>
        <Text style={styles.mockSmallTitle}>{title}</Text>
        <Text style={styles.mockSmallTime}>{time}</Text>
      </View>
    </View>
  );
}

/* ===============================
   STYLES
================================ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  centered: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },

  // heroBg: {
  //   minHeight: isTablet ? 700 : 560,
  //   justifyContent: "center",
  //   paddingVertical: isTablet ? 60 : 40,
  // },
  heroBg: {
  width: "100%",
  height: SCREEN_HEIGHT,
  justifyContent: "center",
},


  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
  },

  heroContent: {
    paddingHorizontal: 24,
    alignItems: "center",
  },

  badge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },

  badgeText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  title: {
    fontSize: clamp(36, isSmallPhone ? 26 : 30, isTablet ? 46 : 38),
    fontWeight: "800",
    textAlign: "center",
    color: "#1E40AF",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: clamp(16, 14, 18),
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 24,
  },

  heroButtons: {
    width: "100%",
    gap: 12,
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: isSmallPhone ? 12 : 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: isSmallPhone ? 12 : 14,
    borderRadius: 14,
    alignItems: "center",
  },

  outlineBtnText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },

  phoneWrapper: {
    alignItems: "center",
    marginTop: -40,
  },

  phoneOuter: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    padding: 6,
    width: clamp(SCREEN_WIDTH * 0.7, 280, isTablet ? 420 : 340),
  },

  phoneInner: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 16,
    gap: 12,
  },

  mockTime: {
    fontSize: 12,
    color: "#6B7280",
    alignSelf: "flex-end",
  },

  mockMainCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 12,
  },

  mockTitle: {
    fontWeight: "700",
    fontSize: 14,
  },

  mockSubtitle: {
    fontSize: 12,
    color: "#4B5563",
  },

  mockStatus: {
    fontSize: 12,
    color: "#16A34A",
  },

  mockSmallCard: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },

  mockSmallTitle: {
    fontSize: 13,
    fontWeight: "600",
  },

  mockSmallTime: {
    fontSize: 12,
    color: "#6B7280",
  },

  section: {
    padding: 24,
  },

  sectionTitle: {
    fontSize: clamp(26, 22, isTablet ? 34 : 28),
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  sectionSubtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
  },

  featuresGrid: {
    flexDirection: isTablet ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },

  featureCard: {
    width: isTablet ? "48%" : "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    elevation: 3,
  },

  featureEmoji: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },

  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  featureDesc: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 6,
  },

  cta: {
    backgroundColor: "#2563EB",
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginTop: 24,
  },

  ctaTitle: {
    fontSize: clamp(26, 22, 32),
    fontWeight: "800",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 8,
  },

  ctaSubtitle: {
    fontSize: 15,
    color: "#DBEAFE",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionCard: {
  backgroundColor: "white",
  padding: 16,
  borderRadius: 14,
  marginTop: 20,
  elevation: 2,
},

sectionRow: {
  flexDirection: "row",
  alignItems: "center",
},

iconCircle: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#3b82f6",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 14,
},

// sectionTitle: {
//   fontSize: 16,
//   fontWeight: "bold",
// },

// sectionSubtitle: {
//   fontSize: 12,
//   color: "#666",
// },

goButton: {
  backgroundColor: "#3b82f6",
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 8,
},

goText: {
  color: "white",
  fontWeight: "600",
},

});



// v1
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ImageBackground,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// export default function HomeScreen() {
//   const navigation = useNavigation<any>();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     setVisible(true);
//   }, []);

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* ================= Background + Hero ================= */}
//       <ImageBackground
//         source={require("../../assets/images/Bgimg.jpg")}
//         resizeMode="cover"
//         style={styles.heroBg}
//       >
//         <View style={styles.overlay} />

//         <View style={styles.heroContent}>
//           {/* Badge */}
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>
//               Giving your prescriptions, the wings of reminders
//             </Text>
//           </View>

//           {/* Title */}
//           <Text style={styles.title}>Never Miss a Dose Again.</Text>

//           {/* Subtitle */}
//           <Text style={styles.subtitle}>
//             Seamlessly manage your medications, set personalized reminders, and
//             track your health with RxMind — your trusted partner in well-being.
//           </Text>

//           {/* Buttons */}
//           <View style={styles.heroButtons}>
//             <PrimaryButton
//               label="Get Started"
//               onPress={() => navigation.navigate("signup")}
//             />
//             <OutlineButton
//               label="Learn More"
//               onPress={() => navigation.navigate("learn-more")}
//             />
//           </View>
//         </View>
//       </ImageBackground>

//       {/* ================= Phone Preview ================= */}
//       <View style={styles.phoneWrapper}>
//         <View style={styles.phoneOuter}>
//           <View style={styles.phoneInner}>
//             <Text style={styles.mockTime}>10:00 AM</Text>

//             <MockMedicationCard
//               title="AMOXICILLIN"
//               subtitle="Take one capsule with water"
//               status="On time"
//               color="#2563EB"
//             />

//             <MockSmallCard title="Vitamin D3" time="1:00 PM" color="#F97316" />
//             <MockSmallCard title="Insulin" time="7:00 PM" color="#9333EA" />
//           </View>
//         </View>
//       </View>

//       {/* ================= Features ================= */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>
//           Everything you need to stay healthy
//         </Text>
//         <Text style={styles.sectionSubtitle}>
//           Comprehensive medication management tools designed for your peace of
//           mind
//         </Text>

//         <FeatureCard
//           emoji="⏰"
//           title="Easy Reminders"
//           description="Set dose times & refill alerts, customize schedules, and get timely notifications so you never forget."
//         />
//         <FeatureCard
//           emoji="📋"
//           title="Track Prescriptions"
//           description="Maintain dosage history, monitor adherence patterns, and share reports with your doctor."
//         />
//         <FeatureCard
//           emoji="🏥"
//           title="Pharmacy Near You"
//           description="Quickly locate nearby pharmacies and manage refills on the go."
//         />
//       </View>

//       {/* ================= CTA ================= */}
//       <View style={styles.cta}>
//         <Text style={styles.ctaTitle}>
//           Ready to take control of your health?
//         </Text>
//         <Text style={styles.ctaSubtitle}>
//           Join thousands of users who trust RxMind to manage medications safely.
//         </Text>

//         <PrimaryButton
//           label="Get Started Free"
//           onPress={() => navigation.navigate("signup")}
//         />

//         <OutlineButton
//           label="Need help? Chat with Support"
//           onPress={() => navigation.navigate("help")}
//           light
//         />
//       </View>
//     </ScrollView>
//   );
// }

// /* ================= Reusable Components ================= */

// function PrimaryButton({ label, onPress }: any) {
//   return (
//     <Pressable style={styles.primaryBtn} onPress={onPress}>
//       <Text style={styles.primaryBtnText}>{label}</Text>
//     </Pressable>
//   );
// }

// function OutlineButton({ label, onPress, light }: any) {
//   return (
//     <Pressable
//       style={[
//         styles.outlineBtn,
//         light && { borderColor: "#BFDBFE" },
//       ]}
//       onPress={onPress}
//     >
//       <Text
//         style={[
//           styles.outlineBtnText,
//           light && { color: "#FFFFFF" },
//         ]}
//       >
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function FeatureCard({ emoji, title, description }: any) {
//   return (
//     <View style={styles.featureCard}>
//       <Text style={styles.featureEmoji}>{emoji}</Text>
//       <Text style={styles.featureTitle}>{title}</Text>
//       <Text style={styles.featureDesc}>{description}</Text>
//     </View>
//   );
// }

// function MockMedicationCard({ title, subtitle, status, color }: any) {
//   return (
//     <View style={styles.mockMainCard}>
//       <Text style={[styles.mockTitle, { color }]}>{title}</Text>
//       <Text style={styles.mockSubtitle}>{subtitle}</Text>
//       <Text style={styles.mockStatus}>{status}</Text>
//     </View>
//   );
// }

// function MockSmallCard({ title, time, color }: any) {
//   return (
//     <View style={styles.mockSmallCard}>
//       <View style={[styles.dot, { backgroundColor: color }]} />
//       <View>
//         <Text style={styles.mockSmallTitle}>{title}</Text>
//         <Text style={styles.mockSmallTime}>{time}</Text>
//       </View>
//     </View>
//   );
// }

// /* ================= Styles ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },

//   heroBg: { height: 560, justifyContent: "center" },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(255,255,255,0.6)",
//   },
//   heroContent: {
//     paddingHorizontal: 24,
//     alignItems: "center",
//   },

//   badge: {
//     backgroundColor: "#DBEAFE",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 999,
//     marginBottom: 16,
//   },
//   badgeText: { color: "#1D4ED8", fontSize: 12, fontWeight: "600" },

//   title: {
//     fontSize: 36,
//     fontWeight: "800",
//     textAlign: "center",
//     color: "#1E40AF",
//     marginBottom: 12,
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     marginBottom: 24,
//   },

//   heroButtons: { gap: 12, width: "100%" },

//   primaryBtn: {
//     backgroundColor: "#2563EB",
//     paddingVertical: 14,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   primaryBtnText: { color: "#FFF", fontSize: 16, fontWeight: "600" },

//   outlineBtn: {
//     borderWidth: 1,
//     borderColor: "#2563EB",
//     paddingVertical: 14,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   outlineBtnText: { color: "#2563EB", fontSize: 16, fontWeight: "600" },

//   phoneWrapper: { alignItems: "center", marginTop: -40 },
//   phoneOuter: {
//     backgroundColor: "#2563EB",
//     borderRadius: 28,
//     padding: 6,
//     width: width * 0.75,
//   },
//   phoneInner: {
//     backgroundColor: "#FFF",
//     borderRadius: 22,
//     padding: 16,
//     gap: 12,
//   },
//   mockTime: { fontSize: 12, color: "#6B7280", alignSelf: "flex-end" },

//   mockMainCard: {
//     backgroundColor: "#EFF6FF",
//     borderRadius: 14,
//     padding: 12,
//   },
//   mockTitle: { fontWeight: "700", fontSize: 14 },
//   mockSubtitle: { fontSize: 12, color: "#4B5563" },
//   mockStatus: { fontSize: 12, color: "#16A34A" },

//   mockSmallCard: {
//     flexDirection: "row",
//     gap: 10,
//     backgroundColor: "#F9FAFB",
//     padding: 10,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   dot: { width: 10, height: 10, borderRadius: 999 },
//   mockSmallTitle: { fontSize: 13, fontWeight: "600" },
//   mockSmallTime: { fontSize: 12, color: "#6B7280" },

//   section: { padding: 24 },
//   sectionTitle: {
//     fontSize: 26,
//     fontWeight: "800",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   sectionSubtitle: {
//     fontSize: 15,
//     textAlign: "center",
//     color: "#6B7280",
//     marginBottom: 20,
//   },

//   featureCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 20,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   featureEmoji: { fontSize: 30, textAlign: "center", marginBottom: 10 },
//   featureTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },
//   featureDesc: {
//     fontSize: 14,
//     color: "#4B5563",
//     textAlign: "center",
//     marginTop: 6,
//   },

//   cta: {
//     backgroundColor: "#2563EB",
//     padding: 28,
//     gap: 14,
//   },
//   ctaTitle: {
//     fontSize: 26,
//     fontWeight: "800",
//     color: "#FFF",
//     textAlign: "center",
//   },
//   ctaSubtitle: {
//     fontSize: 15,
//     color: "#DBEAFE",
//     textAlign: "center",
//   },
// });
 


















// expo-original template
// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
