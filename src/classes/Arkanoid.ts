import { Ball } from "./Ball";
import { Block } from "./Block";
import { Color } from "./Color";
import { GameEnvironment } from "./GameEnvironment";
import { Gui } from "./Gui";
import { Point } from "./Point";
import { Velocity } from "./Velocity";

export class Arkanoid {
  static gameEnviroment = new GameEnvironment();
  static gui = new Gui("Arkanoid", innerWidth, innerHeight);
  static ball = new Ball(new Point(50, 50), 5, Color.BLUE, this.gameEnviroment);

  static main(): void {
    // create walls
    const margin = 20;
    const leftWall = new Block(new Point(0, margin), margin, innerHeight);
    const rightWall = new Block(
      new Point(innerWidth - margin, 0),
      margin,
      innerHeight
    );
    const topWall = new Block(new Point(0, 0), innerWidth, margin);
    const bottomWall = new Block(
      new Point(0, innerHeight - margin),
      innerWidth,
      margin
    );

    const walls: Block[] = [leftWall, rightWall, topWall, bottomWall];
    for (const wall of walls) {
      this.gameEnviroment.addCollidable(wall);
    }

    this.ball.velocity = new Velocity(5, 1);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  static animate(): void {
    this.gui.clear();
    this.ball.move();
    this.ball.drawOnGui(this.gui);
    requestAnimationFrame(this.animate);
  }
}
