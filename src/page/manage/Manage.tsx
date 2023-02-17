import React, { useState } from "react";
import ManageEmployeeView from "./ManageEmployeeView";
import ManageWorkView from "./ManageWorkView";
import ToggleButton from "../../components/button/ToggleButton";

import "./style/manage.scss";
const Manage = () => {
  const [leftOrRight, setLeftOrRight] = useState(true);

  return (
    <div className="Manage-top-container">
      <div className="Manage-Header-container">
        <ToggleButton
          leftButtonTitle="직원관리"
          rightButtonTitle="근무관리"
          leftOrRight={leftOrRight}
          setLeftOrRight={setLeftOrRight}
        ></ToggleButton>
      </div>

      {leftOrRight ? (
        <ManageEmployeeView></ManageEmployeeView>
      ) : (
        <ManageWorkView></ManageWorkView>
      )}
    </div>
  );
};

export default Manage;
