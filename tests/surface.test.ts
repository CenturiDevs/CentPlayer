import assert from "node:assert/strict";
import { test } from "node:test";

import { surfaceSeekDelta, surfaceZone } from "../src/core/surface.ts";

// mirrors LEFT_EDGE / RIGHT_EDGE in src/core/surface.ts
const LEFT = 0.34;
const RIGHT = 0.66;

test("surfaceZone takes the outer thirds", () => {
    assert.equal(surfaceZone(0), "back");
    assert.equal(surfaceZone(0.2), "back");
    assert.equal(surfaceZone(1), "forward");
    assert.equal(surfaceZone(0.8), "forward");
});

test("surfaceZone gives the middle the toggle zone", () => {
    assert.equal(surfaceZone(0.35), "toggle");
    assert.equal(surfaceZone(0.5), "toggle");
    assert.equal(surfaceZone(0.65), "toggle");
});

test("the seams belong to the outer zones, not the middle", () => {
    // a click landing exactly on a boundary should seek rather than toggle,
    // since that is what the neighbouring pixel does
    assert.equal(surfaceZone(LEFT), "back");
    assert.equal(surfaceZone(RIGHT), "forward");
});

test("surfaceSeekDelta maps the zones to seconds", () => {
    assert.equal(surfaceSeekDelta(0.1), -10);
    assert.equal(surfaceSeekDelta(0.5), 0);
    assert.equal(surfaceSeekDelta(0.9), 10);
});

test("surfaceSeekDelta agrees with surfaceZone everywhere", () => {
    for (let ratio = 0; ratio <= 1; ratio += 0.01) {
        const expected =
            surfaceZone(ratio) === "back" ? -10 : surfaceZone(ratio) === "forward" ? 10 : 0;
        assert.equal(surfaceSeekDelta(ratio), expected, `ratio ${ratio}`);
    }
});