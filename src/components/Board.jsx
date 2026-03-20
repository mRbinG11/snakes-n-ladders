/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Board.css";
import Box from "./Box";

export const Board = () => {
  const createPosition = (value, type, endValue, P1, P2) => ({
    value,
    type,
    endValue,
    P1,
    P2,
  });
  const [positions, setPositions] = useState(
    Array.from({ length: 100 }, (_, i) => {
      switch (i + 1) {
        case 1:
          return createPosition(i + 1, "normal", i + 1, true, true);
        case 4:
          return createPosition(i + 1, "ladder", 14, false, false);
        case 9:
          return createPosition(i + 1, "ladder", 21, false, false);
        case 17:
          return createPosition(i + 1, "snake", 7, false, false);
        case 20:
          return createPosition(i + 1, "ladder", 38, false, false);
        case 28:
          return createPosition(i + 1, "ladder", 44, false, false);
        case 40:
          return createPosition(i + 1, "ladder", 51, false, false);
        case 54:
          return createPosition(i + 1, "snake", 34, false, false);
        case 62:
          return createPosition(i + 1, "snake", 39, false, false);
        case 63:
          return createPosition(i + 1, "ladder", 81, false, false);
        case 64:
          return createPosition(i + 1, "snake", 60, false, false);
        case 71:
          return createPosition(i + 1, "ladder", 91, false, false);
        case 87:
          return createPosition(i + 1, "snake", 24, false, false);
        case 93:
          return createPosition(i + 1, "snake", 73, false, false);
        case 95:
          return createPosition(i + 1, "snake", 75, false, false);
        case 99:
          return createPosition(i + 1, "snake", 78, false, false);
        default:
          return createPosition(i + 1, "normal", i + 1, false, false);
      }
    }),
  );
  const [gameOn, setGameOn] = useState(true);
  const [turn, setTurn] = useState("P1");
  const [lastTurn, setLastTurn] = useState("P2");
  const [roll, setRoll] = useState(0);

  const switchTurn = (p) => (p === "P1" ? "P2" : "P1");

  const updatePositions = () => {
    setLastTurn((prev) => switchTurn(prev));

    let currVal = 0,
      endVal = 0;
    const newPositions = positions.map((position) => {
      if (position[turn]) {
        currVal = position.value;
        position[turn] = false;
        return position;
      } else if (currVal + roll === position.value) endVal = position.endValue;
      else if (currVal + roll > 100) endVal = 100;
      return position;
    });
    if (endVal) newPositions[endVal - 1][turn] = true;
    setPositions(newPositions);

    if (endVal === 100) setGameOn(false);

    setTurn((prev) => switchTurn(prev));
  };

  const rollDice = () => {
    setRoll(Math.floor(Math.random() * 6) + 1);
  };

  const reset = () => {
    setPositions(
      Array.from({ length: 100 }, (_, i) => {
        switch (i + 1) {
          case 1:
            return createPosition(i + 1, "normal", i + 1, true, true);
          case 4:
            return createPosition(i + 1, "ladder", 14, false, false);
          case 9:
            return createPosition(i + 1, "ladder", 21, false, false);
          case 17:
            return createPosition(i + 1, "snake", 7, false, false);
          case 20:
            return createPosition(i + 1, "ladder", 38, false, false);
          case 28:
            return createPosition(i + 1, "ladder", 44, false, false);
          case 40:
            return createPosition(i + 1, "ladder", 51, false, false);
          case 54:
            return createPosition(i + 1, "snake", 34, false, false);
          case 62:
            return createPosition(i + 1, "snake", 39, false, false);
          case 63:
            return createPosition(i + 1, "ladder", 81, false, false);
          case 64:
            return createPosition(i + 1, "snake", 60, false, false);
          case 71:
            return createPosition(i + 1, "ladder", 91, false, false);
          case 87:
            return createPosition(i + 1, "snake", 24, false, false);
          case 93:
            return createPosition(i + 1, "snake", 73, false, false);
          case 95:
            return createPosition(i + 1, "snake", 75, false, false);
          case 99:
            return createPosition(i + 1, "snake", 78, false, false);
          default:
            return createPosition(i + 1, "normal", i + 1, false, false);
        }
      }),
    );
    setGameOn(true);
    setTurn("P1");
    setLastTurn("P2");
    setRoll(0);
  };

  useEffect(() => {
    if (roll) updatePositions();
  }, [roll]);

  return (
    <div className="card">
      <h1>Snake & Ladders</h1>
      <div className="subtitle">
        <div className="left-subtitle">
          {gameOn ? (
            <>
              <p className="left-label">Turn:</p>
              <p className={turn}>{turn}</p>
            </>
          ) : (
            <>
              <p className="left-label">Winner:</p>
              <p className={lastTurn}>{lastTurn}</p>
            </>
          )}
        </div>
        {roll ? <div>{lastTurn + ` Rolled ` + roll}</div> : <></>}
        <div className="right-subtitle">
          <p className="P1">P1</p>
          <p className="P2">P2</p>
        </div>
      </div>
      <div className="board">
        {positions.toReversed().map((pos) => {
          return (
            <Box
              key={pos.value}
              value={pos.value}
              type={pos.type}
              endValue={pos.endValue}
              P1={pos.P1}
              P2={pos.P2}
            />
          );
        })}
      </div>
      <div className="btns">
        <button onClick={rollDice} disabled={!gameOn}>
          Roll Dice
        </button>
        <button onClick={reset} disabled={positions[0].P1 || positions[0].P2}>
          Reset
        </button>
      </div>
      <p>
        Exact 100 is required to win. Land on a ladder to climb up, a snake to
        slide down.
      </p>
    </div>
  );
};
