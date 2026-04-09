import { FireRequest, Urgency } from "../types/request";

const URGENCY_WEIGHT: Record<Urgency, number> = {
  emergency: 3,
  high: 2,
  normal: 1,
  low: 0,
};

function toSeconds(ts: any): number {
  if (!ts) return 0;
  if (typeof ts === "number") return ts / 1000;
  return ts.seconds ?? 0;
}

export function sortRequests(items: FireRequest[], currentUserId?: string) {
  return [...items].sort((a, b) => {
    const ae = a.urgency === "emergency";
    const be = b.urgency === "emergency";
    if (ae !== be) return ae ? -1 : 1;

    if (currentUserId) {
      const aMe = a.acceptedBy === currentUserId;
      const bMe = b.acceptedBy === currentUserId;
      if (aMe !== bMe) return aMe ? -1 : 1;
    }

    const ac = a.status === "completed";
    const bc = b.status === "completed";
    if (ac !== bc) return ac ? 1 : -1;

    const uw = URGENCY_WEIGHT[b.urgency] - URGENCY_WEIGHT[a.urgency];
    if (uw !== 0) return uw;

    return toSeconds(b.createdAt) - toSeconds(a.createdAt);
  });
}
