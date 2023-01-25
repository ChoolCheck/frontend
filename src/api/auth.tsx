import axios from "axios";
import { config } from "../static/config";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as type from "./type";

export async function LoginApi({
  email,
  password,
  navigate,
}: type.apiLoginProps) {
  await axios({
    method: "POST",
    url: `${config.api}/login`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: { email: email, password: password },
  })
    .then((res) => {
      localStorage.setItem("token", "dkanrjsksnfmsrjek");
      // localStorage.setItem("access_token", res.data.token);
      navigate("/calendar");
    })
    .catch((err) => {
      window.alert("로그인에 실패했습니다.");
      navigate("/auth");
    });
}

export async function SignupApi({
  email,
  password,
  storeName,
  navigate,
}: type.apiSignupProps) {
  await axios({
    method: "POST",
    url: `${config.api}/signup`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: { email: email, password: password, storeName },
  })
    .then((res) => {
      window.alert("회원가입이 완료되었습니다.");
      navigate("/login");
    })
    .catch((err) => {
      window.alert("회원가입에 실패했습니다.");
      console.log(err);
    });
}

export async function LogoutApi(navigate: NavigateFunction) {
  console.log("로그아웃");

  // await axios({
  //   method: "Get",
  //   url: `${config.api}/signup`,
  //   headers: {
  //     "Content-Type": `application/json`,
  //   },
  // })
  //   .then((res) => {
  //     window.alert("로그아웃 되었습니다.");
  //     navigate("/login");
  //   })
  //   .catch((err) => {
  //     window.alert("로그아웃에 실패했습니다.");
  //     console.log(err);
  //   });
}

export async function IsTokenExpiredApi(navigate: NavigateFunction) {
  const token = localStorage.getItem("token");
  if (token == undefined || token == null) {
    console.log("토큰이 만료되었습니다. 다시 로그인해주세요.");
    navigate("/login");
    return false;
  }
  return true;
}
