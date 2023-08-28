import React from "react";
import "./Output.css";

function Output({ age }) {
  return (
    <div className="output__container">
      <React.Fragment>
        <p className="output__text output__text_type_year">
          <span className="output__span">
            {age.years !== null ? age.years : "--"}
          </span>
          YEAR
        </p>
        <p className="output__text output__text_type_month">
          <span className="output__span">
            {age.months !== null ? age.months : "--"}
          </span>
          MONTH
        </p>
        <p className="output__text output__text_type_day">
          <span className="output__span">
            {age.days !== null ? age.days : "--"}
          </span>
          DAY
        </p>
      </React.Fragment>
    </div>
  );
}

export default Output;
