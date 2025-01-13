import { ICollidable } from "../interfaces/ICollidable";
import { CollisionInfo } from "./CollisionInfo";
import { Line } from "./Line";
import { Point } from "./Point";

export class GameEnvironment {
  #collidables: ICollidable[];

  constructor() {
    this.#collidables = [];
  }

  addCollidable(c: ICollidable) {
    this.#collidables.push(c);
  }

  getClosestCollision(trajectory: Line): CollisionInfo | null {
    let shortestDistance = Infinity;
    let closestCollisionPoint: Point | null = null;
    let closestCollidable: ICollidable | null = null;

    for (const collidable of this.#collidables) {
      const collisionRectangle = collidable.getCollisionRectangle();
      const collisionPoint =
        trajectory.closestIntersectionToStartOfLine(collisionRectangle);

      if (!collisionPoint) {
        continue;
      }

      const distance = collisionPoint.distance(trajectory.start);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestCollisionPoint = collisionPoint;
        closestCollidable = collidable;
      }
    }

    if (!closestCollisionPoint) {
      return null;
    }

    return new CollisionInfo(
      closestCollisionPoint,
      closestCollidable as ICollidable
    );
  }
}
