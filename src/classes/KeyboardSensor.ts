type ValidKeys = "ArrowRight" | "ArrowLeft" | null;

export class KeyboardSensor {
  #key: ValidKeys;

  constructor() {
    this.#key = null;

    this.#setupEventListeners();
  }

  get key(): ValidKeys {
    return this.#key;
  }

  isPressed(key: "ArrowRight" | "ArrowLeft"): boolean {
    return this.#key === key;
  }

  #setupEventListeners(): void {
    addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
        this.#key = ev.key;
      }
    });

    addEventListener("keyup", () => {
      this.#key = null;
    });
  }
}
