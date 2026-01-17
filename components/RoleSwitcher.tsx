import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type Role = "patient" | "caretaker" | "guardian" | "history";

export default function RoleSwitcher({
  role,
  onChangeRole,
}: {
  role: Role;
  onChangeRole: (r: Role) => void;
}) {
  return (
    <View style={styles.bar}>
      <Text style={styles.title}>Demo Mode</Text>

      <View style={styles.row}>
        <Pressable
          onPress={() => onChangeRole("patient")}
          style={[styles.pill, role === "patient" && styles.pillActive]}
        >
          <Text style={[styles.pillText, role === "patient" && styles.pillTextActive]}>
            Patient
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChangeRole("caretaker")}
          style={[styles.pill, role === "caretaker" && styles.pillActive]}
        >
          <Text
            style={[
              styles.pillText,
              role === "caretaker" && styles.pillTextActive,
            ]}
          >
            Caretaker
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChangeRole("guardian")}
          style={[styles.pill, role === "guardian" && styles.pillActive]}
        >
          <Text
            style={[
              styles.pillText,
              role === "guardian" && styles.pillTextActive,
            ]}
          >
            Guardian
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChangeRole("history")}
          style={[styles.pill, role === "history" && styles.pillActive]}
        >
          <Text
            style={[
              styles.pillText,
              role === "history" && styles.pillTextActive,
            ]}
          >
            History
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#F5F7FA",
  },
  title: { fontSize: 14, fontWeight: "700", color: "#111827", marginBottom: 8 },
  row: { flexDirection: "row", gap: 10 },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  pillActive: { backgroundColor: "#111827" },
  pillText: { fontWeight: "800", color: "#111827" },
  pillTextActive: { color: "#FFFFFF" },
});
