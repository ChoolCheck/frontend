import React, { useState } from "react";
import * as type from "./type";
import "./togglebutton.scss";

const ToggleButton = ({
  leftButtonTitle,
  rightButtonTitle,
  leftOrRight,
  setLeftOrRight,
}: type.toggleButtonPrpos) => {
  const [selectedButton, setSelectedButton] =
    useState<String>("leftButtonTitle");

  const onToggleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const ButtonList = document.querySelectorAll(".toggleButton");

    // active되어있는 버튼을 탐색하여 active 해제 후 클릭된 버튼에 active 할당 후 state 변경
    if (selectedButton != button.innerText) {
      for (let i = 0; i < 2; i++) {
        if (ButtonList[i].classList.contains("selected"))
          ButtonList[i].classList.remove("selected");
      }
      button.classList.add("selected");
      setSelectedButton(button.innerText);
      setLeftOrRight(!leftOrRight);
    }
  };

  return (
    <div className="togglebutton-container">
      <button
        className="toggleButton selected page-header-button left"
        onClick={onToggleButtonClick}
      >
        {leftButtonTitle}
      </button>
      <button
        className="toggleButton page-header-button right"
        onClick={onToggleButtonClick}
      >
        {rightButtonTitle}
      </button>
    </div>
  );
};

export default ToggleButton;
