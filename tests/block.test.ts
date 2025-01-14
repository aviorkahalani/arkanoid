import { test, describe, it, expect } from "vitest";
import { Block } from "../src/classes/Block";
import { Point } from "../src/classes/Point";
import { Velocity } from "../src/classes/Velocity";

describe("Test hit method with whole numbers", () => {
  const block = new Block(new Point(1, 1), 3, 2);

  it("collsion with left side should change dx direction", () => {
    const collisionPoint = new Point(1, 2);
    const currentVelocity = new Velocity(1, 2);

    const expectedVelocity = new Velocity(-1, 2);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with right side should change dx direction", () => {
    const collisionPoint = new Point(4, 2);
    const currentVelocity = new Velocity(-1, 2);

    const expectedVelocity = new Velocity(1, 2);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with top side should change dy direction", () => {
    const collisionPoint = new Point(3, 1);
    const currentVelocity = new Velocity(2, 1);

    const expectedVelocity = new Velocity(2, -1);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with bottom side should change dy direction", () => {
    const collisionPoint = new Point(3, 3);
    const currentVelocity = new Velocity(2, -1);

    const expectedVelocity = new Velocity(2, 1);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with topLeft corner should change dx and dy direction", () => {
    const collisionPoint = new Point(1, 1);
    const currentVelocity = new Velocity(1, 1);

    const expectedVelocity = new Velocity(-1, -1);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with bottomLeft corner should change dx and dy direction", () => {
    const collisionPoint = new Point(1, 3);
    const currentVelocity = new Velocity(1, -1);

    const expectedVelocity = new Velocity(-1, 1);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with topRight corner should change dx and dy direction", () => {
    const collisionPoint = new Point(4, 1);
    const currentVelocity = new Velocity(-1, 1);

    const expectedVelocity = new Velocity(1, -1);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collsion with bottomRight corner should change dx and dy direction", () => {
    const collisionPoint = new Point(4, 3);
    const currentVelocity = new Velocity(-1, -1);

    const expectedVelocity = new Velocity(1, 1);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });
});

describe("Test hit method with float numbers", () => {
  const block = new Block(new Point(1, 1), 3, 2);

  it("collision with left side should change dx direction (float values)", () => {
    const collisionPoint = new Point(1.12345, 2.56789);
    const currentVelocity = new Velocity(1.23456, 2.34567);

    const expectedVelocity = new Velocity(-1.23456, 2.34567);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with right side should change dx direction (float values)", () => {
    const collisionPoint = new Point(4.56718, 2.54321);
    const currentVelocity = new Velocity(-1.23456, 2.34567);

    const expectedVelocity = new Velocity(1.23456, 2.34567);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with top side should change dy direction (float values)", () => {
    const collisionPoint = new Point(3.45678, 1.12345);
    const currentVelocity = new Velocity(2.34567, 1.23456);

    const expectedVelocity = new Velocity(2.34567, -1.23456);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with bottom side should change dy direction (float values)", () => {
    const collisionPoint = new Point(3.78901, 3.45678);
    const currentVelocity = new Velocity(2.34567, -1.23456);

    const expectedVelocity = new Velocity(2.34567, 1.23456);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with topLeft corner should change dx and dy direction (float values)", () => {
    const collisionPoint = new Point(1.12345, 1.12345);
    const currentVelocity = new Velocity(1.23456, 1.23456);

    const expectedVelocity = new Velocity(-1.23456, -1.23456);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with bottomLeft corner should change dx and dy direction (float values)", () => {
    const collisionPoint = new Point(1.12345, 3.45678);
    const currentVelocity = new Velocity(1.23456, -1.23456);

    const expectedVelocity = new Velocity(-1.23456, 1.23456);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with topRight corner should change dx and dy direction (float values)", () => {
    const collisionPoint = new Point(4.56789, 1.12345);
    const currentVelocity = new Velocity(-1.23456, 1.23456);

    const expectedVelocity = new Velocity(1.23456, -1.23456);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });

  it("collision with bottomRight corner should change dx and dy direction (float values)", () => {
    const collisionPoint = new Point(4.56789, 3.45678);
    const currentVelocity = new Velocity(-1.23456, -1.23456);

    const expectedVelocity = new Velocity(1.23456, 1.23456);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);

    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });
});

const block = new Block(new Point(0, 798 - 20), 868, 20);

describe("edge cases based on game exp", () => {
  it("should change only dy direction", () => {
    const collisionPoint = new Point(285.1999999999996, 758);
    const currentVelocity = new Velocity(0, -8.54400374531753);

    const expectedVelocity = new Velocity(0, 8.54400374531753);
    const outputVelocity = block.hit(collisionPoint, currentVelocity);
    expect(outputVelocity).toStrictEqual(expectedVelocity);
  });
});
