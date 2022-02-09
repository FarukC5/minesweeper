import React from "react";

const Modal = ({ play, modal }) => {
  return (
    <div className="modal-container" style={!modal ? { display: "flex" } : {}}>
      <div className="modal">
        <h2>Minesweeper</h2>
        <p>Press play to continue</p>
        <div className="play" onClick={play}>
          Play
        </div>
      </div>
    </div>
  );
};

export default Modal;
