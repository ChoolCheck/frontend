import React, { useState, useEffect } from "react";
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

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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
      SignupApi(form);
    }
  };

  return (
    <SignupView
      email={email}
      password={password}
      storeName={storeName}
      onCancleSignup={onCancleSignup}
      onChangeForm={onChangeForm}
      onSubmitForm={onSubmitForm}
    ></SignupView>
  );
};
export default Signup;
