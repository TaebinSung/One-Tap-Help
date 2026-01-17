import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Urgency } from "../types/request";

function label(u: Urgency) {
  if (u === "low") return "LOW";
  if (u === "normal") return "NORMAL";
  if (u === "high") return "HIGH";
  return "EMERGENCY";
}

export default function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  return (
    <View style={[styles.badge, stylesByUrgency[urgency]]}>
      <Text style={styles.text}>{label(urgency)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  text: { fontSize: 12, fontWeight: "900", color: "#111827" },
});

const stylesByUrgency = StyleSheet.create({
  low: { backgroundColor: "#E5E7EB" },
  normal: { backgroundColor: "#DBEAFE" },
  high: { backgroundColor: "#FEF3C7" },
  emergency: { backgroundColor: "#FEE2E2" },
});
