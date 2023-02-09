import React, { useState, useEffect } from "react";
import "./manage-employee.scss";
import * as type from "./type";
const ManageEmployeeView = ({ employeeList }: type.manageEmployeeProps) => {
  return (
    <div className="ManageEmployeeView-top-container">
      <div className="employeeList-ul-col">
        <span className="employeeList-ul-col-name">이름</span>
        <span className="employeeList-ul-col-rank">직급</span>
        <span className="employeeList-ul-col-color">색상</span>
      </div>
      <ul className="employeeList-ul">
        {employeeList.map((item) => (
          <li className="employeeList-li">
            <span className="employeeList-li-name">{item.name}</span>
            <span className="employeeList-li-rank">{item.rank}</span>
            <span className="employeeList-li-color">
              <span
                className="employeeList-li-color-content"
                style={{ backgroundColor: item.backgroundColor }}
              ></span>
            </span>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="employeeList-addButton">직원추가</button>
      </div>
    </div>
  );
};
export default ManageEmployeeView;