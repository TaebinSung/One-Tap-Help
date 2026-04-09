type FirestoreTimestamp = { seconds: number };

function toMs(ts: FirestoreTimestamp | number | null | undefined): number {
  if (!ts) return 0;
  if (typeof ts === "number") return ts;
  return ts.seconds * 1000;
}

export function timeAgo(ts: FirestoreTimestamp | number | null | undefined): string {
  const diffMs = Date.now() - toMs(ts);
  const mins = Math.floor(diffMs / 60000);
  if (mins <= 0) return "just now";
  if (mins === 1) return "1 min ago";
  return `${mins} mins ago`;
}
