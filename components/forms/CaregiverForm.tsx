import React from "react";
import { View, Text, TextInput } from "react-native";
import { formStyles as s } from "./formStyles";

export type CaregiverFormState = {
  fullName: string;
  phone: string;
  email: string;
};

interface Props {
  value: CaregiverFormState;
  onChange: (updates: Partial<CaregiverFormState>) => void;
}

export default function CaregiverForm({ value, onChange }: Props) {
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
    </View>
  );
}
