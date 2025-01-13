import { test, expect, describe, it } from "vitest";
import { Line } from "../src/classes/Line";
import { Point } from "../src/classes/Point";
import { Rectangle } from "../src/classes/Rectangle";

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

const rectangle = new Rectangle(new Point(2, 2), 3, 2);

describe("test closestIntersectionToStartOfLine method", () => {
  it("Should return Point (3, 4)", () => {
    const line = new Line(3, 6, 3, 1);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(3, 4));
  });

  it("Should return Point (2, 3)", () => {
    const line = new Line(1, 3, 6, 3);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(2, 3));
  });

  it("Should return Point (4, 4)", () => {
    const line = new Line(5, 5, 1, 1);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(4, 4));
  });

  it("Should return Point (2, 4)", () => {
    const line = new Line(1, 5, 5, 1);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(2, 4));
  });

  it("Should return Point (5, 2)", () => {
    const line = new Line(6, 1, 4, 3);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(5, 2));
  });

  it("Should return null", () => {
    const line = new Line(7, 1, 7, 4);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toBe(null);
  });

  it("Should return Point (2, 2)", () => {
    const line = new Line(0, 0, 4, 4);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(2, 2));
  });

  it("Should return Point (5,4)", () => {
    const line = new Line(6, 5, 2, 1);
    const outputPoint = line.closestIntersectionToStartOfLine(rectangle);

    expect(outputPoint).toStrictEqual(new Point(5, 4));
  });
});
