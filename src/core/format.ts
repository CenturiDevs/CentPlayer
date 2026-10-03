import type { Segment } from "./config";

export function formatTime(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const total = Math.floor(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(secs)}` : `${minutes}:${pad(secs)}`;
}

export const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export function segmentStyle(segment: Segment | undefined, duration: number) {
    if (!segment || duration <= 0) return null;
    return {
        left: `${clamp01(segment.start / duration) * 100}%`,
        width: `${clamp01((segment.end - segment.start) / duration) * 100}%`,
    };
}
