import { Color } from "./Color";
import { Point } from "./Point";

export class Gui {
  #title: string;
  #width: number;
  #height: number;
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #color: Color;

  constructor(title: string, width: number, height: number) {
    this.#title = title;
    this.#width = width;
    this.#height = height;
    this.#canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
    this.#color = Color.BLACK;

    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;
  }

  get title() {
    return this.#title;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get gui() {
    return this.#canvas;
  }

  get ctx() {
    return this.#ctx;
  }

  get color() {
    return this.#color;
  }

  set color(color: Color) {
    this.#color = color;
  }

  drawLine(start: Point, end: Point): void {
    this.#ctx.strokeStyle = this.#color.hexCode;

    this.#ctx.beginPath();
    this.#ctx.moveTo(start.x, start.y);
    this.#ctx.lineTo(end.x, end.y);
    this.#ctx.stroke();
  }

  drawRectangle(x: number, y: number, width: number, height: number): void {
    this.#ctx.fillStyle = this.#color.hexCode;
    this.#ctx.fillRect(x, y, width, height);
  }

  drawCircle(x: number, y: number, radius: number) {
    this.#ctx.fillStyle = this.#color.hexCode;
    this.#ctx.strokeStyle = this.#color.hexCode;

    this.#ctx.beginPath();
    this.#ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.#ctx.fill();
    this.#ctx.stroke();
  }
}
