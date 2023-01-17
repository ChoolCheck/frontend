import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailCondition, setEmailCondition] = useState(false);
  const [passwordCondition, setPasswordCondition] = useState(false);

  const emailRegex = /[\w\-\.]+\@[\w\-\.]+[/.][\w\-\.]+/g;

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/hello`,
    })
      .then((res) => {
        console.log("성공" + res);
      })
      .catch((err) => {
        console.log("실패" + err);
      });
  }, []);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    emailRegex.test(e.target.value)
      ? setEmailCondition(true)
      : setEmailCondition(false);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    e.target.value.length >= 8
      ? setPasswordCondition(true)
      : setPasswordCondition(false);
  };

  //   const onSubmitButtonClick = () => {
  //     axios({
  //       method: "POST",
  //       url: `${config.api}/users/login`,
  //       headers: {
  //         "Content-Type": `application/json`,
  //       },
  //       data: {
  //         email: email,
  //         password: password,
  //       },
  //     })
  //       .then((res) => {
  //         localStorage.setItem("access_token", res.data.token);
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         window.alert("로그인에 실패했습니다.");
  //         navigate("/auth");
  //       });
  //   };

  return (
    <div className="Login-Top-Container">
      <div className="login inputContainer">
        <h1 className="Login-Header">Choolcheck</h1>
        <p>
          <span className="login EmailHeader">🧑🏻‍💻</span>
          <input
            className="login inputEmail"
            placeholder="이메일 입력해주세요"
            onChange={handleEmail}
          />
        </p>
        <p>
          <span className="login PasswordHeader">🔒</span>
          <input
            className="login inputPassword"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={handlePassword}
            type="password"
          />
        </p>
        <button type="button" className="loginButton">
          로그인
        </button>{" "}
        <button type="button" className="signupButton">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
