import axios from "axios";
import { config } from "../static/config";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as type from "./authType";

export async function LoginApi({
  email,
  password,
  navigate,
}: type.apiLoginProps) {
  await axios({
    method: "POST",
    url: `${config.client}/user/login`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: { email: email, password: password },
  })
    .then((res) => {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
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
    method: "GET",
    url: `${config.client}/user/signup`,
    headers: {
      "Content-Type": `application/json`,
    },
  })
    .then((res) => {
      window.alert("회원가입이 get요청 성공");
    })
    .catch((err) => {
      window.alert("회원가입이 get요청 실패" + err);
    });
  // await axios({
  //   method: "POST",
  //   url: `${config.client}/user/signup`,
  //   headers: {
  //     "Content-Type": `application/json`,
  //   },
  //   data: { email: email, password: password, storeName },
  // })
  //   .then((res) => {
  //     window.alert("회원가입이 완료되었습니다.");
  //     navigate("/login");
  //   })
  //   .catch((err) => {
  //     window.alert("회원가입에 실패했습니다.");
  //     console.log(err);
  //   });
}

export async function LogoutApi({ navigate }: type.apiLogoutProps) {
  await axios({
    method: "Get",
    url: `${config.client}/user/logout`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      localStorage.removeItem("token");
      window.alert("로그아웃 되었습니다.");
      navigate("/login");
    })
    .catch((err) => {
      window.alert("로그아웃에 실패했습니다.");
      console.log(err);
    });
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
