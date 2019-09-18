import React from "react";

import "./Button.scss";

function Button({ type, children, onClick }) {
  const animateClick = e => {
    const button = e.target;
    const x = e.clientX;
    const y = e.clientY;
    const buttonTop = button.offsetTop;
    const buttonLeft = button.offsetLeft;
    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;
    const circle = document.createElement("span");

    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    button.appendChild(circle);

    setTimeout(() => circle.remove(), 500);

    // execute onClick passed in props if present
    onClick && onClick();
  };

  return (
    <button
      className={`Button${type ? ` ${type}` : ""}`}
      onClick={animateClick}
    >
      {children}
    </button>
  );
}

export default Button;
