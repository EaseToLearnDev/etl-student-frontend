export function formatMinutesToHHMMSS(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes * 60) % 60);

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function parseTimeString(timeStr: string) {
  if (!timeStr) return 0;
  const [min, sec] = timeStr.split(":").map(Number);
  return min + sec / 60;
}