import { Ball } from "../classes/Ball";
import { Block } from "../classes/Block";

export interface IHitListener {
  hitEvent(beingHit: Block, hitter: Ball): void;
}
