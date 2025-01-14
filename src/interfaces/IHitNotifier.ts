import { IHitListener } from "./IHitListener";

export interface IHitNotifier {
  addHitListener(hl: IHitListener): void;
  removeHitListener(hl: IHitListener): void;
}
