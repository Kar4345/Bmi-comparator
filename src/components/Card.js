import React from "react";
import "../styles/card.css";
function Card({ info, deleteItem, index }) {
  return (
    <div className="holder">
      <div
        className="close"
        onClick={() => {
          deleteItem(index);
        }}
      >
        &#10006;
      </div>
      <div className="actual">
        <div>
          <strong>Name</strong> {info.name}
        </div>
        <div>
          <strong>BMI</strong> {info.Bmi}
        </div>
        <div>
          <strong>Date</strong> {info.Date}
        </div>
      </div>
    </div>
  );
}

export default Card;
