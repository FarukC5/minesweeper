import React, { useState, useEffect } from "react";
import createBoard from "../helper/createBoard";
import Cell from "./Cell";
import { revealed } from "../helper/reveal";
import "../styles/style.css";

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [mineCount, setMineCount] = useState(10);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [plantMines, setPlantMines] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);

  useEffect(() => {
    initiBoard();
  }, []);

  const initiBoard = () => {
    const newBoard = createBoard(8, 8, 10);
    setNonMineCount(8 * 8 - 10);
    setPlantMines(newBoard.mineLocation);
    setBoardGrid(newBoard.board);
  };

  const restartGame = () => {
    initiBoard();
    setGameStatus(false);
    setMineCount(10);
  };

  const handleRightClick = (e, x, y) => {
    e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(boardGrid));

    if (newGrid[x][y].revealed) return;

    if (!gameStatus || nonMineCount > 0) {
      if (newGrid[x][y].flagged === true) {
        newGrid[x][y].flagged = false;
        setMineCount(mineCount + 1);
      } else {
        if (mineCount > 0) {
          newGrid[x][y].flagged = true;
          setMineCount(mineCount - 1);
        }
      }
    }
    setBoardGrid(newGrid);
    return;
  };

  const handleLeftClick = (x, y) => {
    if (boardGrid[x][y].revealed || gameStatus || boardGrid[x][y].flagged)
      return;

    let newGrid = JSON.parse(JSON.stringify(boardGrid));
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < plantMines.length; i++) {
        newGrid[plantMines[i][0]][plantMines[i][1]].revealed = true;
      }
      setBoardGrid(newGrid);
      setGameStatus(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setBoardGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameStatus(true);
      }
    }
  };

  return (
    <div className="board-container">
      {!gameStatus && <h2>Minesweeper</h2>}
      {gameStatus && nonMineCount > 0 && <h2>You lost!</h2>}
      {nonMineCount === 0 && <h2>You won!</h2>}
      <div className="mine-counter">
        <p>mines remaining: {mineCount}</p>
      </div>
      <div className="cell-container">
        {boardGrid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <div
                    key={index2}
                    style={{ border: "0.5px solid white", borderRadius: "3px" }}
                  >
                    <Cell
                      gameStatus={gameStatus}
                      handleLeftClick={handleLeftClick}
                      details={singleBlock}
                      handleRightClick={handleRightClick}
                      nonMineCount={nonMineCount}
                      mineCount={mineCount}
                      setMineCount={setMineCount}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}

        {gameStatus && (
          <div className="play-again" onClick={() => restartGame()}>
            Play again?
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
