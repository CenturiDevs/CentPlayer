import assert from "node:assert/strict";
import { test } from "node:test";

import { buildTimelineBlocks } from "../src/core/timeline.ts";

test("a bare timeline is a single chapter block", () => {
    assert.deepEqual(buildTimelineBlocks({ duration: 100 }), [
        { start: 0, end: 100, kind: "chapter", label: undefined },
    ]);
});

test("buildTimelineBlocks bails without a duration", () => {
    assert.deepEqual(buildTimelineBlocks({ duration: 0 }), []);
    assert.deepEqual(buildTimelineBlocks({ duration: NaN }), []);
});

test("intro and outro split the bar and keep their labels", () => {
    const blocks = buildTimelineBlocks({
        duration: 100,
        intro: { start: 10, end: 20 },
        outro: { start: 80, end: 90 },
    });

    assert.deepEqual(blocks, [
        { start: 0, end: 10, kind: "chapter", label: undefined },
        { start: 10, end: 20, kind: "intro", label: "Intro" },
        { start: 20, end: 80, kind: "chapter", label: undefined },
        { start: 80, end: 90, kind: "outro", label: "Outro" },
        { start: 90, end: 100, kind: "chapter", label: undefined },
    ]);
});

test("chapters segment the bar and carry custom labels", () => {
    const blocks = buildTimelineBlocks({
        duration: 12,
        chapters: [
            { start: 0, end: 3, label: "Cold open" },
            { start: 3, end: 7, label: "Episode" },
            { start: 7, end: 12, label: "Credits" },
        ],
    });

    assert.deepEqual(
        blocks.map((block) => block.label),
        ["Cold open", "Episode", "Credits"],
    );
});

test("intro wins over a chapter it overlaps", () => {
    const blocks = buildTimelineBlocks({
        duration: 10,
        chapters: [{ start: 0, end: 10, label: "Episode" }],
        intro: { start: 2, end: 4 },
    });

    assert.deepEqual(blocks, [
        { start: 0, end: 2, kind: "chapter", label: "Episode" },
        { start: 2, end: 4, kind: "intro", label: "Intro" },
        { start: 4, end: 10, kind: "chapter", label: "Episode" },
    ]);
});

test("ranges are clamped to the duration", () => {
    const blocks = buildTimelineBlocks({
        duration: 10,
        outro: { start: 8, end: 99 },
    });

    assert.deepEqual(blocks, [
        { start: 0, end: 8, kind: "chapter", label: undefined },
        { start: 8, end: 10, kind: "outro", label: "Outro" },
    ]);
});
