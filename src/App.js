import React, { Component } from "react";
import "./App.css";
import Board from "./components/board/Board.js";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      squareList: [null, null, null, null, null, null, null, null, null],
      isXNext: true,
      winner: null,
      history: [],
    };
  }

  checkWinner = (list) => {
    const winPosition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winPosition.length; i++) {
      const [a, b, c] = winPosition[i];
      if (list[a] && list[a] === list[b] && list[a] === list[c]) {
        this.setState({ winner: list[a] });
        return;
      }
    }
  };

  squareClicked = (id) => {
    if (this.state.winner) {
      alert("we have winner already");
    } else {
      let array = this.state.squareList;
      if (!(array[id] == null)) {
        alert("click another square");
        return;
      }
      this.state.isXNext
        ? this.setState({ player: "O" })
        : this.setState({ player: "X" });
      array[id] = this.state.isXNext ? "X" : "O";
      this.setState({
        squareList: [...array],
        isXNext: !this.state.isXNext,
      });
      let historyArray = this.state.history;
      historyArray.push(array);
      this.checkWinner(this.state.squareList);
      this.setState({ history: [...historyArray] });
      console.log("his", this.state.history);
    }
  };

  render() {
    return (
      <div>
        <div>Next player : {this.state.player}</div>
        <div>
          Winner:
          {this.state.winner}
        </div>
        <Board
          squareClicked={this.squareClicked}
          squareList={this.state.squareList}
        />
        <div>History :</div>
        {this.state.history &&
          this.state.history.map((item, index) => {
            return (
              <button onClick={() => this.setState({ squareList: item })}>
                Go to move #{index + 1}
              </button>
            );
          })}
      </div>
    );
  }
}
