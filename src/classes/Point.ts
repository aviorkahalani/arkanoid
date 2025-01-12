import { IPoint } from "../interfaces/IPoint";

export class Point implements IPoint {
  readonly #x: number;
  readonly #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  distance(other: Point): number {
    return Math.sqrt(
      Math.pow(other.#x - this.#x, 2) + Math.pow(other.#y - this.#y, 2)
    );
  }

  equals(other: Point): boolean {
    return this.#x === other.#x && this.#y === other.#y;
  }

  toString(): string {
    return `Point (${this.#x}, ${this.#y})`;
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }
}
