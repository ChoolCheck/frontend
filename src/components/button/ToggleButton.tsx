import React, { useState } from "react";
import * as type from "./type";
import styled from "styled-components";
const ToggleButton = ({
  leftButtonTitle,
  rightButtonTitle,
}: type.toggleButtonPrpos) => {
  return (
    <>
      <LeftToggleButton className="seleted">{leftButtonTitle}</LeftToggleButton>
      <RightToggleButton>{rightButtonTitle}</RightToggleButton>
    </>
  );
};

const LeftToggleButton = styled.button`
  background-color: #f5f5f5;
  color: black;
  border-radius: 10px 0 0 10px;
  padding: 15px;
  width: 130px;
`;
const RightToggleButton = styled.button`
  background-color: #f5f5f5;
  color: black;
  border-radius: 0 10px 10px 0;
  padding: 15px;
  width: 130px;
`;

export default ToggleButton;
