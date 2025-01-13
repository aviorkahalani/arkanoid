export class Color {
  #r: number;
  #g: number;
  #b: number;

  // constants
  public static BLACK = new Color(0, 0, 0);
  public static WHITE = new Color(255, 255, 255);
  public static RED = new Color(255, 0, 0);
  public static GREEN = new Color(0, 255, 0);
  public static BLUE = new Color(0, 0, 255);
  public static CYAN = new Color(0, 255, 255);
  public static GRAY = new Color(192, 192, 192);
  public static DARK_GRAY = new Color(128, 128, 128);
  public static LIGHT_GRAY = new Color(211, 211, 211);
  public static MAGENTA = new Color(255, 0, 255);
  public static ORANGE = new Color(255, 165, 0);
  public static PINK = new Color(255, 105, 180);
  public static YELLOW = new Color(255, 255, 0);

  constructor(r: number, g: number, b: number) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
  }

  get red(): number {
    return this.#r;
  }

  get green(): number {
    return this.#g;
  }

  get blue(): number {
    return this.#b;
  }

  get hexCode(): string {
    const decimalToHexadecimalArray = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    const firstLetter =
      decimalToHexadecimalArray[Math.floor(this.#r / 16) % 16];
    const secondLetter = decimalToHexadecimalArray[Math.floor(this.#r % 16)];
    const thirdLetter =
      decimalToHexadecimalArray[Math.floor(this.#g / 16) % 16];
    const fourthLetter = decimalToHexadecimalArray[Math.floor(this.#g % 16)];
    const fifthLetter =
      decimalToHexadecimalArray[Math.floor(this.#b / 16) % 16];
    const sixthLetter = decimalToHexadecimalArray[Math.floor(this.#b % 16)];

    return (
      "#" +
      firstLetter +
      secondLetter +
      thirdLetter +
      fourthLetter +
      fifthLetter +
      sixthLetter
    );
  }

  equals(other: Color): boolean {
    return this.#r === other.#r && this.#g === other.#g && this.#b === other.#b;
  }

  toString(): string {
    return `Color rgb(${this.#r}, ${this.#g}, ${this.#b})`;
  }
}
