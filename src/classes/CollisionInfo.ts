import { ICollidable } from "../interfaces/ICollidable";
import { Point } from "./Point";

export class CollisionInfo {
  #collisionPoint: Point;
  #collisionObject: ICollidable;

  constructor(collisionPoint: Point, collisionObject: ICollidable) {
    this.#collisionPoint = collisionPoint;
    this.#collisionObject = collisionObject;
  }

  get collisionPoint(): Point {
    return new Point(this.#collisionPoint.x, this.#collisionPoint.y);
  }

  get collisionObject(): ICollidable {
    return this.#collisionObject;
  }
}
