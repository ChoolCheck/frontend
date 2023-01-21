import React, { useState } from "react";
import * as type from "./type";
import styled from "styled-components";
const ToggleButton = ({
  leftButtonTitle,
  rightButtonTitle,
}: type.toggleButtonPrpos) => {
  return (
    <>
      <LeftToggleButton className="seleted page-top-button">
        {leftButtonTitle}
      </LeftToggleButton>
      <RightToggleButton className=" page-top-button">
        {rightButtonTitle}
      </RightToggleButton>
    </>
  );
};

const LeftToggleButton = styled.button`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
const RightToggleButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export default ToggleButton;
