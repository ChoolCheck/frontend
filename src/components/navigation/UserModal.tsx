import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../../api/auth";

export interface userModalProps {
  setUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal = ({ setUserModalOpen }: userModalProps) => {
  const navigate = useNavigate();
  return (
    <div className="usermodal-container">
      <div>usermodal</div>
      <button className="close-button" onClick={() => setUserModalOpen(false)}>
        ⅹ
      </button>
      <button className="userInfo" onClick={() => navigate("/mypage")}>
        회원정보
      </button>
      <button className="logout" onClick={() => LogoutApi({ navigate })}>
        로그아웃
      </button>
    </div>
  );
};

export default UserModal;
