export class Gui {
  #title: string;
  #width: number;
  #height: number;
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;

  constructor(title: string, width: number, height: number) {
    this.#title = title;
    this.#width = width;
    this.#height = height;
    this.#canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.#ctx = this.#canvas.getContext("2d") as CanvasRenderingContext2D;

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
}
