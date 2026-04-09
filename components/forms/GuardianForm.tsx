import React from "react";
import { View, Text, TextInput } from "react-native";
import { formStyles as s } from "./formStyles";

export type GuardianFormState = {
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  patientName: string;
  healthCondition: string;
};

interface Props {
  value: GuardianFormState;
  onChange: (updates: Partial<GuardianFormState>) => void;
  wordCount: number;
}

export default function GuardianForm({ value, onChange, wordCount }: Props) {
  return (
    <>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Guardian Information</Text>

        <Text style={s.label}>Full Name *</Text>
        <TextInput
          style={s.input}
          placeholder="Enter your full name"
          value={value.fullName}
          onChangeText={(v) => onChange({ fullName: v })}
        />

        <Text style={s.label}>Phone *</Text>
        <TextInput
          style={s.input}
          placeholder="Enter your phone number"
          value={value.phone}
          onChangeText={(v) => onChange({ phone: v })}
          keyboardType="phone-pad"
        />

        <Text style={s.label}>Email *</Text>
        <TextInput
          style={s.input}
          placeholder="Enter your email"
          value={value.email}
          onChangeText={(v) => onChange({ email: v })}
          keyboardType="email-address"
        />

        <Text style={s.label}>Relationship to Patient</Text>
        <TextInput
          style={s.input}
          placeholder="e.g., Parent, Spouse, Sibling"
          value={value.relationship}
          onChangeText={(v) => onChange({ relationship: v })}
        />
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Patient Information</Text>

        <Text style={s.label}>Patient Full Name *</Text>
        <TextInput
          style={s.input}
          placeholder="Enter patient's full name"
          value={value.patientName}
          onChangeText={(v) => onChange({ patientName: v })}
        />

        <Text style={s.label}>Health Condition *</Text>
        <TextInput
          style={[s.input, s.multilineInput]}
          placeholder="Describe patient's health condition (max 150 words)"
          value={value.healthCondition}
          onChangeText={(v) => onChange({ healthCondition: v })}
          multiline
          numberOfLines={5}
        />
        <Text style={s.wordCount}>{wordCount}/150 words</Text>
      </View>
    </>
  );
}
