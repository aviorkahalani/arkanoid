import { IHitListener } from "../interfaces/IHitListener";
import { Arkanoid } from "./Arkanoid";
import { Ball } from "./Ball";
import { Block } from "./Block";
import { Counter } from "./Counter";

export class BallRemover implements IHitListener {
  #game: Arkanoid;
  #remaining: Counter;

  constructor(game: Arkanoid, remaining: Counter) {
    this.#game = game;
    this.#remaining = remaining;
  }

  hitEvent(_: Block, hitter: Ball): void {
    hitter.removeFromGame(this.#game);
    this.#remaining.decrease(1);
  }
}
