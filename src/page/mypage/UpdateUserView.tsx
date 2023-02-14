import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as type from "./type";
import "./mypageView.scss";

const UpdateUserView = ({}: type.updateUserProps) => {
  const navigate = useNavigate();

  const [storename, setStorename] = useState("스타벅스-홍제점");
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorename(e.currentTarget.value);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("회원정보 수정을 취소하시겠습니까?")) {
      navigate("/mypage");
    }
  };
  return (
    <div className="mypageview-top-container">
      <h3 className="mypageview-header">회원정보 수정</h3>
      <div className="mypageview-content">
        <p className="mypageview-email">
          <span className="email-title">이메일</span>
          <span className="email-content">wonderful990716@gmail.com</span>
        </p>
        <p className="mypageview-storename">
          <span className="storename-title">가게명</span>
          <input
            className="storename-content-input"
            value={storename}
            onChange={onChangeName}
          ></input>
        </p>
        <p className="mypageview-joindate">
          <span className="joindate-title">가입일</span>
          <span className="joindate-content">2022/01/21</span>
        </p>
      </div>
      <div className="button-container">
        <button onClick={onCancelClick}>취소</button>
        <button>수정</button>
      </div>
    </div>
  );
};

export default UpdateUserView;
