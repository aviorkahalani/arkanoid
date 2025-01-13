import { Arkanoid } from "../classes/Arkanoid";
import { Point } from "../classes/Point";
import { Rectangle } from "../classes/Rectangle";
import { Velocity } from "../classes/Velocity";

export interface ICollidable {
  getCollisionRectangle(): Rectangle;

  hit(collisionPoint: Point, currentVelocity: Velocity): Velocity;

  addToGame(game: Arkanoid): void;
}
