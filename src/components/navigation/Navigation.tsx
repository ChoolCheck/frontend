import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
import { config } from "../../static/config";
import userIcon from "../../static/icon/user.png";

import UserModal from "./UserModal";

const Navigation = () => {
  const navigate = useNavigate();
  const [userModalOpen, setUserModalOpen] = useState(false);

  //배포환경
  if (
    window.location.href == `${config.client}/login` ||
    window.location.href == `${config.client}/signup`
  )
    return <></>;
  else
    return (
      <div className="Navigation-top-container">
        <button
          className="Navigation-logo"
          onClick={() => navigate("/calendar")}
        >
          Choolcheck
        </button>
        <div className="Navigation-menu">
          <button onClick={() => navigate("/schedule")}>스케줄</button>
          <button onClick={() => navigate("/workcheck")}>출근부</button>
          <button onClick={() => navigate("/Statistics")}>근무통계</button>
          <button onClick={() => navigate("/manage")}>관리</button>
          <button onClick={() => setUserModalOpen(true)}>
            <img className="userIcon" src={userIcon} />
          </button>
        </div>
        {userModalOpen && (
          <UserModal setUserModalOpen={setUserModalOpen}></UserModal>
        )}
      </div>
    );
};
export default Navigation;
