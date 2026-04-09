import React from "react";
import { View, Text, TextInput } from "react-native";
import { formStyles as s } from "./formStyles";

export type PatientFormState = {
  fullName: string;
  phone: string;
  email: string;
  healthCondition: string;
};

interface Props {
  value: PatientFormState;
  onChange: (updates: Partial<PatientFormState>) => void;
  wordCount: number;
}

export default function PatientForm({ value, onChange, wordCount }: Props) {
  return (
    <View style={s.section}>
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

      <Text style={s.label}>Health Condition *</Text>
      <TextInput
        style={[s.input, s.multilineInput]}
        placeholder="Describe your health condition (max 150 words)"
        value={value.healthCondition}
        onChangeText={(v) => onChange({ healthCondition: v })}
        multiline
        numberOfLines={5}
      />
      <Text style={s.wordCount}>{wordCount}/150 words</Text>
    </View>
  );
}
