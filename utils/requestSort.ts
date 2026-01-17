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
 * 2) Uncompleted before completed
 * 3) Higher urgency first
 * 4) Newest first
 */
export function sortRequests(items: RequestItem[]) {
  return [...items].sort((a, b) => {
    const ae = a.urgency === "emergency";
    const be = b.urgency === "emergency";
    if (ae && !be) return -1;
    if (!ae && be) return 1;

    const ac = a.status === "completed";
    const bc = b.status === "completed";
    if (ac !== bc) return ac ? 1 : -1;

    const uw = urgencyWeight(b.urgency) - urgencyWeight(a.urgency);
    if (uw !== 0) return uw;

    return b.createdAt - a.createdAt;
  });
}
