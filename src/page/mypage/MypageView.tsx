import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mypageView.scss";
import * as type from "./type";
import { GetUserInfoApi } from "../../api/mypage";

const MypageView = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<type.userInfoProps>({
    email: "",
    storeName: "",
    createdDate: "",
  });

  useEffect(() => {
    GetUserInfoApi({ setUserInfo });
  }, []);

  return (
    <div className="mypageview-top-container">
      <h3 className="mypageview-header">회원 정보</h3>
      <div className="mypageview-content">
        <p className="mypageview-email">
          <span className="email-title">이메일</span>
          <span className="email-content">{userInfo.email}</span>
        </p>
        <p className="mypageview-storename">
          <span className="storename-title">가게명</span>
          <span className="storename-content">{userInfo.storeName}</span>
        </p>
        <p className="mypageview-joindate">
          <span className="joindate-title">가입일</span>
          <span className="joindate-content">{userInfo.createdDate}</span>
        </p>
      </div>
      <div className="button-container">
        <button
          onClick={() => navigate("/updateUserInfo", { state: userInfo })}
        >
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default MypageView;
