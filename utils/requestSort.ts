import { RequestItem, Urgency } from "../types/request";

function urgencyWeight(u: Urgency) {
  if (u === "emergency") return 3;
  if (u === "high") return 2;
  if (u === "normal") return 1;
  return 0;
}

/**
 * Sorting rules:
 * 1) Emergency pinned at top
 * 2) Accepted by current user before others
 * 3) Uncompleted before completed
 * 4) Higher urgency first
 * 5) Newest first
 */
export function sortRequests(items: RequestItem[], currentUserId?: string) {
  return [...items].sort((a, b) => {
    const ae = a.urgency === "emergency";
    const be = b.urgency === "emergency";
    if (ae && !be) return -1;
    if (!ae && be) return 1;

    // Prioritize requests accepted by current user
    if (currentUserId) {
      const aAcceptedByMe = a.acceptedBy === currentUserId;
      const bAcceptedByMe = b.acceptedBy === currentUserId;
      if (aAcceptedByMe && !bAcceptedByMe) return -1;
      if (!aAcceptedByMe && bAcceptedByMe) return 1;
    }

    const ac = a.status === "completed";
    const bc = b.status === "completed";
    if (ac !== bc) return ac ? 1 : -1;

    const uw = urgencyWeight(b.urgency) - urgencyWeight(a.urgency);
    if (uw !== 0) return uw;

    return b.createdAt - a.createdAt;
  });
}
