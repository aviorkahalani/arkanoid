import { ILine } from "../interfaces/ILine";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";

export class Line implements ILine {
  #start: Point;
  #end: Point;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.#start = new Point(x1, y1);
    this.#end = new Point(x2, y2);
  }

  get length(): number {
    return this.#start.distance(this.#end);
  }

  get middle(): Point {
    const x = (this.#start.x + this.#end.x) / 2;
    const y = (this.#start.y + this.#end.y) / 2;
    return new Point(x, y);
  }

  get start(): Point {
    return new Point(this.#start.x, this.#start.y);
  }

  get end(): Point {
    return new Point(this.#end.x, this.#end.y);
  }

  isIntersecting(other: Line): boolean {
    const epsilon: number = 1e-8; // 0.00000001

    // calculate the'standard form' for 'this' line
    // standard form: axˆ2 + bx + c = 0
    const a1 = this.#end.y - this.#start.y;
    const b1 = this.#start.x - this.#end.x;
    const c1 = a1 * this.#start.x + b1 * this.#start.y;

    // calculate the'standard form' for 'other' line
    // standard form: axˆ2 + bx + c = 0
    const a2 = other.#end.y - other.#start.y;
    const b2 = other.#start.x - other.#end.x;
    const c2 = a2 * other.#start.x + b2 * other.#start.y;

    // calculate the denominator
    const denominator = a1 * b2 - a2 * b1;

    // If the denominator is 0 then there are two options:
    // 1. The lines are NOT intersecting (meaning they are parallel) --> false
    // 2. The lines lie on the same line (meaning they are collinear) --> true
    if (Math.abs(denominator - 0) < epsilon) {
      return (
        this.#isPointOnLineSegment(other.#start) ||
        this.#isPointOnLineSegment(other.#end) ||
        other.#isPointOnLineSegment(this.#start) ||
        other.#isPointOnLineSegment(this.#end)
      );
    }

    // OK! So after we handled the cases where the lines are parallel or collinear.
    // why not just return true?
    // Don't we know at this point that there is intersection?
    // Nope. Because here we are checking for line segments.
    // The equations we calculated before
    // represent infinite lines that extend forever in both directions.
    // And just because two infinite lines intersect doesn't mean their segments
    // (the parts between the start and end points) do.

    // Calculate the intersection point (x, y)
    const x = (b2 * c1 - b1 * c2) / denominator;
    const y = (a1 * c2 - a2 * c1) / denominator;

    // Check if the intersection point lies on both line segments
    const intersectionPoint = new Point(x, y);
    return (
      this.#isPointOnLineSegment(intersectionPoint) &&
      other.#isPointOnLineSegment(intersectionPoint)
    );
  }

  intersectionWith(other: Line): Point | null {
    const epsilon: number = 1e-8; // 0.00000001

    // calculate the'standard form' for 'this' line
    // standard form: axˆ2 + bx + c = 0
    const a1 = this.#end.y - this.#start.y;
    const b1 = this.#start.x - this.#end.x;
    const c1 = a1 * this.#start.x + b1 * this.#start.y;

    // calculate the'standard form' for 'other' line
    // standard form: axˆ2 + bx + c = 0
    const a2 = other.#end.y - other.#start.y;
    const b2 = other.#start.x - other.#end.x;
    const c2 = a2 * other.#start.x + b2 * other.#start.y;

    // calculate the denominator
    const denominator = a1 * b2 - a2 * b1;

    // If the denominator is 0 then there are two options:
    // 1. The lines are NOT intersecting (meaning they are parallel) --> false
    // 2. The lines lie on the same line (meaning they are collinear) --> true
    if (Math.abs(denominator - 0) < epsilon) {
      return null;
    }

    // OK! So after we handled the cases where the lines are parallel or collinear.
    // why not just return true?
    // Don't we know at this point that there is intersection?
    // Nope. Because here we are checking for line segments.
    // The equations we calculated before
    // represent infinite lines that extend forever in both directions.
    // And just because two infinite lines intersect doesn't mean their segments
    // (the parts between the start and end points) do.

    // Calculate the intersection point (x, y)
    const x = (b2 * c1 - b1 * c2) / denominator;
    const y = (a1 * c2 - a2 * c1) / denominator;

    // Return the intersection point lies on both line segments
    return new Point(x, y);
  }

  closestIntersectionToStartOfLine(rect: Rectangle): Point | null {
    const intersectionPoints = rect.findIntersectionPoints(this);

    let minDistance = Infinity;
    let closestPoint = null;

    for (const p of intersectionPoints) {
      const distance = this.#start.distance(p);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = new Point(p.x, p.y);
      }
    }

    return closestPoint;
  }

  equals(other: Line): boolean {
    const isDirectEqual: boolean =
      this.#start.equals(other.#start) && this.#end.equals(other.#end);
    const isReverseEqual: boolean =
      this.#start.equals(other.#end) && this.#end.equals(other.#start);

    return isDirectEqual || isReverseEqual;
  }

  toString(): string {
    return `Line (${this.#start.x}, ${this.#start.y}) -> (${this.#end.x}, ${
      this.#end.y
    })`;
  }

  #isPointOnLineSegment(p: Point): boolean {
    const epsilon: number = 1e-8; // 0.00000001

    // Check if the point is within the bounding box of the segment
    const minX = Math.min(this.#start.x, this.#end.x);
    const maxX = Math.max(this.#start.x, this.#end.x);
    const minY = Math.min(this.#start.y, this.#end.y);
    const maxY = Math.max(this.#start.y, this.#end.y);
    const overallDistance = this.#start.distance(p) + this.#end.distance(p);

    const isBetweenXValues = p.x >= minX && p.x <= maxX;
    const isBetweenYValues = p.y >= minY && p.y <= maxY;
    const isSameDistance = Math.abs(overallDistance - this.length) < epsilon;

    return isBetweenXValues && isBetweenYValues && isSameDistance;
  }
}
