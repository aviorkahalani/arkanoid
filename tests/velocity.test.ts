import { test, expect } from "vitest";
import { Velocity } from "../src/classes/Velocity";
import { Point } from "../src/classes/Point";

test("dx should return 1", () => {
  const v = new Velocity(1, 0);

  expect(v.dx).toBe(1);
});

test("applyVelocityToPoint should return (4.25, 5.5)", () => {
  const v = new Velocity(3.25, 4.5);
  const p = new Point(1, 1);

  expect(v.applyVelocityToPoint(p)).toStrictEqual(new Point(4.25, 5.5));
});

test("equals should return true", () => {
  const v1 = new Velocity(3.25, 4.5);
  const v2 = new Velocity(3.25, 4.5);

  expect(v1.equals(v2)).toBe(true);
});

test("equals should return false", () => {
  const v1 = new Velocity(3.25, 4.5);
  const v2 = new Velocity(3, 4.5);

  expect(v1.equals(v2)).toBe(false);
});

test("String representation should return Velocity (3.25, 4.5)", () => {
  const v = new Velocity(3.25, 4.5);

  expect(v.toString()).toBe("Velocity (3.25, 4.5)");
});
