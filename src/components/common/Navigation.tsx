import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import { LogoutApi, IsTokenExpiredApi } from "../../api/auth";

const Navigation = () => {
  const navigate = useNavigate();

  const token = IsTokenExpiredApi();

  return (
    { token } && (
      <div className="Navigation-top-container">
        <button
          className="Navigation-logo"
          onClick={() => navigate("/calendar")}
        >
          choolcheck
        </button>
        <div className="Navigation-menu">
          <button onClick={() => navigate("/schedule")}>스케줄</button>
          <button onClick={() => navigate("/workcheck")}>출근부</button>
          <button onClick={() => navigate("/Statistics")}>근무통계</button>
          <button onClick={() => navigate("/manage")}>관리</button>
          <button onClick={() => LogoutApi()}>로그아웃</button>
        </div>
      </div>
    )
  );
};
export default Navigation;
