import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
} from "react-native";
import {
  Shield,
  Key,
  FileText,
  Trash2,
} from "lucide-react-native";

interface Props {
  preferences: any;
  onPreferenceChange: (key: string, value: boolean) => void;
}

export default function Preferences({
  preferences,
  onPreferenceChange,
}: Props) {
  const renderToggle = (
    key: string,
    label: string,
    description: string
  ) => (
    <View style={styles.toggleCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Text style={styles.toggleDesc}>{description}</Text>
      </View>

      <Switch
        value={preferences[key]}
        onValueChange={(val) => onPreferenceChange(key, val)}
        trackColor={{ true: "#2563EB" }}
      />
    </View>
  );

  const renderAction = (
    Icon: any,
    color: string,
    title: string,
    desc: string,
    buttonText: string
  ) => (
    <View style={styles.actionCard}>
      <View style={styles.actionLeft}>
        <Icon size={20} color={color} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionDesc}>{desc}</Text>
        </View>
      </View>

      <Pressable style={styles.actionBtn}>
        <Text style={[styles.actionBtnText, { color }]}>{buttonText}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ gap: 20 }}>
      {/* CONTACT PREFS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Preferences</Text>

        {renderToggle("emailUpdates", "Email Updates", "Receive notifications via email")}
        {renderToggle("smsAlerts", "SMS Alerts", "Get alerts on your phone")}
        {renderToggle("promotionalOffers", "Promotional Offers", "Receive deals and offers")}
      </View>

      {/* NOTIFICATIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>

        {renderToggle("appointmentReminders", "Appointment Reminders", "Upcoming appointment alerts")}
        {renderToggle("prescriptionReminders", "Refill Reminders", "Medication refill alerts")}
        {renderToggle("healthTips", "Health Tips", "Personalized health advice")}
        {renderToggle("messageNotifications", "New Messages", "Provider message alerts")}
      </View>

      {/* SECURITY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>

        {renderAction(
          Key,
          "#2563EB",
          "Change Password",
          "Update your password regularly",
          "Change"
        )}

        {renderAction(
          Shield,
          "#16A34A",
          "Two-Factor Authentication",
          "Add extra account protection",
          "Setup"
        )}

        {renderAction(
          FileText,
          "#6B7280",
          "Privacy Policy",
          "View how your data is used",
          "View"
        )}

        <View style={[styles.actionCard, styles.deleteCard]}>
          <View style={styles.actionLeft}>
            <Trash2 size={20} color="#DC2626" />
            <View style={{ marginLeft: 12 }}>
              <Text style={[styles.actionTitle, { color: "#B91C1C" }]}>
                Delete Account
              </Text>
              <Text style={[styles.actionDesc, { color: "#DC2626" }]}>
                Permanently remove your account
              </Text>
            </View>
          </View>

          <Pressable style={styles.deleteBtn}>
            <Text style={{ color: "#DC2626", fontWeight: "600" }}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  section: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
  },

  toggleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  toggleLabel: {
    fontSize: 14,
    fontWeight: "600",
  },

  toggleDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  actionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  actionDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  actionBtnText: {
    fontWeight: "600",
  },

  deleteCard: {
    borderColor: "#FECACA",
    borderWidth: 1,
    backgroundColor: "#FEF2F2",
  },

  deleteBtn: {
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
