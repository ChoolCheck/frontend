import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/authType";

export async function LoginApi({
  email,
  password,
  navigate,
}: type.apiLoginProps) {
  await axios({
    method: "POST",
    url: `${config.api}/user/login`,
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
      console.log(err);
      console.error(err);
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
    url: `${config.api}/user/signup`,
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

export async function LogoutApi({ navigate }: type.apiLogoutProps) {
  await axios({
    method: "Post",
    url: `${config.api}/user/logout`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      window.alert("로그아웃 되었습니다.");
      navigate("/login");
    })
    .catch((err) => {
      window.alert("로그아웃에 실패했습니다.");
      console.log(err);
    });
}
