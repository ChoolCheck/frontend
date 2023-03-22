import React, { useState } from "react";
import LoginView from "./LoginView";
import { LoginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitForm = () => {
    if (email == "") window.alert("이메일을 입력해주세요");
    else if (password == "") window.alert("비밀번호를 입력해주세요");
    else {
      // localStorage.setItem("token", "dkanrjsksnfmsrjek");
      // navigate("/calendar");
      LoginApi({ email, password, navigate });
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      onChangeForm={onChangeForm}
      onSubmitForm={onSubmitForm}
    ></LoginView>
  );
};
export default Login;
