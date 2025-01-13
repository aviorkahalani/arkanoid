import { Ball } from "./Ball";
import { Color } from "./Color";
import { Gui } from "./Gui";
import { Point } from "./Point";

export class Arkanoid {
  static main(): void {
    const gui = new Gui("Arkanoid", window.innerWidth, window.innerHeight);
    const ball = new Ball(new Point(50, 50), 30, Color.BLUE);
    ball.drawOnGui(gui);
  }
}
