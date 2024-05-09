import { useState } from "react";

import TicTacToe from "@sahilsinghrana/tictactoe.js";

import "./index.css";
const game = new TicTacToe();
export default function App() {
  console.log({
    game,
  });
  return (
    <div className="App">
      <Board />
    </div>
  );
}

const Board = () => {
  const [_, updateBoard] = useState(true);
  console.log({ game });
  return (
    <div>
      <div
        className={`wrapper ${
          game.currentPlayer === 0
            ? "currentIce"
            : game.currentPlayer === 1
            ? "currentFire"
            : ""
        }`}
      >
        {game.board.board.map((row, i) => {
          return (
            <div className={`board`}>
              {row.map((cell, j) => {
                return (
                  <button
                    disabled={game.winner !== -1}
                    className={`button ${
                      cell === 1 ? "fire" : cell === 0 ? "ice" : "notPlayed"
                    }  ${
                      game.winner === cell && cell !== -1 ? "isWinCell" : ""
                    } ${
                      game.currentPlayer === 1 && cell === -1
                        ? "canFire"
                        : game.currentPlayer === 0 && cell === -1
                        ? "canIce"
                        : ""
                    } `}
                    onClick={() => {
                      try {
                        game.play(i, j);
                        updateBoard((prev) => !prev);
                        // predictBestMove(game);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* {i}, {j} =  */}
                    {cell === -1 ? "" : cell === 1 ? "X" : "O"}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          marginTop: "5px",
          justifyContent: "center",
        }}
      >
        <pre
          style={{ background: "lightgray", padding: "10px", margin: "5px" }}
        >
          {JSON.stringify(
            {
              currentPlayer: game.currentPlayer,
              gameStatus: game.gameStatus,
              winner: game.winner,
            },
            null,
            2
          )}
        </pre>
        <pre
          style={{ background: "lightgray", padding: "10px", margin: "5px" }}
        >
          {/* {JSON.stringify(predictBestMove(game), null, 2)} */}
        </pre>
      </div>
    </div>
  );
};
