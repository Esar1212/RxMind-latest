import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("YOUR_API_URL/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
        return;
      }

      console.log("Login successful:", result);

      // Save token (AsyncStorage recommended)
      Alert.alert("Success", "Logged in successfully");

      navigation.replace("Dashboard");
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    navigation.replace("Dashboard");
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoRow}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>RX</Text>
        </View>
        <Text style={styles.brand}>RxMind</Text>
      </View>

      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subtext}>
        Sign in to manage your medications.
      </Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={formData.email}
        onChangeText={(v) => setFormData({ ...formData, email: v })}
      />

      {/* PASSWORD */}
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={formData.password}
          onChangeText={(v) => setFormData({ ...formData, password: v })}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* OR */}
      <Text style={styles.or}>──────── OR ────────</Text>

      {/* GOOGLE LOGIN */}
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
        <Ionicons name="logo-google" size={20} />
        <Text style={styles.googleText}> Continue with Google</Text>
      </TouchableOpacity>

      {/* SIGNUP LINK */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={{ color: "#2563eb" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
    justifyContent: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  logoText: { color: "white", fontWeight: "bold" },
  brand: { fontSize: 28, fontWeight: "bold", color: "#2563eb" },

  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtext: { textAlign: "center", marginBottom: 30, color: "gray" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },

  passwordWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    padding: 14,
  },

  eyeIcon: {
    padding: 10,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { color: "white", fontWeight: "bold" },

  or: {
    textAlign: "center",
    marginVertical: 20,
    color: "gray",
  },

  googleBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  googleText: { marginLeft: 6 },

  signupText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});
