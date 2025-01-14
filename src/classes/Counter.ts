export class Counter {
  #value: number;

  constructor() {
    this.#value = 0;
  }

  increase(amount: number): void {
    this.#value += amount;
  }

  decrease(amount: number): void {
    this.#value -= amount;
  }

  get value(): number {
    return this.#value;
  }
}
