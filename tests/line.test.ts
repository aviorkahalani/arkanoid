import { test, expect, describe, it } from "vitest";
import { Line } from "../src/classes/Line";
import { Point } from "../src/classes/Point";

test("Get length should return √8", () => {
  const line = new Line(1, 1, 3, 3);
  expect(line.length).toBe(Math.sqrt(8));
});

test("Get middle should return (2, 2)", () => {
  const line = new Line(1, 1, 3, 3);
  expect(line.middle).toStrictEqual(new Point(2, 2));
});

test("Get start should return (1, 1)", () => {
  const line = new Line(1, 1, 3, 3);
  expect(line.middle).toStrictEqual(new Point(1, 1));
});

test("Get end should return (3, 3)", () => {
  const line = new Line(1, 1, 3, 3);
  expect(line.middle).toStrictEqual(new Point(3, 3));
});

test("line1.equals(line2) should return true", () => {
  const line1 = new Line(1, 1, 3, 3);
  const line2 = new Line(1, 1, 3, 3);
  expect(line1.equals(line2)).toBe(true);
});

test("line1.equals(line2) should return false", () => {
  const line1 = new Line(1, 1, 3, 3);
  const line2 = new Line(1, 1, 3, 4);
  expect(line1.equals(line2)).toBe(false);
});

test("toString() should return Line (1, 1) -> (3, 3)", () => {
  const line = new Line(1, 1, 3, 3);
  expect(line.toString()).toBe("Line (1, 1) -> (3, 3)");
});

describe("test isIntersecting method", () => {
  // parallel
  it("#1 isIntersecting should return false", () => {
    const l1 = new Line(1, 1, 5, 1);
    const l2 = new Line(1, 2, 5, 2);

    expect(l1.isIntersecting(l2)).toBe(false);
    expect(l2.isIntersecting(l1)).toBe(false);
  });

  // collinear
  it("#2 isIntersecting should return true", () => {
    const l1 = new Line(1, 1, 5, 1);
    const l2 = new Line(2, 1, 4, 1);

    expect(l1.isIntersecting(l2)).toBe(true);
    expect(l2.isIntersecting(l1)).toBe(true);
  });

  // intersecting in the middle
  it("#3 isIntersecting should return true", () => {
    const l1 = new Line(1, 1, 4, 4);
    const l2 = new Line(1, 4, 4, 1);

    expect(l1.isIntersecting(l2)).toBe(true);
    expect(l2.isIntersecting(l1)).toBe(true);
  });

  it("#4 isIntersecting should return true", () => {
    const l1 = new Line(3, 1, 2, 2);
    const l2 = new Line(2, 2, 1, 3);

    expect(l1.isIntersecting(l2)).toBe(true);
    expect(l2.isIntersecting(l1)).toBe(true);
  });
});

describe("test intersectionWith method", () => {
  // parallel
  it("#1 intersectionWith should return null", () => {
    const l1 = new Line(1, 1, 5, 1);
    const l2 = new Line(1, 2, 5, 2);

    expect(l1.intersectionWith(l2)).toBe(null);
    expect(l2.intersectionWith(l1)).toBe(null);
  });

  // collinear
  it("#2 intersectionWith should return null", () => {
    const l1 = new Line(1, 1, 5, 1);
    const l2 = new Line(2, 1, 4, 1);

    expect(l1.intersectionWith(l2)).toBe(null);
    expect(l2.intersectionWith(l1)).toBe(null);
  });

  // intersecting in the middle
  it("#3 intersectionWith should return (2.5, 2.5)", () => {
    const l1 = new Line(1, 1, 4, 4);
    const l2 = new Line(1, 4, 4, 1);

    expect(l1.intersectionWith(l2)).toStrictEqual(new Point(2.5, 2.5));
    expect(l2.intersectionWith(l1)).toStrictEqual(new Point(2.5, 2.5));
  });

  it("#4 intersectionWith should return null", () => {
    const l1 = new Line(3, 1, 2, 2);
    const l2 = new Line(2, 2, 1, 3);

    expect(l1.intersectionWith(l2)).toBe(null);
    expect(l2.intersectionWith(l1)).toBe(null);
  });
});
