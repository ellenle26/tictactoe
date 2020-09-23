import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import "./App.css";
import Board from "./components/board/Board.js";

let appID = process.env.REACT_APP_APPKEY;
export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      squareList: [null, null, null, null, null, null, null, null, null],
      isXNext: true,
      player: "X",
      winner: null,
      history: [],
      isSignIn: false,
      fbName: "",
      startTime: Number,
      endTime: Number,
      topPlayer: [],
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
        this.setState({ winner: list[a], endTime: Date.now() });

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
      if (historyArray.length === 1) {
        this.setState({ startTime: Date.now() });
      }
    }
  };

  postData = async () => {
    let data = new URLSearchParams();
    data.append("player", `${this.state.fbName}`);
    data.append(
      "score",
      `${Math.round((this.state.endTime - this.state.startTime) / 1000)}`
    );
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      json: true,
    });
    console.log("response", response, "data", this.getData());
  };

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({ ...this.state, topPlayer: data.items });
  };

  responseFacebook = (response) => {
    console.log(response);
    this.setState({ isSignIn: true, fbName: response.name });
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
            {this.state.isSignIn ? (
              <div style={{ fontSize: "20px" }}>
                User name : {this.state.fbName}
              </div>
            ) : (
              <FacebookLogin
                appId={appID}
                autoLoad={false}
                fields="name,email,picture"
                callback={(res) => this.responseFacebook(res)}
              />
            )}
            <div>
              <button
                style={{ width: "fit-content", marginTop: "30px" }}
                onClick={() => this.postData()}
              >
                Send Data
              </button>
              <button
                style={{ width: "fit-content", marginTop: "30px" }}
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
                    startTime: Number,
                    endTime: Number,
                  })
                }
              >
                RESTART GAME
              </button>
            </div>
            <div>History Board:</div>
            <div className="historyBttn">
              {this.state.history &&
                this.state.history.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        this.setState({
                          squareList: [...item],
                          isXNext: index % 2 === 1,
                        });
                        this.state.isXNext
                          ? this.setState({ player: "O" })
                          : this.setState({ player: "X" });
                        let newHistory = this.state.history.slice(0, index + 1);
                        if (index === newHistory.length - 1) {
                          this.setState({
                            history: [...newHistory],
                          });
                        }
                        this.setState({
                          history: [...newHistory],
                        });

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
            <div style={{ fontSize: "40px", color: "yellowgreen" }}>
              {this.state.winner ? (
                <div>
                  <u>{this.state.winner} won </u> - Score : &nbsp;
                  {Math.round(
                    (this.state.endTime - this.state.startTime) / 1000
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <div>TOP PLAYERS :</div>
              {this.state.topPlayer.map((item, index) => {
                if (index < 3 && item.score > 0) {
                  return (
                    <div>
                      {item.player} - Score: {item.score}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
