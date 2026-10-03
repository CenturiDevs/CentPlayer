import assert from "node:assert/strict";
import { test } from "node:test";

import { clamp01, formatTime, segmentStyle } from "../src/core/format.ts";

test("formatTime drops the hour until it needs it", () => {
    assert.equal(formatTime(0), "0:00");
    assert.equal(formatTime(5), "0:05");
    assert.equal(formatTime(59.9), "0:59");
    assert.equal(formatTime(60), "1:00");
    assert.equal(formatTime(3599), "59:59");
    assert.equal(formatTime(3600), "1:00:00");
    assert.equal(formatTime(3661), "1:01:01");
});

test("formatTime does not throw on the values the element hands us", () => {
    // duration is NaN until metadata lands, and currentTime can briefly
    // exceed it after a seek
    assert.equal(formatTime(-1), "0:00");
    assert.equal(formatTime(NaN), "0:00");
    assert.equal(formatTime(Infinity), "0:00");
});

test("clamp01 holds at both ends", () => {
    assert.equal(clamp01(0), 0);
    assert.equal(clamp01(0.5), 0.5);
    assert.equal(clamp01(1), 1);
    assert.equal(clamp01(-3), 0);
    assert.equal(clamp01(4), 1);
});

test("segmentStyle positions a marker across the track", () => {
    // ratios stay binary-exact here on purpose, so the percentages are exact
    assert.deepEqual(segmentStyle({ start: 0, end: 25 }, 100), {
        left: "0%",
        width: "25%",
    });
    assert.deepEqual(segmentStyle({ start: 50, end: 100 }, 100), {
        left: "50%",
        width: "50%",
    });
});

test("segmentStyle bails when it cannot place the marker", () => {
    assert.equal(segmentStyle(undefined, 100), null);
    assert.equal(segmentStyle({ start: 0, end: 10 }, 0), null);
});

test("segmentStyle clamps instead of overflowing the track", () => {
    // a segment can outlive the duration if the source is replaced mid-skip
    assert.deepEqual(segmentStyle({ start: -25, end: 25 }, 100), {
        left: "0%",
        width: "50%",
    });
    assert.deepEqual(segmentStyle({ start: 50, end: 150 }, 100), {
        left: "50%",
        width: "100%",
    });
});