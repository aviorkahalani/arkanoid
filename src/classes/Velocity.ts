import { Point } from "./Point";

export class Velocity {
  #dx: number;
  #dy: number;

  constructor(dx: number, dy: number) {
    this.#dx = dx;
    this.#dy = dy;
  }

  get dx(): number {
    return this.#dx;
  }

  get dy(): number {
    return this.#dy;
  }

  set dx(dx: number) {
    this.#dx = dx;
  }

  set dy(dy: number) {
    this.#dy = dy;
  }

  fromAngleAndSpeed(angle: number, speed: number) {
    const radians = angle * (Math.PI / 180.0);
    const dx = speed * Math.sin(radians);
    const dy = -speed * Math.cos(radians);
    return new Velocity(dx, dy);
  }

  applyVelocityToPoint(p: Point): Point {
    return new Point(p.x + this.#dx, p.y + this.#dy);
  }

  equals(other: Velocity) {
    return this.#dx === other.#dx && this.#dy === other.#dy;
  }

  toString(): string {
    return `Velocity (${this.#dx}, ${this.#dy})`;
  }
}
