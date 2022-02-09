import React, { useState } from "react";
import Board from "./Board";
import Modal from "./Modal";

function Game() {
  const [modal, setModal] = useState(false);
  const play = () => {
    setModal(true);
  };
  return (
    <div className="App">
      <div>
        <Board />
      </div>
      <Modal play={play} modal={modal} />
    </div>
  );
}

export default Game;
