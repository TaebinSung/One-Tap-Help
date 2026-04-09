import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  section: {
    marginBottom: 24,
    backgroundColor: "#E1E1E3",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000000",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "#111827",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 14,
    color: "#111827",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top" as const,
  },
  wordCount: {
    fontSize: 12,
    color: "#666",
    marginBottom: 14,
  },
});
