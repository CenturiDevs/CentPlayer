import type { Segment } from "./config";

export type TimelineBlockKind = "chapter" | "intro" | "outro";

export interface TimelineBlock {
    start: number;
    end: number;
    kind: TimelineBlockKind;
    label?: string;
}

interface TimelineInput {
    chapters?: Segment[];
    intro?: Segment;
    outro?: Segment;
    duration: number;
}

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

/**
 * Splits the timeline into flex-friendly blocks. Chapter boundaries, the intro
 * and the outro all become cut points, so overlapping ranges are split cleanly.
 * Intro/outro win over chapters where they overlap.
 */
export function buildTimelineBlocks({
    chapters,
    intro,
    outro,
    duration,
}: TimelineInput): TimelineBlock[] {
    if (!(duration > 0)) return [];

    const ranges: TimelineBlock[] = [];
    if (intro) {
        ranges.push({ start: intro.start, end: intro.end, kind: "intro", label: intro.label ?? "Intro" });
    }
    if (outro) {
        ranges.push({ start: outro.start, end: outro.end, kind: "outro", label: outro.label ?? "Outro" });
    }
    for (const chapter of chapters ?? []) {
        ranges.push({ start: chapter.start, end: chapter.end, kind: "chapter", label: chapter.label });
    }

    const boundaries = new Set<number>([0, duration]);
    for (const range of ranges) {
        if (range.end <= 0 || range.start >= duration) continue;
        boundaries.add(clamp(range.start, 0, duration));
        boundaries.add(clamp(range.end, 0, duration));
    }

    const points = [...boundaries].sort((a, b) => a - b);
    const blocks: TimelineBlock[] = [];

    for (let index = 0; index < points.length - 1; index += 1) {
        const start = points[index];
        const end = points[index + 1];
        if (end - start <= 0) continue;

        const midpoint = (start + end) / 2;
        const special = ranges.find(
            (range) => range.kind !== "chapter" && midpoint >= range.start && midpoint < range.end,
        );
        const chapter = ranges.find(
            (range) => range.kind === "chapter" && midpoint >= range.start && midpoint < range.end,
        );
        const active = special ?? chapter;
        const kind = active?.kind ?? "chapter";
        const label = active?.label;

        const previous = blocks[blocks.length - 1];
        if (previous && previous.end === start && previous.kind === kind && previous.label === label) {
            previous.end = end;
            continue;
        }
        blocks.push({ start, end, kind, label });
    }

    return blocks;
}
