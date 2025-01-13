export class KeyboardSensor {
  #key: string;
  #isPressed: boolean;

  constructor(key: string = "", isPressed: boolean = false) {
    this.#key = key;
    this.#isPressed = isPressed;
    this.#setupEventListeners();
  }

  get key(): string {
    return this.#key;
  }

  get isPressed(): boolean {
    return this.#isPressed;
  }

  #setupEventListeners(): void {
    addEventListener("keydown", (ev: KeyboardEvent) => {
      this.#isPressed = true;
      this.#key = ev.key;
    });
  }
}
