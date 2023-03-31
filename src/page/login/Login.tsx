import React, { useState } from "react";
import LoginView from "./LoginView";
import { LoginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

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
    else if (!emailRegex.test(email))
      window.alert("이메일 형식을 확인해주세요");
    else {
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
