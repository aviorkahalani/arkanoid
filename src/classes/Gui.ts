import { Color } from "./Color";
import { KeyboardSensor } from "./KeyboardSensor";
import { Point } from "./Point";

export class Gui {
  #title: string;
  #width: number;
  #height: number;
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #color: Color;
  #keyboardSensor: KeyboardSensor;

  constructor(title: string, width: number, height: number) {
    this.#title = title;
    this.#width = width;
    this.#height = height;
    this.#canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
    this.#color = Color.BLACK;
    this.#keyboardSensor = new KeyboardSensor();

    const dpr = window.devicePixelRatio || 1;
    this.#canvas.width = this.#width * dpr;
    this.#canvas.height = this.#height * dpr;

    this.#ctx.scale(dpr, dpr);

    // Set the CSS size
    this.#canvas.style.width = `${this.#width}px`;
    this.#canvas.style.height = `${this.#height}px`;
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

  get keyboardSensor(): KeyboardSensor {
    return this.#keyboardSensor;
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

  drawFrame(x: number, y: number, width: number, height: number): void {
    this.#ctx.strokeStyle = Color.BLACK.hexCode;
    this.#ctx.strokeRect(x, y, width, height);
  }

  drawCircle(x: number, y: number, radius: number) {
    this.#ctx.fillStyle = this.#color.hexCode;
    this.#ctx.strokeStyle = this.#color.hexCode;

    this.#ctx.beginPath();
    this.#ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.#ctx.fill();
    this.#ctx.stroke();
  }

  clear() {
    this.#ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
}
