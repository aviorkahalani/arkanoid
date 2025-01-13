import { Ball } from "./Ball";
import { Color } from "./Color";
import { Gui } from "./Gui";
import { Point } from "./Point";
import { Velocity } from "./Velocity";

export class Arkanoid {
  static gui = new Gui("Arkanoid", innerWidth, innerHeight);
  static ball = new Ball(new Point(50, 50), 5, Color.BLUE);

  static main(): void {
    this.ball.velocity = new Velocity(5, 1);
    this.animate = this.animate.bind(this);
    this.animate();
  }

  static animate(): void {
    this.gui.clear();
    this.ball.move();
    this.ball.drawOnGui(this.gui);
    // requestAnimationFrame(this.animate);
  }
}
