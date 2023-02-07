import React, { useState, useEffect } from "react";
import axios from "axios";
import "./manage-work.scss";
import * as type from "./type";
const ManageWorkView = ({ workFormList }: type.manageWorkProps) => {
  const onDeleteClick = () => {};
  return (
    <div className="ManageWorkView-top-container">
      <ul className="workFormList-ul">
        <p className="workFormList-ul-col">
          <span className="workFormList-ul-col-workForm">근무형태</span>
          <span className="workFormList-ul-col-time">시간</span>
          <span className="workFormList-ul-col-delete"></span>
        </p>
        {workFormList.map((item) => (
          <li className="workFormList-li">
            <span className="workFormList-li-workForm">{item.workForm}</span>
            <span className="workFormList-li-time">{item.time}</span>
            <button className="workFormList-li-delete" onClick={onDeleteClick}>
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="workFormList-addButton">근무추가</button>
      </div>
    </div>
  );
};
export default ManageWorkView;
