import { useMemo } from "react";
import classNames from "classnames";

import { generateMaze } from "./Maze.utility";

import "./Maze.css";

const Maze = () => {
  const maze = useMemo(() => generateMaze(30, 20), []);

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
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
