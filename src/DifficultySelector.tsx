import classNames from "classnames";

import "./DifficultySelector.css";

interface DifficultySelectorProps {
  isGameWon: boolean;
}

const DifficultySelector = ({ isGameWon }: DifficultySelectorProps) => (
  <nav
    id="difficulty-setting"
    className={classNames({ "game-won": isGameWon })}
  >
    <h1>You won!</h1>
    <ul>
      <li>
        <a href="?difficulty=easy">Easy</a>
      </li>
      <li>
        <a href="?difficulty=medium">Medium</a>
      </li>
      <li>
        <a href="?difficulty=hard">Hard</a>
      </li>
    </ul>
  </nav>
);

export default DifficultySelector;
