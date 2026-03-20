import React from "react";
import "./Box.css";

const Box = ({
  value,
  type = "normal",
  endValue = value,
  P1 = false,
  P2 = false,
}) => {
  return (
    <div className={`box ` + type}>
      <div className="values">
        <p className="value">{value}</p>
        {endValue !== value ? (
          <p className="endValue">
            {(type === "snake" ? "S " : "L ") + endValue}
          </p>
        ) : (
          <></>
        )}
      </div>
      {P1 || P2 ? (
        <div className="players">
          {P1 && <p className="P1">P1</p>}
          {P2 && <p className="P2">P2</p>}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(Box);
