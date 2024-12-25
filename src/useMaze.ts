import { useMemo } from "react";

import { generateMaze } from "./Maze.utility";

interface MazeDimensions {
  width: number;
  height: number;
}

const difficulties: Record<string, MazeDimensions> = {
  easy: { width: 10, height: 10 },
  medium: { width: 15, height: 15 },
  hard: { width: 30, height: 15 },
};

type Difficulty = keyof typeof difficulties;

interface UseMazeParams {
  difficulty: Difficulty;
}

const useMaze = ({ difficulty }: UseMazeParams) =>
  useMemo(
    () =>
      generateMaze(
        difficulties[difficulty].width,
        difficulties[difficulty].height,
      ),
    [difficulty],
  );

export default useMaze;
