import type { Segment } from "./config";
export declare function formatTime(seconds: number): string;
export declare const clamp01: (value: number) => number;
export declare function segmentStyle(segment: Segment | undefined, duration: number): {
    left: string;
    width: string;
} | null;
//# sourceMappingURL=format.d.ts.map