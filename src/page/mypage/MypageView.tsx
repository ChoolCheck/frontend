import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mypageView.scss";
import * as type from "./type";

const MypageView = ({}: type.mypageProps) => {
  const navigate = useNavigate();

  return (
    <div className="mypageview-top-container">
      <h3 className="mypageview-header">회원 정보</h3>
      <div className="mypageview-content">
        <p className="mypageview-email">
          <span className="email-title">이메일</span>
          <span className="email-content">wonderful990716@gmail.com</span>
        </p>
        <p className="mypageview-storename">
          <span className="storename-title">가게명</span>
          <span className="storename-content">스타벅스-홍제점</span>
        </p>
        <p className="mypageview-joindate">
          <span className="joindate-title">가입일</span>
          <span className="joindate-content">2022/01/21</span>
        </p>
      </div>
      <div className="button-container">
        <button onClick={() => navigate("/updateUserInfo")}>
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default MypageView;
