import "./Controller.css";

import type { GamepadKeyMap } from "./useGamepad";

interface ControllerProps {
  gamepadKeys: GamepadKeyMap | null;
}

const Controller = ({ gamepadKeys }: ControllerProps) => (
  <div className="controller">
    <div className="left-hand">
      <div className="trigger-wrapper">
        <div className="trigger">
          <div
            className="primary"
            style={
              {
                "--pressure": gamepadKeys?.left.trigger.primary ?? 0,
              } as React.CSSProperties
            }
          ></div>
          <div
            className="secondary"
            data-pressed={gamepadKeys?.left.trigger.secondary === 1}
          ></div>
        </div>
      </div>
      <div className="stick-wrapper">
        <div className="stick">
          <div
            className="position"
            data-pressed={gamepadKeys?.left.stick.button === 1}
            style={
              {
                "--horizontal": gamepadKeys?.left.stick.horizontal ?? 0,
                "--vertical": gamepadKeys?.left.stick.vertical ?? 0,
              } as React.CSSProperties
            }
          ></div>
        </div>
      </div>
      <div className="direction-buttons-wrapper">
        <div className="direction-buttons">
          <div
            className="button up"
            data-pressed={gamepadKeys?.left.direction.up === 1}
          ></div>
          <div
            className="button down"
            data-pressed={gamepadKeys?.left.direction.down === 1}
          ></div>
          <div
            className="button right"
            data-pressed={gamepadKeys?.left.direction.right === 1}
          ></div>
          <div
            className="button left"
            data-pressed={gamepadKeys?.left.direction.left === 1}
          ></div>
        </div>
      </div>
    </div>
    <div className="right-hand">
      <div className="trigger-wrapper">
        <div className="trigger">
          <div
            className="primary"
            style={
              {
                "--pressure": gamepadKeys?.right.trigger.primary ?? 0,
              } as React.CSSProperties
            }
          ></div>
          <div
            className="secondary"
            data-pressed={gamepadKeys?.right.trigger.secondary === 1}
          ></div>
        </div>
      </div>
      <div className="action-buttons-wrapper">
        <div className="action-buttons">
          <div
            className="button x"
            data-pressed={gamepadKeys?.right.action.x === 1}
          ></div>
          <div
            className="button y"
            data-pressed={gamepadKeys?.right.action.y === 1}
          ></div>
          <div
            className="button a"
            data-pressed={gamepadKeys?.right.action.a === 1}
          ></div>
          <div
            className="button b"
            data-pressed={gamepadKeys?.right.action.b === 1}
          ></div>
        </div>
      </div>
      <div className="stick-wrapper">
        <div className="stick">
          <div
            className="position"
            data-pressed={gamepadKeys?.right.stick.button === 1}
            style={
              {
                "--horizontal": gamepadKeys?.right.stick.horizontal ?? 0,
                "--vertical": gamepadKeys?.right.stick.vertical ?? 0,
              } as React.CSSProperties
            }
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default Controller;
