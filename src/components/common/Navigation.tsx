import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../../api/auth";
import { config } from "../../static/config";

const Navigation = () => {
  const navigate = useNavigate();
  //개발환경
  if (
    window.location.href == `http://localhost:3000/login` ||
    window.location.href == `http://localhost:3000/signup`
  )
    return <></>;
  //배포환경
  else if (
    window.location.href == `${config.client}/login` ||
    window.location.href == `${config.client}/signup`
  )
    return <></>;
  return (
    <div className="Navigation-top-container">
      <button className="Navigation-logo" onClick={() => navigate("/calendar")}>
        Choolcheck
      </button>
      <div className="Navigation-menu">
        <button onClick={() => navigate("/schedule")}>스케줄</button>
        <button onClick={() => navigate("/workcheck")}>출근부</button>
        <button onClick={() => navigate("/Statistics")}>근무통계</button>
        <button onClick={() => navigate("/manage")}>관리</button>
        <button onClick={() => LogoutApi(navigate)}>로그아웃</button>
      </div>
    </div>
  );
};
export default Navigation;
