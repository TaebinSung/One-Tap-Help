import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { createRequest, listenRequests, FireRequest } from "./requestsApi";
import { Urgency } from "../types/request";

function BigButton({ label, onPress, variant = "default" }: any) {
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
  const [latest, setLatest] = useState<FireRequest | null>(null);

  useEffect(() => {
    const unsub = listenRequests((items) => {
      setLatest(items[0] ?? null);
    });
    return unsub;
  }, []);

  const patientId = "patientA";

  const handleCreate = async (title: string, urgency: Urgency) => {
    try {
      await createRequest({ title, urgency, createdBy: patientId });
      console.log("Request created successfully");
    } catch (error) {
      console.error("Failed to create request:", error);
    }
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

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last Request</Text>
        {latest ? (
          <>
            <Text style={styles.cardLine}>Title: {latest.title}</Text>
            <Text style={styles.cardLine}>Urgency: {latest.urgency}</Text>
            <Text style={styles.cardLine}>Status: {latest.status}</Text>
            <Text style={styles.cardLine}>
              Accepted by: {latest.acceptedBy ?? "—"}
            </Text>
          </>
        ) : (
          <Text style={styles.cardLine}>No requests yet.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigBtn: {
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  bigBtnDanger: {
    backgroundColor: "#FF3B30",
  },
  bigBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sub: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  buttons: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardLine: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
});
