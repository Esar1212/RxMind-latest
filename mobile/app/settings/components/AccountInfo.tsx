import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Edit, Save, X } from "lucide-react-native";

interface Props {
  user: {
    name: string;
    email: string;
    phone: string;
    age: string;
  };
  onUpdate: (field: string, value: string) => void;
}

export default function AccountInfo({ user, onUpdate }: Props) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = (field: string) => {
    onUpdate(field, tempValue);
    setEditingField(null);
    setTempValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const renderField = (field: string, label: string, value: string) => (
    <View style={styles.fieldCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>

        {editingField === field ? (
          <TextInput
            value={tempValue}
            onChangeText={setTempValue}
            style={styles.input}
            autoFocus
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        {editingField === field ? (
          <>
            <Pressable
              style={[styles.iconBtn, { backgroundColor: "#16A34A" }]}
              onPress={() => handleSave(field)}
            >
              <Save size={16} color="white" />
            </Pressable>

            <Pressable
              style={[styles.iconBtn, styles.cancelBtn]}
              onPress={handleCancel}
            >
              <X size={16} color="#374151" />
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[styles.iconBtn, styles.editBtn]}
            onPress={() => handleEdit(field, value)}
          >
            <Edit size={16} color="#2563EB" />
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Info</Text>

      {renderField("name", "Name", user.name)}
      {renderField("email", "Email", user.email)}
      {renderField("phone", "Phone", user.phone)}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    elevation: 2,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  fieldCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#2563EB",
    marginTop: 4,
    paddingVertical: 4,
    fontSize: 16,
  },

  buttonRow: {
    flexDirection: "row",
    marginLeft: 10,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  editBtn: {
    borderWidth: 1,
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },
});
