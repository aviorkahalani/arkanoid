import { Line } from "./Line";
import { Point } from "./Point";

export class Rectangle {
  #upperLeft: Point;
  #width: number;
  #height: number;

  constructor(upperLeft: Point, width: number, height: number) {
    this.#upperLeft = upperLeft;
    this.#width = width;
    this.#height = height;
  }

  get upperLeft(): Point {
    return new Point(this.#upperLeft.x, this.#upperLeft.y);
  }

  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  findIntersectionPoints(line: Line): Point[] {
    const intersectionPoints: Point[] = [];

    const x = this.#upperLeft.x;
    const y = this.#upperLeft.y;

    const lines: Line[] = [
      new Line(x, y, x + this.#width, y), // top
      new Line(x, y, x, y + this.#height), // left
      new Line(x, y + this.#height, x + this.#width, y + this.#height), // bottom
      new Line(x + this.#width, y, x + this.#width, y + this.#height), // right
    ];

    for (const l of lines) {
      if (line.isIntersecting(l)) {
        const intersectionPoint = line.intersectionWith(l);

        if (!intersectionPoint) {
          return [];
        }

        if (intersectionPoints.some((p) => p.equals(intersectionPoint))) {
          continue;
        }

        intersectionPoints.push(intersectionPoint);
      }
    }

    return intersectionPoints;
  }
}
