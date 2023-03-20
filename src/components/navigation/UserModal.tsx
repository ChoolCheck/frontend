import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../../api/auth";
import "./userModal.scss";

export interface userModalProps {
  setUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal = ({ setUserModalOpen }: userModalProps) => {
  const navigate = useNavigate();
  const onUserInfoClick = () => {
    navigate("/mypage");
    setUserModalOpen(false);
  };
  const onLogoutClick = () => {
    LogoutApi({ navigate });
    setUserModalOpen(false);
  };
  return (
    <div className="usermodal">
      <div className="row-first"></div>

      <div className="row-center">
        <p className="userInfo" onClick={onUserInfoClick}>
          회원정보
        </p>
        <p className="logout" onClick={onLogoutClick}>
          로그아웃
        </p>
      </div>
    </div>
  );
};

export default UserModal;
