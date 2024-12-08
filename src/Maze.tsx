import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import { generateMaze } from "./Maze.utility";
import HeroImage from "./mouse.png";
import FoodImage from "./seeds.png";

import "./Maze.css";

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

interface FoodCell {
  x: number;
  y: number;
  isFound: boolean;
}

const Maze = () => {
  const maze = useMemo(() => generateMaze(20, 15), []);

  const [foodCells, setFoodCells] = useState<FoodCell[]>([]);

  useEffect(() => {
    const foundFoodCells: FoodCell[] = [];
    maze.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasFood) {
          foundFoodCells.push({ x: cell.x, y: cell.y, isFound: false });
        }
      });
    });

    return setFoodCells(foundFoodCells);
  }, [maze]);

  const [hero, setHero] = useState({
    x: 0,
    y: 0,
    direction: "bottom",
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log(maze[hero.y][hero.x]);
      const move = directions[event.key as keyof typeof directions];

      // If the key pressed isn't one of the arrow keys we're interested in, do nothing
      if (!move) return;

      const { direction, dx, dy, wall } = move;

      // Check if there is a wall in the direction we're trying to move
      if (maze[hero.y][hero.x][wall]) return;

      // Update hero position and direction
      setHero((prev) => ({
        ...prev,
        x: Math.min(Math.max(0, prev.x + dx), maze[0].length - 1),
        y: Math.min(Math.max(0, prev.y + dy), maze.length - 1),
        direction,
      }));
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [hero.x, hero.y, maze]);

  useEffect(() => {
    setFoodCells((previousFoundFoodCells) =>
      previousFoundFoodCells.map((foodCell) => {
        if (foodCell.x === hero.x && foodCell.y === hero.y) {
          return { ...foodCell, isFound: true };
        }
        return foodCell;
      })
    );
  }, [hero]);

  return (
    <div className="maze">
      {maze.map((row, y) => (
        <div key={y} className="maze-row">
          {row.map((cell, x) => (
            <div
              key={x}
              className={classNames("maze-cell", {
                "wall-top": cell.hasWallTop,
                "wall-right": cell.hasWallRight,
                "wall-bottom": cell.hasWallBottom,
                "wall-left": cell.hasWallLeft,
                "has-food": foodCells.some(
                  (foodCell) =>
                    foodCell.x === x && foodCell.y === y && !foodCell.isFound
                ),
              })}
              style={{
                backgroundImage: foodCells.some(
                  (foodCell) =>
                    foodCell.x === x && foodCell.y === y && !foodCell.isFound
                )
                  ? `url(${FoodImage})`
                  : "none",
              }}
            >
              {hero.x === x && hero.y === y && (
                <img
                  className={classNames("hero", `direction-${hero.direction}`)}
                  src={HeroImage}
                  alt="Hero"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
