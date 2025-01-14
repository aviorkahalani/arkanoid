import { ICollidable } from "../interfaces/ICollidable";
import { ISprite } from "../interfaces/ISprite";
import { Ball } from "./Ball";
import { BallRemover } from "./BallRemover";
import { Block } from "./Block";
import { BlockRemover } from "./BlockRemover";
import { Color } from "./Color";
import { Counter } from "./Counter";
import { GameEnvironment } from "./GameEnvironment";
import { Gui } from "./Gui";
import { Paddle } from "./Paddle";
import { Point } from "./Point";
import { SpriteCollection } from "./SpriteCollection";
import { Velocity } from "./Velocity";

export class Arkanoid {
  #gui: Gui;
  #sprites: SpriteCollection;
  #enviroment: GameEnvironment;
  #remainingBlocks: Counter;
  #blockRemover: BlockRemover;
  #remainingBalls: Counter;
  #ballRemover: BallRemover;

  constructor() {
    this.#gui = new Gui("Arkanoid", innerWidth, innerHeight);
    this.#sprites = new SpriteCollection();
    this.#enviroment = new GameEnvironment();
    this.#remainingBlocks = new Counter();
    this.#blockRemover = new BlockRemover(this, this.#remainingBlocks);
    this.#remainingBalls = new Counter();
    this.#ballRemover = new BallRemover(this, this.#remainingBalls);
  }

  main(): void {
    this.initializeWalls();
    this.initializeBlocks();
    this.initializePaddle();
    this.initializeBall();
    this.initializeDeathRegion();

    const animate = () => {
      this.#gui.clear();
      this.#sprites.drawAllOnGui(this.#gui);
      this.#sprites.notifyAllTimePassed();

      const id = requestAnimationFrame(animate);

      if (this.#remainingBlocks.value <= 0) {
        cancelAnimationFrame(id);
        setTimeout(() => {
          this.#gui.clear();
          console.log("WON");
        }, 1000);
      }

      if (this.#remainingBalls.value <= 0) {
        cancelAnimationFrame(id);
        console.log("LOST");

        setTimeout(() => {
          this.#gui.clear();
        }, 1000);
      }
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

    const walls: Block[] = [leftWall, rightWall, topWall];
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
        block.addHitListener(this.#blockRemover);
        this.#remainingBlocks.increase(1);
      }
    }
  }

  initializePaddle(): void {
    const margin = 20;
    const paddle = new Paddle(
      new Point(innerWidth / 2, innerHeight - margin * 2),
      margin * 10,
      margin,
      this.#gui.keyboardSensor,
      Color.PINK
    );

    paddle.addToGame(this);
  }

  initializeBall(): void {
    const ball = new Ball(new Point(50, 50), 6, Color.BLUE, this.#enviroment);
    ball.velocity = new Velocity(8, 3);
    ball.addToGame(this);
    this.#remainingBalls.increase(1);
  }

  initializeDeathRegion(): void {
    const margin = 20;
    const deathRegion = new Block(
      new Point(0, innerHeight),
      innerWidth,
      margin
    );
    deathRegion.addToGame(this);
    deathRegion.addHitListener(this.#ballRemover);
  }

  addCollidable(c: ICollidable): void {
    this.#enviroment.addCollidable(c);
  }

  removeCollidable(c: ICollidable): void {
    this.#enviroment.removeCollidable(c);
  }

  addSprite(s: ISprite): void {
    this.#sprites.addSprite(s);
  }

  removeSprite(c: ISprite): void {
    this.#sprites.removeSprite(c);
  }
}
