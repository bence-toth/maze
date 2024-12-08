import classNames from "classnames";

import useMaze from "./useMaze";
import useFood from "./useFood";
import useHero from "./useHero";
import useGameState from "./useGameState";

import DifficultySelector from "./DifficultySelector";
import Hero from "./Hero";
import MazeCell from "./MazeCell";

import "./Maze.css";

const Maze = () => {
  const { difficulty, isGameWon, setIsGameWon } = useGameState();
  const maze = useMaze({ difficulty });
  const [food, setFood] = useFood({ maze });
  const hero = useHero({ maze, isGameWon, setIsGameWon, food, setFood });

  return (
    <>
      <DifficultySelector isGameWon={isGameWon} />
      <div className={classNames("maze", { "game-won": isGameWon })}>
        {maze.map((row, y) => (
          <div key={y} className="maze-row">
            {row.map((cell, x) => (
              <MazeCell key={x} cell={cell} food={food} x={x} y={y}>
                {hero.x === x && hero.y === y && (
                  <Hero direction={hero.direction} isGameWon={isGameWon} />
                )}
              </MazeCell>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Maze;
