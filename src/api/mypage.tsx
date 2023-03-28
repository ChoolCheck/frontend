import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/mypageType";
import { LogoutApi } from "./auth";

export async function GetUserInfoApi({ setUserInfo }: type.setUserInfoProps) {
  await axios({
    method: "GET",
    url: `${config.api}/user`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setUserInfo(res.data);
    })
    .catch((err) => {});
}

export async function UpdateUserInfoApi({
  storeName,
  navigate,
}: type.updateUserInfoProps) {
  await axios({
    method: "Patch",
    url: `${config.api}/user`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { storeName: storeName },
  })
    .then((res) => {
      navigate("/mypage");
    })
    .catch((err) => {});
}

export async function UpdatePasswordApi({
  password,
  mailToken,
  navigate,
}: type.updatePasswordProps) {
  await axios({
    method: "Patch",
    url: `${config.api}/user/password`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${mailToken}`,
    },
    //헤더 메일에서 받은 토큰으로 수정
    data: { password: password },
  })
    .then((res) => {
      window.alert("비밀번호가 수정되었습니다.");
      navigate("/mypage");
    })
    .catch((err) => {
      navigate("/mypage");
    });
}

export async function SendEmailApi({ navigate }: type.sendEmailProps) {
  await axios({
    method: "POST",
    url: `${config.api}/user/password`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      window.alert("메일이 전송되었습니다. 메일함을 확인해주세요.");
      navigate("/mypage");
    })
    .catch((err) => {});
}

export async function DeleteUserApi({ navigate }: type.sendEmailProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/user`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      window.alert("탈퇴가 완료되었습니다.");
      LogoutApi({ navigate });
    })
    .catch((err) => {
      window.alert("탈퇴에 실패하였습니다. 로그인 후 다시 시도해주세요.");
    });
}
