import { ICollidable } from "../interfaces/ICollidable";
import { IHitListener } from "../interfaces/IHitListener";
import { IHitNotifier } from "../interfaces/IHitNotifier";
import { ISprite } from "../interfaces/ISprite";
import { Arkanoid } from "./Arkanoid";
import { Ball } from "./Ball";
import { Color } from "./Color";
import { Gui } from "./Gui";
import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { Velocity } from "./Velocity";
import _ from "lodash";

export class Block
  extends Rectangle
  implements ICollidable, ISprite, IHitNotifier
{
  #color: Color;
  #hitListeners: IHitListener[];

  constructor(
    upperLeft: Point,
    width: number,
    height: number,
    color: Color = Color.DARK_GRAY
  ) {
    super(upperLeft, width, height);
    this.#color = color;
    this.#hitListeners = [];
  }

  get color() {
    return new Color(this.#color.red, this.#color.green, this.#color.blue);
  }

  getCollisionRectangle(): Rectangle {
    return new Rectangle(this.upperLeft, this.width, this.height);
  }

  hit(
    hitter: Ball,
    collisionPoint: Point,
    currentVelocity: Velocity
  ): Velocity {
    const epsilon = 1e-6;

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

    if (!this.isBallColorMatch(hitter)) {
      this.notifyHit(hitter);
    }

    return velocity;
  }

  drawOnGui(gui: Gui): void {
    gui.color = this.#color;
    gui.drawRectangle(
      this.upperLeft.x,
      this.upperLeft.y,
      this.width,
      this.height
    );
    gui.drawFrame(this.upperLeft.x, this.upperLeft.y, this.width, this.height);
  }

  // currently nothing
  timePassed(): void {}

  addToGame(game: Arkanoid): void {
    game.addCollidable(this);
    game.addSprite(this);
  }

  removeFromGame(game: Arkanoid): void {
    game.removeCollidable(this);
    game.removeSprite(this);
  }

  isBallColorMatch(ball: Ball) {
    return this.#color.hexCode === ball.color.hexCode;
  }

  addHitListener(hl: IHitListener): void {
    this.#hitListeners.push(hl);
  }

  removeHitListener(hl: IHitListener): void {
    this.#hitListeners.filter((hitListener) => hitListener != hl);
  }

  notifyHit(hitter: Ball): void {
    // Make a copy of the hitListeners before iterating over them.
    const listeners = _.clone(this.#hitListeners);

    for (const listener of listeners) {
      listener.hitEvent(this, hitter);
    }
  }
}
