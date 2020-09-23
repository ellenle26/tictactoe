import React, { Component } from "react";
import "./App.css";
import Board from "./components/board/Board.js";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      squareList: [null, null, null, null, null, null, null, null, null],
      isXNext: true,
      player: "X",
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
      alert(`${this.state.winner} had won. Please restart game!`);
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
      <div className="page">
        <div style={{ fontSize: "40px" }}>TIC-TAC-TOE</div>
        <div className="mainSection">
          <div>
            <div style={{ fontSize: "25px" }}>{this.state.player} turn</div>
            <Board
              squareClicked={this.squareClicked}
              squareList={this.state.squareList}
            />
          </div>
          <div className="history">
            <button
              onClick={() =>
                this.setState({
                  squareList: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                  ],
                  isXNext: true,
                  player: "X",
                  winner: null,
                  history: [],
                })
              }
            >
              Reset Game
            </button>
            <div>History Board:</div>
            <div className="historyBttn">
              {this.state.history &&
                this.state.history.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        this.setState({
                          squareList: [...item],
                        });
                        let newHistory = this.state.history.slice(0, index + 1);
                        console.log(
                          "newHis",
                          newHistory,
                          "oldhis",
                          this.state.history
                        );
                        if (index % 2 === 0) {
                          if (index === newHistory.length - 1) {
                            this.setState({
                              history: [...newHistory],
                            });
                          }
                          this.setState({
                            history: [...newHistory],
                            isXNext: this.state.isXNext,
                          });
                        } else {
                          if (index === newHistory.length - 1) {
                            this.setState({
                              history: [...newHistory],
                            });
                          }
                          this.setState({
                            history: [...newHistory],
                            isXNext: !this.state.isXNext,
                          });
                        }
                        if (this.state.winner) {
                          this.setState({ history: [] });
                        }
                      }}
                    >
                      Go to move #{index + 1}
                    </button>
                  );
                })}
            </div>
            <div style={{ fontSize: "50px", color: "yellowgreen" }}>
              {this.state.winner ? (
                <div>
                  <u>{this.state.winner} won </u>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
