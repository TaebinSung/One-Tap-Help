import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import GuardianForm, { GuardianFormState } from "../components/forms/GuardianForm";
import PatientForm, { PatientFormState } from "../components/forms/PatientForm";
import CaregiverForm, { CaregiverFormState } from "../components/forms/CaregiverForm";
import { validateEmail, validatePhone } from "../utils/validation";
import type { SignInRole, SignInFormData } from "../types/signIn";

type Step = "ROLE_SELECTION" | "DETAILS_FORM";

const ROLES: SignInRole[] = ["GUARDIAN", "PATIENT", "CAREGIVER"];

const INITIAL_GUARDIAN: GuardianFormState = {
  fullName: "", phone: "", email: "", relationship: "", patientName: "", healthCondition: "",
};
const INITIAL_PATIENT: PatientFormState = {
  fullName: "", phone: "", email: "", healthCondition: "",
};
const INITIAL_CAREGIVER: CaregiverFormState = {
  fullName: "", phone: "", email: "",
};

export default function SignInScreen({
  onComplete,
  onCancel,
}: {
  onComplete?: (role: SignInRole, data: SignInFormData) => void;
  onCancel?: () => void;
}) {
  const [step, setStep] = useState<Step>("ROLE_SELECTION");
  const [role, setRole] = useState<SignInRole | null>(null);
  const [guardianForm, setGuardianForm] = useState<GuardianFormState>(INITIAL_GUARDIAN);
  const [patientForm, setPatientForm] = useState<PatientFormState>(INITIAL_PATIENT);
  const [caregiverForm, setCaregiverForm] = useState<CaregiverFormState>(INITIAL_CAREGIVER);

  const wordCount = useMemo(() => {
    const text = role === "GUARDIAN" ? guardianForm.healthCondition : patientForm.healthCondition;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [role, guardianForm.healthCondition, patientForm.healthCondition]);

  const handleRoleSelect = (r: SignInRole) => {
    setRole(r);
    setStep("DETAILS_FORM");
  };

  const validateForm = (): boolean => {
    const err = (msg: string) => { Alert.alert("Validation Error", msg); return false; };

    if (role === "GUARDIAN") {
      if (!guardianForm.fullName.trim()) return err("Guardian Full Name is required");
      if (!validatePhone(guardianForm.phone)) return err("Valid Guardian Phone is required");
      if (!validateEmail(guardianForm.email)) return err("Valid Guardian Email is required");
      if (!guardianForm.patientName.trim()) return err("Patient Full Name is required");
      if (wordCount === 0 || wordCount > 150) return err("Health Condition must be 1–150 words");
    } else if (role === "PATIENT") {
      if (!patientForm.fullName.trim()) return err("Full Name is required");
      if (!validatePhone(patientForm.phone)) return err("Valid Phone is required");
      if (!validateEmail(patientForm.email)) return err("Valid Email is required");
      if (wordCount === 0 || wordCount > 150) return err("Health Condition must be 1–150 words");
    } else if (role === "CAREGIVER") {
      if (!caregiverForm.fullName.trim()) return err("Full Name is required");
      if (!validatePhone(caregiverForm.phone)) return err("Valid Phone is required");
      if (!validateEmail(caregiverForm.email)) return err("Valid Email is required");
    }
    return true;
  };

  const handleNext = () => {
    if (!validateForm() || !role) return;

    let data: SignInFormData;
    if (role === "GUARDIAN") {
      data = {
        role: "GUARDIAN",
        guardianFullName: guardianForm.fullName,
        guardianPhone: guardianForm.phone,
        guardianEmail: guardianForm.email,
        guardianRelationship: guardianForm.relationship,
        patientFullName: guardianForm.patientName,
        healthCondition: guardianForm.healthCondition,
      };
    } else if (role === "PATIENT") {
      data = {
        role: "PATIENT",
        fullName: patientForm.fullName,
        phone: patientForm.phone,
        email: patientForm.email,
        healthCondition: patientForm.healthCondition,
      };
    } else {
      data = {
        role: "CAREGIVER",
        fullName: caregiverForm.fullName,
        phone: caregiverForm.phone,
        email: caregiverForm.email,
      };
    }

    onComplete ? onComplete(role, data) : Alert.alert("Success", "Sign-in process completed!");
  };

  const handleBack = () => {
    setStep("ROLE_SELECTION");
    setRole(null);
    setGuardianForm(INITIAL_GUARDIAN);
    setPatientForm(INITIAL_PATIENT);
    setCaregiverForm(INITIAL_CAREGIVER);
  };

  if (step === "ROLE_SELECTION") {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Your Role</Text>
          <Text style={styles.subtitle}>Choose how you want to proceed</Text>
          <View style={styles.roleButtonsContainer}>
            {ROLES.map((r) => (
              <Pressable
                key={r}
                style={({ pressed }) => [styles.roleButton, pressed && styles.roleButtonPressed]}
                onPress={() => handleRoleSelect(r)}
              >
                <Text style={styles.roleButtonText}>
                  {r.charAt(0) + r.slice(1).toLowerCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            {role === "GUARDIAN"
              ? "Guardian Sign In"
              : role === "PATIENT"
              ? "Patient Sign In"
              : "Caregiver Sign In"}
          </Text>

          {role === "GUARDIAN" && (
            <GuardianForm
              value={guardianForm}
              onChange={(u) => setGuardianForm((f) => ({ ...f, ...u }))}
              wordCount={wordCount}
            />
          )}
          {role === "PATIENT" && (
            <PatientForm
              value={patientForm}
              onChange={(u) => setPatientForm((f) => ({ ...f, ...u }))}
              wordCount={wordCount}
            />
          )}
          {role === "CAREGIVER" && (
            <CaregiverForm
              value={caregiverForm}
              onChange={(u) => setCaregiverForm((f) => ({ ...f, ...u }))}
            />
          )}

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
              onPress={onCancel ?? handleBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.nextButton, pressed && styles.buttonPressed]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F1EC" },
  container: { flex: 1, padding: 16 },
  formContainer: { flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  roleButtonsContainer: { gap: 12, marginTop: 20 },
  roleButton: {
    backgroundColor: "#87CEEB",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  roleButtonPressed: { backgroundColor: "#B0E0E6" },
  roleButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  buttonContainer: { flexDirection: "row", gap: 12, marginVertical: 20 },
  backButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  backButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  nextButton: {
    flex: 1,
    backgroundColor: "#57BF42",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  nextButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  buttonPressed: { opacity: 0.7 },
});
