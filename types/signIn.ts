export type SignInRole = "GUARDIAN" | "PATIENT" | "CAREGIVER";

export interface GuardianData {
  role: "GUARDIAN";
  guardianFullName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelationship: string;
  patientFullName: string;
  healthCondition: string;
}

export interface PatientData {
  role: "PATIENT";
  fullName: string;
  phone: string;
  email: string;
  healthCondition: string;
}

export interface CaregiverData {
  role: "CAREGIVER";
  fullName: string;
  phone: string;
  email: string;
}

export type SignInFormData = GuardianData | PatientData | CaregiverData;
