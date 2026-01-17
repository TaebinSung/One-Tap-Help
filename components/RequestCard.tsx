import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { RequestItem } from "../types/request";
import { timeAgo } from "../utils/time";
import UrgencyBadge from "./UrgencyBadge";

export default function RequestCard({
  item,
  onAcknowledge,
  onResolve,
  acceptedBy,
  disabledReason,
  currentUserId,
}: {
  item: any;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
  acceptedBy?: string | null;
  disabledReason?: string;
  currentUserId?: string;
}) {
  const isCompleted = item.status === "completed";
  const isEmergency = item.urgency === "emergency";
  const alreadyAccepted = item.status === "accepted";
  const canAccept = item.status === "pending" && !isCompleted;
  const isAcceptedByMe = acceptedBy && currentUserId && acceptedBy === currentUserId;
  const isAcceptedByOther = acceptedBy && currentUserId && acceptedBy !== currentUserId;
  const canComplete = isAcceptedByMe && !isCompleted;

  return (
    <View
      style={[
        styles.card,
        isCompleted && styles.cardResolved,
        isEmergency && styles.cardEmergency,
      ]}
    >
      <View style={styles.topRow}>
        <Text
          style={[
            styles.title,
            isCompleted && styles.muted,
            isEmergency && styles.emergencyText,
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <UrgencyBadge urgency={item.urgency} />
      </View>

      <Text style={[styles.meta, isCompleted && styles.muted]}>
        {timeAgo(item.createdAt)} • {item.status.toUpperCase()}
      </Text>

      {acceptedBy && (
        <Text style={[styles.meta, styles.muted]}>
          Accepted by: {acceptedBy}
        </Text>
      )}

      {disabledReason && alreadyAccepted && (
        <Text style={[styles.meta, styles.hint]}>
          💡 {disabledReason}
        </Text>
      )}

      <View style={styles.actionsRow}>
        <Pressable
          disabled={!canAccept}
          onPress={() => onAcknowledge(item.id)}
          style={({ pressed }) => [
            styles.btn,
            styles.ack,
            !canAccept && styles.disabled,
            pressed && canAccept && styles.pressed,
          ]}
        >
          <Text style={styles.btnText}>Accept</Text>
        </Pressable>

        <Pressable
          disabled={!canComplete}
          onPress={() => onResolve(item.id)}
          style={({ pressed }) => [
            styles.btn,
            styles.resolve,
            !canComplete && styles.disabled,
            pressed && canComplete && styles.pressed,
          ]}
        >
          <Text style={styles.btnText}>
            {isAcceptedByOther ? "Accepted" : "Complete"}
          </Text>
        </Pressable>
      </View>

      {isAcceptedByOther && (
        <Text style={styles.acceptedByOtherHint}>
          ⏳ Waiting for {acceptedBy} to complete
        </Text>
      )}

      {isEmergency && (
        <Text style={styles.emergencyHint}>
          Emergency is pinned to the top until completed.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardResolved: { opacity: 0.55 },
  cardEmergency: { borderWidth: 2, borderColor: "#B91C1C" },

  topRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  title: { fontSize: 18, fontWeight: "800", color: "#111827", flexShrink: 1 },
  meta: { marginTop: 6, fontSize: 13, color: "#374151" },

  muted: { color: "#6B7280" },
  emergencyText: { color: "#B91C1C" },

  actionsRow: { marginTop: 12, flexDirection: "row", gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  ack: { backgroundColor: "#2563EB" },
  resolve: { backgroundColor: "#059669" },
  btnText: { color: "#FFFFFF", fontWeight: "900" },

  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.8 },

  emergencyHint: { marginTop: 10, fontSize: 12, fontWeight: "700", color: "#B91C1C" },
  acceptedByOtherHint: { marginTop: 8, fontSize: 12, fontWeight: "600", color: "#666" },
  hint: { color: "#FF9500", marginTop: 8, fontSize: 12 },
});
