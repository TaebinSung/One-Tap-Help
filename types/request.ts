export type Urgency = "low" | "normal" | "high" | "emergency";
export type Status = "pending" | "accepted" | "completed";

export type RequestItem = {
  id: string;
  title: string;
  urgency: Urgency;
  status: Status;
  createdAt: number; // Date.now()
  createdBy: string;
  acceptedBy?: string | null;
  acceptedAt?: number | null;
  completedBy?: string | null;
  completedAt?: number | null;};