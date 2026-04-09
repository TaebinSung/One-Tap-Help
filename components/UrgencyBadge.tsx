import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Urgency } from "../types/request";

const URGENCY_LABEL: Record<Urgency, string> = {
  low: "LOW",
  normal: "NORMAL",
  high: "HIGH",
  emergency: "EMERGENCY",
};

export default function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  return (
    <View style={[styles.badge, stylesByUrgency[urgency]]}>
      <Text style={styles.text}>{URGENCY_LABEL[urgency]}</Text>
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
