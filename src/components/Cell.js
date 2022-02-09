import React from "react";

export default function Cell({
  gameStatus,
  details,
  handleRightClick,
  handleLeftClick,
}) {
  const mineColor = () => {
    let colors = "red";
    return colors;
  };

  const revealedColor = () => {
    return "#B2B1B9";
  };

  const notRevealedColor = () => {
    return "#595260";
  };

  const cellStyle = {
    background: details.revealed //
      ? details.value === "X"
        ? mineColor()
        : revealedColor(details.x, details.y)
      : notRevealedColor(details.x, details.y),
  };

  return (
    <div
      className="cell-style"
      onContextMenu={(e) => {
        if (!gameStatus) {
          handleRightClick(e, details.x, details.y);
        }
        return;
      }}
      onClick={() => {
        handleLeftClick(details.x, details.y);
      }}
      style={cellStyle}
    >
      {!details.revealed && details.flagged
        ? "🚩"
        : details.revealed && details.value !== 0
        ? details.value === "X"
          ? "💣"
          : details.value
        : ""}
    </div>
  );
}
