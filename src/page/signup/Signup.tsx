import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SignupView from "./SignupView";
import { SignupApi } from "../../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    storeName: "",
  });

  const { email, password, storeName } = form;

  //오류메시지 상태저장
  const [storeNameMessage, setStoreNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isStoreName, setIsStoreName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const onChangeForm = (name: string, value: string) => {
    // console.log(form + name + ":name " + value + " : value");
    console.log(form);

    setForm({
      ...form,
      [name]: value,
    });
  };

  // 이메일
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);
    console.log(form);

    if (!emailRegex.test(e.target.value)) {
      setEmailMessage("이메일 형식이 틀렸습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다 :)");
      setIsPassword(true);
    }
  };

  // 이름
  const onChangeStoreName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setStoreNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsStoreName(false);
    } else {
      setStoreNameMessage("올바른 이름 형식입니다 :)");
      setIsStoreName(true);
    }
  };

  const onCancleSignup = () => {
    if (window.confirm("회원가입을 취소하시겠습니까?")) {
      navigate("/login");
    }
  };

  const onSubmitForm = () => {
    if (email == "") window.alert("이메일을 입력해주세요");
    else if (password == "") window.alert("비밀번호를 입력해주세요");
    else if (storeName == "") window.alert("가게명을 입력해주세요");
    else {
      SignupApi({ email, password, storeName, navigate });
    }
  };

  return (
    <SignupView
      email={email}
      password={password}
      storeName={storeName}
      storeNameMessage={storeNameMessage}
      emailMessage={emailMessage}
      passwordMessage={passwordMessage}
      isEmail={isEmail}
      isPassword={isPassword}
      isStoreName={isStoreName}
      onCancleSignup={onCancleSignup}
      onSubmitForm={onSubmitForm}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangeStoreName={onChangeStoreName}
    ></SignupView>
  );
};
export default Signup;
