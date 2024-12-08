import { useState } from "react";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficulty = urlParams.get("difficulty") ?? "easy";

const useGameState = (): {
  isGameWon: boolean;
  setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: string;
} => {
  const [isGameWon, setIsGameWon] = useState(false);

  return { difficulty, isGameWon, setIsGameWon };
};

export default useGameState;
