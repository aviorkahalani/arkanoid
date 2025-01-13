import { Color } from "./Color";
import { GameEnvironment } from "./GameEnvironment";
import { Gui } from "./Gui";
import { Line } from "./Line";
import { Point } from "./Point";
import { Velocity } from "./Velocity";

export class Ball {
  #center: Point;
  #radius: number;
  #color: Color;
  #velocity: Velocity;
  #enviroment: GameEnvironment;

  constructor(
    center: Point,
    radius: number,
    color: Color,
    enviroment: GameEnvironment
  ) {
    this.#center = center;
    this.#radius = radius;
    this.#color = color;
    this.#velocity = new Velocity(0, 0);
    this.#enviroment = enviroment;
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
    const epsilon = 1e-8;
    const start: Point = this.#center;
    const end: Point = this.#velocity.applyVelocityToPoint(this.#center);

    const trajectory = new Line(start.x, start.y, end.x, end.y);

    const collisionInfo = this.#enviroment.getClosestCollision(trajectory);

    if (collisionInfo === null) {
      this.#center = trajectory.end;
    } else {
      const collisionPoint = collisionInfo.collisionPoint;
      const collisionObject = collisionInfo.collisionObject;

      this.#center = new Point(
        collisionPoint.x - this.#velocity.dx * epsilon,
        collisionPoint.y - this.#velocity.dy * epsilon
      );

      this.#velocity = collisionObject.hit(collisionPoint, this.#velocity);
    }
  }
}
