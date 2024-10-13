import { useCallback, useEffect, useState } from "react";

export interface GamepadKeyMap {
  left: {
    trigger: {
      primary: number;
      secondary: number;
    };
    stick: {
      button: number;
      horizontal: number;
      vertical: number;
    };
    direction: {
      up: number;
      down: number;
      left: number;
      right: number;
    };
  };
  right: {
    trigger: {
      primary: number;
      secondary: number;
    };
    action: {
      x: number;
      y: number;
      a: number;
      b: number;
    };
    stick: {
      button: number;
      horizontal: number;
      vertical: number;
    };
  };
}

const useGamepad = () => {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null);
  const [gamepadKeys, setGamepadKeys] = useState<GamepadKeyMap | null>(null);

  const gamepadConnectedHandler = useCallback(
    (gamepadConnectedEvent: GamepadEvent) => {
      console.log("Gamepad connected", gamepadConnectedEvent.gamepad);
      setGamepadIndex(gamepadConnectedEvent.gamepad.index);
    },
    []
  );

  const controllerLoop = useCallback(() => {
    if (gamepadIndex === null) {
      return;
    }
    const gamepad = navigator.getGamepads()[gamepadIndex] as Gamepad;

    if (!gamepad) {
      setGamepadKeys(null);
    } else {
      setGamepadKeys({
        left: {
          trigger: {
            primary: gamepad.buttons[6].value,
            secondary: gamepad.buttons[4].value,
          },
          stick: {
            button: gamepad.buttons[10].value,
            horizontal: gamepad.axes[0],
            vertical: gamepad.axes[1],
          },
          direction: {
            up: gamepad.buttons[12].value,
            down: gamepad.buttons[13].value,
            left: gamepad.buttons[14].value,
            right: gamepad.buttons[15].value,
          },
        },
        right: {
          trigger: {
            primary: gamepad.buttons[7].value,
            secondary: gamepad.buttons[5].value,
          },
          action: {
            x: gamepad.buttons[2].value,
            y: gamepad.buttons[3].value,
            a: gamepad.buttons[0].value,
            b: gamepad.buttons[1].value,
          },
          stick: {
            button: gamepad.buttons[11].value,
            horizontal: gamepad.axes[2],
            vertical: gamepad.axes[3],
          },
        },
      });
    }
    requestAnimationFrame(controllerLoop);
  }, [gamepadIndex]);

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamepadConnectedHandler);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnectedHandler);
    };
  }, [gamepadConnectedHandler]);

  useEffect(() => {
    requestAnimationFrame(controllerLoop);
  }, [controllerLoop]);

  return gamepadKeys;
};

export default useGamepad;
