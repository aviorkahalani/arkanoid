import { test, expect } from "vitest";
import { Point } from "../src/classes/Point";

test("Distance should return 2", () => {
  const p = new Point(1, 0);
  const q = new Point(3, 0);
  expect(p.distance(q)).toBe(2);
});

test("Distance should return 2√2", () => {
  const p = new Point(1, 1);
  const q = new Point(3, 3);
  expect(p.distance(q)).toBe(2 * Math.sqrt(2));
});

test("String representation should return Point (1, 2)", () => {
  const p = new Point(1, 1);
  expect(p.toString()).toBe("Point (1, 1)");
});

test("Get x should return 1", () => {
  const p = new Point(1, 1);
  expect(p.x).toBe(1);
});

test("Get y should return 4.5", () => {
  const p = new Point(1, 4.5);
  expect(p.y).toBe(4.5);
});
