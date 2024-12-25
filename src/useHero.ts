import { useEffect, useState } from "react";

import type { Cell } from "./Maze.utility";
import type { Food } from "./useFood";

type WallKey = "hasWallTop" | "hasWallRight" | "hasWallBottom" | "hasWallLeft";

interface DirectionConfig {
  direction: "top" | "right" | "bottom" | "left";
  dx: number;
  dy: number;
  wall: WallKey;
}

const directions: Record<string, DirectionConfig> = {
  ArrowUp: {
    direction: "top",
    dx: 0,
    dy: -1,
    wall: "hasWallTop",
  },
  ArrowRight: {
    direction: "right",
    dx: 1,
    dy: 0,
    wall: "hasWallRight",
  },
  ArrowDown: {
    direction: "bottom",
    dx: 0,
    dy: 1,
    wall: "hasWallBottom",
  },
  ArrowLeft: {
    direction: "left",
    dx: -1,
    dy: 0,
    wall: "hasWallLeft",
  },
};

interface UseHeroParams {
  maze: Cell[][];
  isGameWon: boolean;
  setIsGameWon: (isGameWon: boolean) => void;
  food: Food[];
  setFood: React.Dispatch<React.SetStateAction<Food[]>>;
}

const useHero = ({
  maze,
  isGameWon,
  setIsGameWon,
  food,
  setFood,
}: UseHeroParams) => {
  const [hero, setHero] = useState({
    x: 0,
    y: 0,
    direction: "bottom",
  });

  useEffect(() => {
    if (maze[0][0].hasWallBottom) {
      setHero((previousHero) => ({ ...previousHero, direction: "right" }));
    }
  }, [maze]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (isGameWon) {
        return;
      }

      const move = directions[event.key as keyof typeof directions];

      // If the key pressed isn't one of the arrow keys we're interested in, do nothing
      if (!move) {
        return;
      }

      const { direction, dx, dy, wall } = move;

      // Check if there is a wall in the direction we're trying to move
      if (maze[hero.y][hero.x][wall]) {
        return;
      }

      // Update hero position and direction
      setHero((prev) => ({
        ...prev,
        x: Math.min(Math.max(0, prev.x + dx), maze[0].length - 1),
        y: Math.min(Math.max(0, prev.y + dy), maze.length - 1),
        direction,
      }));

      // Check if the game is won
      if (
        food.every((Food) => Food.isFound) &&
        hero.x === maze[0].length - 1 &&
        hero.y === maze.length - 1 &&
        event.key === "ArrowDown"
      ) {
        setIsGameWon(true);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [food, hero.x, hero.y, isGameWon, setIsGameWon, maze]);

  useEffect(() => {
    setFood((previousFoundFood) =>
      previousFoundFood.map((Food) => {
        if (Food.x === hero.x && Food.y === hero.y) {
          return { ...Food, isFound: true };
        }
        return Food;
      }),
    );
  }, [hero, setFood]);

  return hero;
};

export default useHero;
