import classNames from "classnames";

import FoodImage from "./seeds.png";

import "./MazeCell.css";

import type { Cell } from "./Maze.utility";
import type { Food } from "./useFood";

interface CellProps {
  cell: Cell;
  food: Food[];
  children: React.ReactNode;
  x: number;
  y: number;
}

const MazeCell = ({ cell, food, children, x, y }: CellProps) => (
  <div
    className={classNames("maze-cell", {
      "wall-top": cell.hasWallTop,
      "wall-right": cell.hasWallRight,
      "wall-bottom": cell.hasWallBottom,
      "wall-left": cell.hasWallLeft,
      "has-food": food.some(
        (foodItem) => foodItem.x === x && foodItem.y === y && !foodItem.isFound
      ),
    })}
    style={{
      backgroundImage: food.some(
        (foodItem) => foodItem.x === x && foodItem.y === y && !foodItem.isFound
      )
        ? `url(${FoodImage})`
        : "none",
    }}
  >
    {children}
  </div>
);

export default MazeCell;
