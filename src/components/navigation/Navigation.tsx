import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
import { config } from "../../static/config";
import userIcon from "../../static/icon/user.png";

import UserModal from "./UserModal";

const Navigation = () => {
  const navigate = useNavigate();
  const [userModalOpen, setUserModalOpen] = useState(false);

  if (
    window.location.href == `${config.client}/login` ||
    window.location.href == `${config.client}/signup`
  )
    return <></>;
  else if (window.location.href == `${config.client}/updatePassword`)
    return (
      <div>
        <p>비밀번호 변경</p>
      </div>
    );
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
          <button
            onClick={() => {
              navigate("/schedule");
              setUserModalOpen(false);
            }}
          >
            스케줄
          </button>
          <button
            onClick={() => {
              navigate("/workcheck");
              setUserModalOpen(false);
            }}
          >
            출근부
          </button>
          <button
            onClick={() => {
              navigate("/Statistics");
              setUserModalOpen(false);
            }}
          >
            근무통계
          </button>
          <button
            onClick={() => {
              navigate("/manage");
              setUserModalOpen(false);
            }}
          >
            관리
          </button>
          <div>
            <img
              className="userIcon"
              src={userIcon}
              onClick={() => setUserModalOpen(!userModalOpen)}
            ></img>
            <div className="usermodal-container">
              {userModalOpen && (
                <UserModal setUserModalOpen={setUserModalOpen}></UserModal>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};
export default Navigation;
