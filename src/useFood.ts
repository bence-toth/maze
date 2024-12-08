import { useEffect, useState } from "react";

import type { Cell } from "./Maze.utility";

export interface Food {
  x: number;
  y: number;
  isFound: boolean;
}

interface UseFoodParams {
  maze: Cell[][];
}

const useFood = ({
  maze,
}: UseFoodParams): [Food[], React.Dispatch<React.SetStateAction<Food[]>>] => {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    const foundFoods: Food[] = [];
    maze.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasFood) {
          foundFoods.push({ x: cell.x, y: cell.y, isFound: false });
        }
      });
    });

    return setFood(foundFoods);
  }, [maze]);

  return [food, setFood];
};

export default useFood;
