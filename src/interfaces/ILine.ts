import { Point } from "../classes/Point";
import { Line } from "../classes/Line";

export interface ILine {
  get length(): number;
  get middle(): Point;
  get start(): Point;
  get end(): Point;

  isIntersecting(other: Line): boolean;
  intersectionWith(other: Line): Point | null;
  equals(other: Line): boolean;
  toString(): string;
}
