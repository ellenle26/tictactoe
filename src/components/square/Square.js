import React from "react";
import styles from "../square/Square.module.css";

const Square = ({ squareClicked, id, squareList }) => {
  return (
    <div className={styles.squareBox} id={id} onClick={() => squareClicked(id)}>
      <div>{squareList[id]}</div>
    </div>
  );
};

export default Square;
