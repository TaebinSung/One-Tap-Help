import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import PatientScreen from "./screens/PatientScreen";
import type { SignInRole, SignInFormData } from "./types/signIn";
import CaretakerScreen from "./screens/CaregiverScreen";
import GuardianScreen from "./screens/GuardianScreen";
import HistoryScreen from "./screens/HistoryScreen";

type Role = "patient" | "caretaker" | "guardian" | "history" | null;
type AppScreen = "welcome" | "signin" | "main";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome");
  const [role, setRole] = useState<Role>(null);
  const [prevRole, setPrevRole] = useState<Role>("patient");

  const handleSignInComplete = (signInRole: SignInRole, _data: SignInFormData) => {
    // Map sign-in roles to app roles
    const roleMap: { [key: string]: Role } = {
      PATIENT: "patient",
      CAREGIVER: "caretaker",
      GUARDIAN: "guardian",
    };

    const appRole = roleMap[signInRole];
    if (appRole) {
      setRole(appRole);
      setCurrentScreen("main");
    }
  };

  const handleSignInCancel = () => {
    setCurrentScreen("welcome");
  };

  const handleLogIn = () => {
    // For now, log in goes to patient screen by default
    setRole("patient");
    setCurrentScreen("main");
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safe}>
      {currentScreen === "welcome" && (
        <WelcomeScreen
          onSignIn={() => setCurrentScreen("signin")}
          onLogIn={handleLogIn}
        />
      )}

      {currentScreen === "signin" && (
        <SignInScreen
          onComplete={handleSignInComplete}
          onCancel={handleSignInCancel}
        />
      )}

      {currentScreen === "main" && (
        <>
          {role === "patient" && <PatientScreen />}
          {role === "caretaker" && (
            <CaretakerScreen onViewHistory={() => { setPrevRole("caretaker"); setRole("history"); }} />
          )}
          {role === "guardian" && (
            <GuardianScreen onViewHistory={() => { setPrevRole("guardian"); setRole("history"); }} />
          )}
          {role === "history" && (
            <HistoryScreen onBack={() => setRole(prevRole)} />
          )}
        </>
      )}
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FA" },
});


