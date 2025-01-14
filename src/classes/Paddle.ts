import { ICollidable } from "../interfaces/ICollidable";
import { ISprite } from "../interfaces/ISprite";
import { Arkanoid } from "./Arkanoid";
import { Ball } from "./Ball";
import { Color } from "./Color";
import { Gui } from "./Gui";
import { KeyboardSensor } from "./KeyboardSensor";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { Velocity } from "./Velocity";

export class Paddle extends Rectangle implements ISprite, ICollidable {
  #keyboardSensor: KeyboardSensor;
  #color: Color;
  #LEFT_BOUND = -this.width;
  #RIGHT_BOUND = innerWidth;

  constructor(
    upperLeft: Point,
    width: number,
    height: number,
    keyboardSensor: KeyboardSensor,
    color: Color
  ) {
    super(upperLeft, width, height);
    this.#keyboardSensor = keyboardSensor;
    this.#color = color;
  }

  getCollisionRectangle(): Rectangle {
    return new Rectangle(this.upperLeft, this.width, this.height);
  }

  hit(_: Ball, collisionPoint: Point, currentVelocity: Velocity): Velocity {
    const collisionRectangle = this.getCollisionRectangle();
    const numOfRegions = 5;
    const regionWidth = collisionRectangle.width / numOfRegions;

    const leftEdge = collisionRectangle.upperLeft.x + regionWidth;
    const leftInner = collisionRectangle.upperLeft.x + regionWidth * 2;
    const center = collisionRectangle.upperLeft.x + regionWidth * 3;
    const rightInner = collisionRectangle.upperLeft.x + regionWidth * 4;
    const rightEdge = collisionRectangle.upperLeft.x + regionWidth * 5;

    if (collisionPoint.x <= leftEdge) {
      const dx = Math.min(-10, -Math.abs(currentVelocity.dx));
      const dy = -currentVelocity.dy;
      return new Velocity(dx, dy);
    }

    if (collisionPoint.x <= leftInner) {
      const dx = Math.min(-5, -Math.abs(currentVelocity.dx));
      const dy = -currentVelocity.dy;
      return new Velocity(dx, dy);
    }

    if (collisionPoint.x <= center) {
      const dx = 2;
      const dy = -currentVelocity.dy;
      return new Velocity(dx, dy);
    }

    if (collisionPoint.x <= rightInner) {
      const dx = Math.max(5, Math.abs(currentVelocity.dx));
      const dy = -currentVelocity.dy;
      return new Velocity(dx, dy);
    }

    if (collisionPoint.x <= rightEdge) {
      const dx = Math.max(10, Math.abs(currentVelocity.dx));
      const dy = -currentVelocity.dy;
      return new Velocity(dx, dy);
    }

    return currentVelocity;
  }

  drawOnGui(gui: Gui): void {
    gui.color = this.#color;
    gui.drawRectangle(
      this.upperLeft.x,
      this.upperLeft.y,
      this.width,
      this.height
    );
  }

  timePassed(): void {
    if (this.#keyboardSensor.isPressed("ArrowLeft")) {
      this.#moveLeft();
    } else if (this.#keyboardSensor.isPressed("ArrowRight")) {
      this.#moveRight();
    }
  }

  #moveLeft(): void {
    if (this.upperLeft.x < this.#LEFT_BOUND) {
      this.upperLeft = new Point(this.#RIGHT_BOUND, this.upperLeft.y);
      return;
    }

    this.upperLeft = new Point(this.upperLeft.x - 7, this.upperLeft.y);
  }

  #moveRight(): void {
    if (this.upperLeft.x > this.#RIGHT_BOUND) {
      this.upperLeft = new Point(this.#LEFT_BOUND, this.upperLeft.y);
      return;
    }

    this.upperLeft = new Point(this.upperLeft.x + 7, this.upperLeft.y);
  }

  addToGame(game: Arkanoid): void {
    game.addSprite(this);
    game.addCollidable(this);
  }
}
