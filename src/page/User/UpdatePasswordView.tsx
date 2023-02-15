import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as type from "./type";
import "./style/updatePasswordView.scss";

const UpdatePasswordView = ({
  isPassword,
  isPasswordCheck,
  passwordMessage,
  passwordCheckMessage,
  onChangePassword,
  onChangePasswordCheck,
  onUpdateClick,
}: type.updatePasswordProps) => {
  return (
    <div className="updatepassword-top-container">
      <h3 className="updatepassword-header">비밀번호 수정</h3>

      <div className="updatepassword-form">
        <div className="updatepassword-Password">
          <p className="updatepassword-PasswordHeader">비밀번호</p>
          <input
            className="updatepassword-inputPassword"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={onChangePassword}
            name="password"
            type="password"
          />
          <p className={`message-${isPassword ? "success" : "error"}`}>
            {passwordMessage}
          </p>
        </div>

        <div className="updatepassword-PasswordCheck">
          <p className="updatepassword-PasswordCheckHeader">비밀번호 확인</p>
          <input
            className="updatepassword-inputPasswordCheck"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            name="password"
            type="password"
          />
          <p className={`message-${isPasswordCheck ? "success" : "error"}`}>
            {passwordCheckMessage}
          </p>
        </div>
      </div>

      <div className="button-container">
        <button onClick={onUpdateClick}>수정</button>
      </div>
    </div>
  );
};

export default UpdatePasswordView;
