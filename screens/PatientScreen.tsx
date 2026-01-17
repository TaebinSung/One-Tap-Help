import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { createRequest } from "../store/requestsApi";
import { Urgency } from "../types/request";

function BigButton({
  label,
  onPress,
  variant = "default",
}: {
  label: string;
  onPress: () => void;
  variant?: "default" | "danger";
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bigBtn,
        variant === "danger" && styles.bigBtnDanger,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.bigBtnText}>{label}</Text>
    </Pressable>
  );
}

export default function PatientScreen() {
  const patientId = "patientA";

  const handleCreate = (title: string, urgency: Urgency) => {
    createRequest({ title, urgency, createdBy: patientId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient</Text>
      <Text style={styles.sub}>Tap once to request help.</Text>

      <View style={styles.buttons}>
        <BigButton label="WATER" onPress={() => handleCreate("Water", "normal")} />
        <BigButton label="HELP" onPress={() => handleCreate("Help", "high")} />
        <BigButton
          label="EMERGENCY"
          variant="danger"
          onPress={() => handleCreate("Emergency", "emergency")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  sub: { fontSize: 14, opacity: 0.7, marginBottom: 24 },

  buttons: { gap: 12 },

  bigBtn: {
    height: 72,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },
  bigBtnDanger: {
    backgroundColor: "#B91C1C",
  },
  bigBtnText: { color: "white", fontSize: 18, fontWeight: "800" },
});
