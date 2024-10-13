import Maze from "./Maze";
// import Controller from "./Controller";
// import useGamepad from "./useGamepad";

import "./App.css";

const App = () => {
  // const gamepadKeys = useGamepad();

  return (
    <div className="app">
      <Maze />
      {/* <Controller gamepadKeys={gamepadKeys} /> */}
    </div>
  );
};

export default App;
