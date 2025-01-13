import { Arkanoid } from "../classes/Arkanoid";
import { Gui } from "../classes/Gui";

export interface ISprite {
  drawOnGui(gui: Gui): void;

  timePassed(): void;

  addToGame(game: Arkanoid): void;
}
