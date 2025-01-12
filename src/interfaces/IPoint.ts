import { Point } from "../classes/Point";

export interface IPoint {
  x: number;
  y: number;

  distance(other: Point): number;
  equals(other: Point): boolean;
  toString(): string;
}
