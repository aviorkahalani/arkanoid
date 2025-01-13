import { Color } from "./Color";
import { Gui } from "./Gui";
import { Point } from "./Point";
import { Velocity } from "./Velocity";

export class Ball {
  #center: Point;
  #radius: number;
  #color: Color;
  #velocity: Velocity;

  constructor(center: Point, radius: number, color: Color) {
    this.#center = center;
    this.#radius = radius;
    this.#color = color;
    this.#velocity = new Velocity(0, 0);
  }

  get center(): Point {
    return new Point(this.#center.x, this.#center.y);
  }

  get radius(): number {
    return this.#radius;
  }

  get color(): Color {
    return new Color(this.#color.red, this.#color.green, this.#color.blue);
  }

  get velocity(): Velocity {
    return new Velocity(this.#velocity.dx, this.#velocity.dy);
  }

  set velocity(velocity: Velocity) {
    this.#velocity = velocity;
  }

  drawOnGui(gui: Gui): void {
    gui.color = this.#color;
    gui.drawCircle(this.#center.x, this.#center.y, this.#radius);
  }

  move(): void {
    this.#center = this.#velocity.applyVelocityToPoint(this.#center);
  }
}
