import { Gui } from "./Gui";

export class Arkanoid {
  static main(): void {
    const gui = new Gui("Arkanoid", window.innerWidth, window.innerHeight);
  }
}
