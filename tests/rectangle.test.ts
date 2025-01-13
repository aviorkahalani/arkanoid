import { test, it, describe, expect } from "vitest";
import { Rectangle } from "../src/classes/Rectangle";
import { Line } from "../src/classes/Line";
import { Point } from "../src/classes/Point";

const rectangle: Rectangle = new Rectangle(new Point(2, 1), 3, 2);

test("Should return (2, 1)", () => {
  expect(rectangle.upperLeft).toStrictEqual(new Point(2, 1));
});

test("Should return (2, 1)", () => {
  expect(rectangle.width).toBe(3);
});

test("Should return (2, 1)", () => {
  expect(rectangle.height).toBe(2);
});

describe("test findIntersectionPoints method", () => {
  it("Should return two intersection points with straight line", () => {
    const line = new Line(3, 0, 3, 4);
    const expectedPoints = [new Point(3, 1), new Point(3, 3)];
    const outputPoints = rectangle.findIntersectionPoints(line);

    expect(outputPoints).toHaveLength(expectedPoints.length);
    expect(outputPoints).toEqual(expectedPoints);
  });

  it("Should return two intersection points with diagonal line", () => {
    const line = new Line(4, 4, 1, 1);
    const expectedPoints = [new Point(3, 3), new Point(2, 2)];
    const outputPoints = rectangle.findIntersectionPoints(line);

    expect(outputPoints).toHaveLength(expectedPoints.length);
    expect(outputPoints).toEqual(expectedPoints);
  });

  it("Should have no intersection points", () => {
    const line = new Line(6, 1, 6, 4);
    const expectedPoints = [];
    const outputPoints = rectangle.findIntersectionPoints(line);

    expect(outputPoints).toHaveLength(expectedPoints.length);
    expect(outputPoints).toEqual(expectedPoints);
  });

  it("Should have a single intersection point", () => {
    const line = new Line(4, 2, 4, 5);
    const expectedPoints = [new Point(4, 3)];
    const outputPoints = rectangle.findIntersectionPoints(line);

    expect(outputPoints).toHaveLength(expectedPoints.length);
    expect(outputPoints).toEqual(expectedPoints);
  });

  it("Should intersect with corner", () => {
    const line = new Line(3, 2, 1, 4);
    const expectedPoints = [new Point(2, 3)];
    const outputPoints = rectangle.findIntersectionPoints(line);

    expect(outputPoints).toHaveLength(expectedPoints.length);
    expect(outputPoints).toEqual(expectedPoints);
  });
});
