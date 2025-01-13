import "./styles/global.css";
import { Arkanoid } from "./classes/Arkanoid";

// run the game
function main() {
  const arkanoid = new Arkanoid();
  arkanoid.main();
}

main();
