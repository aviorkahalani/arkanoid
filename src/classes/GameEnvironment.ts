import _ from "lodash";
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

  removeCollidable(c: ICollidable) {
    this.#collidables = this.#collidables.filter(
      (collidable) => collidable != c
    );
  }

  getClosestCollision(trajectory: Line): CollisionInfo | null {
    let shortestDistance = Infinity;
    let closestCollisionPoint: Point | null = null;
    let closestCollidable: ICollidable | null = null;

    const collidables = _.clone(this.#collidables);
    for (const collidable of collidables) {
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
