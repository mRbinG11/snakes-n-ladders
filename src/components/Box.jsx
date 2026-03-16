import React from "react";
import "./Box.css";

const Box = (value, type = "normal", endValue = value, players = []) => {
  return (
    <div className={`box ` + type}>
      <div className="values">
        <p className="value">{value}</p>
        {endValue !== value ? (
          <p className="endValue">{`->` + endValue}</p>
        ) : (
          <></>
        )}
      </div>
      {players.length ? (
        <div className="players">
          {players.map((player) => (
            <p className="player">{player}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(Box);
