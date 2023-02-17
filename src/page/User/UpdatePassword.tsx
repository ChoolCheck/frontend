import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePasswordView from "./UpdatePasswordView";
import { UpdatePasswordApi } from "../../api/mypage";
import "./style/updatePassword.scss";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const mailtoken = new URLSearchParams(window.location.search).get("token");

  const [mailToken, setMailToken] = useState(mailtoken ? mailtoken : "");

  console.log(mailToken);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCheckNow = e.target.value;
    if (password === passwordCheckNow) {
      setPasswordCheckMessage("동일한 비밀번호입니다.");
      setIsPasswordCheck(true);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordCheck(false);
    }
  };

  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    UpdatePasswordApi({ password, mailToken, navigate });
  };
  return (
    <div className="updatepassword-top-container">
      <UpdatePasswordView
        isPassword={isPassword}
        isPasswordCheck={isPasswordCheck}
        passwordMessage={passwordMessage}
        passwordCheckMessage={passwordCheckMessage}
        onChangePassword={onChangePassword}
        onChangePasswordCheck={onChangePasswordCheck}
        onUpdateClick={onUpdateClick}
      ></UpdatePasswordView>
    </div>
  );
};

export default UpdatePassword;
