export function timeAgo(ts: number) {
  const diffMs = Date.now() - ts;
  const mins = Math.floor(diffMs / 60000);
  if (mins <= 0) return "just now";
  if (mins === 1) return "1 min ago";
  return `${mins} mins ago`;
}
