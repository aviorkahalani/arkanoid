import { ICollidable } from "../interfaces/ICollidable";
import { ISprite } from "../interfaces/ISprite";
import { Ball } from "./Ball";
import { Block } from "./Block";
import { Color } from "./Color";
import { GameEnvironment } from "./GameEnvironment";
import { Gui } from "./Gui";
import { Point } from "./Point";
import { SpriteCollection } from "./SpriteCollection";
import { Velocity } from "./Velocity";

export class Arkanoid {
  #gui: Gui;
  #sprites: SpriteCollection;
  #enviroment: GameEnvironment;

  constructor() {
    this.#gui = new Gui("Arkanoid", innerWidth, innerHeight);
    this.#sprites = new SpriteCollection();
    this.#enviroment = new GameEnvironment();
  }

  main(): void {
    this.initializeWalls();
    this.initializeBlocks();
    this.initializeBall();

    const animate = () => {
      this.#gui.clear();
      this.#sprites.drawAllOnGui(this.#gui);
      this.#sprites.notifyAllTimePassed();
      requestAnimationFrame(animate);
    };

    animate();
  }

  initializeWalls(): void {
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
      wall.addToGame(this);
    }
  }

  initializeBlocks(): void {
    const colors = [
      Color.GRAY,
      Color.RED,
      Color.YELLOW,
      Color.BLUE,
      Color.PINK,
      Color.GREEN,
    ];
    const levels = colors.length;
    const margin = 20;

    const blockWidth = margin * 2;
    const blockHeight = margin;
    const startX = innerWidth - margin - blockWidth;
    const startY = margin * levels;

    for (let i = 0; i < levels; i++) {
      const color = colors[i];
      const blocksInRow = levels * 2 - i;
      const y = startY + i * blockHeight;

      for (let j = 0; j < blocksInRow; j++) {
        const x = startX - j * blockWidth;
        const block = new Block(
          new Point(x, y),
          blockWidth,
          blockHeight,
          color
        );
        block.addToGame(this);
      }
    }
  }

  initializeBall(): void {
    const ball = new Ball(new Point(50, 50), 5, Color.BLUE, this.#enviroment);
    ball.velocity = new Velocity(8, 3);
    ball.addToGame(this);
  }

  addCollidable(c: ICollidable): void {
    this.#enviroment.addCollidable(c);
  }

  addSprite(s: ISprite): void {
    this.#sprites.addSprite(s);
  }
}
