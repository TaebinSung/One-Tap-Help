import type { Timestamp } from "firebase/firestore";

export type Urgency = "low" | "normal" | "high" | "emergency";
export type RequestStatus = "pending" | "accepted" | "completed";

export type FireRequest = {
  id: string;
  title: string;
  urgency: Urgency;
  status: RequestStatus;
  createdAt?: Timestamp | null;
  createdBy: string;
  acceptedBy?: string | null;
  acceptedAt?: Timestamp | null;
  completedBy?: string | null;
  completedAt?: Timestamp | null;
};

export type Caregiver = {
  id: string;
  onShift: boolean;
  pushToken?: string | null;
  lastUpdated?: Timestamp | null;
};