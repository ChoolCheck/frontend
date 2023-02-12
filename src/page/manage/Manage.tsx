import React, { useState, useEffect } from "react";
import axios from "axios";
import ManageEmployeeView from "./ManageEmployeeView";
import ManageWorkView from "./ManageWorkView";
import ToggleButton from "../../components/button/ToggleButton";
import { GetWorktypeApi } from "../../api/manage";
import * as type from "./type";
import "./manage.scss";
const Manage = () => {
  const [leftOrRight, setLeftOrRight] = useState(true);

  const employee = [
    { name: "김어진", backgroundColor: "#ffd6a5", rank: "직원" },
  ];

  const [employeeList, setEmployeeList] = useState(employee);
  const [workTypeList, setWorkTypeList] = useState<
    type.worktypeProps[] | undefined
  >();

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList });
  }, []);

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
        <ManageEmployeeView employeeList={employeeList}></ManageEmployeeView>
      ) : (
        <ManageWorkView workTypeList={workTypeList}></ManageWorkView>
      )}
    </div>
  );
};

export default Manage;
