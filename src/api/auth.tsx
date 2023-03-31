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
      if (res.data) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/calendar");
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
    });
}

export async function SignupApi({
  email,
  password,
  storeName,
  code,
  navigate,
}: type.apiSignupProps) {
  await axios({
    method: "POST",
    url: `${config.api}/user/signup`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: {
      email: email,
      password: password,
      storeName: storeName,
      code: code,
    },
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

export async function CertificateEmailApi({
  email,
  setEmailCertificated,
}: type.emailProps) {
  await axios({
    method: "POST",
    url: `${config.api}/user/email`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: {
      email: email,
    },
  })
    .then((res) => {
      window.alert(
        "입력하신 이메일 주소로 인증번호 메일이 전송되었습니다.\n전송된 메일을 확인하고 인증번호를 입력해주세요."
      );
      setEmailCertificated(true);
    })
    .catch((err) => {
      window.alert("인증 메일 전송에 실패하였습니다.");
      setEmailCertificated(false);
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
      localStorage.clear();
      navigate("/login");
    })
    .catch((err) => {
      window.alert("로그아웃에 실패했습니다.");
    });
}
