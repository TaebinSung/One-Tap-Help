import React from "react";
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { createRequest } from "../store/requestsApi";
import { Urgency } from "../types/request";

function BigButton({
  label,
  onPress,
  variant = "water",
}: {
  label: string;
  onPress: () => void;
  variant?: "water" | "food" | "bathroom" | "help" | "emergency";
}) {
  const variantStyles = {
    water: styles.btnWater,
    food: styles.btnFood,
    bathroom: styles.btnBathroom,
    help: styles.btnHelp,
    emergency: styles.btnEmergency,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bigBtn,
        variantStyles[variant],
        pressed && { opacity: 0.9 },
      ]}
    >
      <Text style={styles.bigBtnText}>{label}</Text>
    </Pressable>
  );
}

export default function PatientScreen() {
  const patientId = "patientA";
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleCreate = (title: string, urgency: Urgency) => {
    createRequest({ title, urgency, createdBy: patientId });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.buttonsContainer,
          isLandscape && styles.buttonsContainerLandscape,
        ]}
      >
        <View
          style={[
            styles.buttonGrid,
            isLandscape && styles.buttonGridLandscape,
          ]}
        >
          <BigButton
            label="WATER"
            variant="water"
            onPress={() => handleCreate("Water", "normal")}
          />
          <BigButton
            label="FOOD"
            variant="food"
            onPress={() => handleCreate("Food", "high")}
          />
          <BigButton
            label="BATHROOM"
            variant="bathroom"
            onPress={() => handleCreate("Bathroom", "high")}
          />
          <BigButton
            label="HELP"
            variant="help"
            onPress={() => handleCreate("Help", "high")}
          />
          <BigButton
            label="EMERGENCY"
            variant="emergency"
            onPress={() => handleCreate("Emergency", "emergency")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },
  sub: {
    fontSize: 16,
    opacity: 0.6,
    color: "#666",
  },

  buttonsContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainerLandscape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 16,
    gap: 16,
  },

  headerLandscape: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
    paddingHorizontal: 12,
  },
  titleLandscape: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subLandscape: {
    fontSize: 12,
    opacity: 0.6,
    color: "#666",
    textAlign: "center",
  },

  buttonGrid: {
    flex: 1,
    gap: 12,
    justifyContent: "space-around",
    width: "100%",
  },
  buttonGridLandscape: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-around",
    alignItems: "stretch",
  },

  bigBtn: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
    flex: 1,
  },

  btnWater: {
    backgroundColor: "#3B82F6",
  },
  btnFood: {
    backgroundColor: "#F59E0B",
  },
  btnBathroom: {
    backgroundColor: "#8B5CF6",
  },
  btnHelp: {
    backgroundColor: "#EC4899",
  },
  btnEmergency: {
    backgroundColor: "#DC2626",
  },

  bigBtnText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
