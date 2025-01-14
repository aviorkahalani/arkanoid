import { IHitListener } from "../interfaces/IHitListener";
import { Arkanoid } from "./Arkanoid";
import { Ball } from "./Ball";
import { Block } from "./Block";
import { Counter } from "./Counter";

export class BlockRemover implements IHitListener {
  #game: Arkanoid;
  #remaining: Counter;

  constructor(game: Arkanoid, remaining: Counter) {
    this.#game = game;
    this.#remaining = remaining;
  }

  hitEvent(beingHit: Block, hitter: Ball): void {
    beingHit.removeHitListener(this);
    beingHit.removeFromGame(this.#game);
    hitter.color = beingHit.color;
    this.#remaining.decrease(1);
  }
}
