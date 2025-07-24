import { it, describe, expect } from "@jest/globals";
import { getAliveNeighboursCount, isCellStillAlive } from '../src/main.js';

describe('getAliveNeighboursCount', () => {
  it('gives back count of alive neighbours', () => {
    const grid = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ];
    expect(getAliveNeighboursCount(grid, 1, 1)).toBe(3);
  });
  it('gives back count of alive neighbours - all', () => {
    const grid = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    expect(getAliveNeighboursCount(grid, 1, 1)).toBe(8);
  });
  it('gives back count of alive neighbours - none', () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 1],
    ];
    expect(getAliveNeighboursCount(grid, 1, 1)).toBe(2);
  });

  it('does not go off limits of grid', () => {
    const grid = [
      [1, 0],
      [0, 1],
    ];
    expect(getAliveNeighboursCount(grid, 0, 0)).toBe(1);
  });
});

describe('isCellStillAlive', () => {
  it('Alive cell should stays alive only if neighbours between 2 an 3', () => {
    expect(isCellStillAlive(1, 2)).toBe(1);
    expect(isCellStillAlive(1, 3)).toBe(1);
    expect(isCellStillAlive(1, 1)).toBe(0);
    expect(isCellStillAlive(1, 4)).toBe(0);
  });

  it('Dead cell should come alive only if neighbours are exactly 3', () => {
    expect(isCellStillAlive(0, 3)).toBe(1);
    expect(isCellStillAlive(0, 2)).toBe(0);
    expect(isCellStillAlive(0, 1)).toBe(0);
  });
});