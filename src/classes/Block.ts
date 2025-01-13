import { ICollidable } from "../interfaces/ICollidable";
import { Color } from "./Color";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { Velocity } from "./Velocity";

export class Block extends Rectangle implements ICollidable {
  #color: Color;

  constructor(
    upperLeft: Point,
    width: number,
    height: number,
    color: Color = Color.DARK_GRAY
  ) {
    super(upperLeft, width, height);
    this.#color = color;
  }

  get color() {
    return new Color(this.#color.red, this.#color.green, this.#color.blue);
  }

  getCollisionRectangle(): Rectangle {
    return new Rectangle(this.upperLeft, this.width, this.height);
  }

  hit(collisionPoint: Point, currentVelocity: Velocity): Velocity {
    const epsilon = 1e-8;

    const leftSide = this.upperLeft.x;
    const rightSide = this.upperLeft.x + this.width;
    const topSide = this.upperLeft.y;
    const bottomSide = this.upperLeft.y + this.height;

    const velocity = new Velocity(currentVelocity.dx, currentVelocity.dy);

    const isHorizontalCollision =
      Math.abs(collisionPoint.x - leftSide) < epsilon ||
      Math.abs(collisionPoint.x - rightSide) < epsilon;

    const isVerticalCollision =
      Math.abs(collisionPoint.y - topSide) < epsilon ||
      Math.abs(collisionPoint.y - bottomSide) < epsilon;

    if (isHorizontalCollision) {
      velocity.dx = -velocity.dx;
    }

    if (isVerticalCollision) {
      velocity.dy = -velocity.dy;
    }

    return velocity;
  }
}
