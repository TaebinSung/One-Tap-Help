import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function PatientActionCard({
  label,
  onPress,
  variant = "normal",
}: {
  label: string;
  onPress: () => void;
  variant?: "normal" | "emergency";
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        variant === "emergency" && styles.emergencyCard,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, variant === "emergency" && styles.emergencyText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 26,
    borderRadius: 18,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  emergencyCard: {
    borderWidth: 2,
    borderColor: "#B91C1C",
  },
  text: { fontSize: 22, fontWeight: "800", color: "#111827" },
  emergencyText: { color: "#B91C1C" },
  pressed: { opacity: 0.75 },
});
