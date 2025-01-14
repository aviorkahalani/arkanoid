import { ISprite } from "../interfaces/ISprite";
import { Gui } from "./Gui";
import _ from "lodash";

export class SpriteCollection {
  #sprites: ISprite[];

  constructor() {
    this.#sprites = [];
  }

  addSprite(s: ISprite) {
    this.#sprites.push(s);
  }

  removeSprite(s: ISprite) {
    this.#sprites = this.#sprites.filter((sprite) => sprite != s);
  }

  notifyAllTimePassed(): void {
    const sprites = _.clone(this.#sprites);
    for (const sprite of sprites) {
      sprite.timePassed();
    }
  }

  drawAllOnGui(gui: Gui): void {
    const sprites = _.clone(this.#sprites);
    for (const sprite of sprites) {
      sprite.drawOnGui(gui);
    }
  }
}
