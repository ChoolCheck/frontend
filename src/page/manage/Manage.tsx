import React, { useState, useEffect } from "react";
import axios from "axios";
import ManageEmployeeView from "./ManageEmployeeView";
import ManageWorkView from "./ManageWorkView";
import ToggleButton from "../../components/button/ToggleButton";
import "./manage.scss";
const Manage = () => {
  const [leftOrRight, setLeftOrRight] = useState(true);

  const employee = [
    { name: "김어진", backgroundColor: "#ffd6a5", rank: "직원" },
    { name: "이예빈", backgroundColor: "#ffadad", rank: "알바" },
    { name: "감자밭", backgroundColor: "#bdb2ff", rank: "알바" },
    { name: "고구마", backgroundColor: "#fdffb6", rank: "매니저" },
    { name: "옥수수", backgroundColor: "#a0c4ff", rank: "알바" },
    { name: "안녕하세요안녕하세요", backgroundColor: "#a0c4ff", rank: "알바" },
  ];

  const work = [
    { workForm: "오픈", time: "9:00-13:00" },
    { workForm: "마감", time: "19:00-23:00" },
  ];
  const [employeeList, setEmployeeList] = useState(employee);
  const [workFormList, setWorkFormatList] = useState(work);

  useEffect(() => {
    //scheduleTotalList(scheduleTotal);
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
        <ManageWorkView workFormList={workFormList}></ManageWorkView>
      )}
    </div>
  );
};

export default Manage;
