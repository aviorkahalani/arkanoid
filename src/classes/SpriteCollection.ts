import { ISprite } from "../interfaces/ISprite";
import { Gui } from "./Gui";

export class SpriteCollection {
  #sprites: ISprite[];

  constructor() {
    this.#sprites = [];
  }

  addSprite(s: ISprite) {
    this.#sprites.push(s);
  }

  notifyAllTimePassed(): void {
    for (const sprite of this.#sprites) {
      sprite.timePassed();
    }
  }

  drawAllOnGui(gui: Gui): void {
    for (const sprite of this.#sprites) {
      sprite.drawOnGui(gui);
    }
  }
}
