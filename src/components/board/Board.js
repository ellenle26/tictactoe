import React from "react";
import Square from "../square/Square.js";

const Board = ({ squareClicked, squareList }) => {
  const renderSquare = (id) => {
    return (
      <Square squareClicked={squareClicked} id={id} squareList={squareList} />
    );
  };
  //   function createSquares(row, col) {
  //     let html = [];

  //     for (let i = 0; i < row; i++) {
  //       let rowHTML = [];
  //       for (let j = 0; j < col; j++) {
  //         rowHTML.push(renderSquare(j + i * col));
  //         console.log(rowHTML);
  //       }
  //       html.push(<div style={{ display: "flex" }}> {rowHTML} </div>);
  //     }
  //     return html;
  //   }

  return (
    <div>
      <div style={{ display: "flex" }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div style={{ display: "flex" }}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div style={{ display: "flex" }}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      {/* {createSquares(3, 3)} */}
    </div>
  );
};

export default Board;
