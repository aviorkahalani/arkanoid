import { Color } from "./Color";
import { Gui } from "./Gui";
import { Point } from "./Point";

export class Ball {
  #center: Point;
  #radius: number;
  #color: Color;

  constructor(center: Point, radius: number, color: Color) {
    this.#center = center;
    this.#radius = radius;
    this.#color = color;
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

  drawOnGui(gui: Gui): void {
    gui.color = this.#color;
    gui.drawCircle(this.#center.x, this.#center.y, this.#radius);
  }
}
