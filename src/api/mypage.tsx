import axios from "axios";
import { config } from "../static/config";
import * as type from "./mypageType";

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
    .catch((err) => {
      window.alert("사용자 정보 조회에 실패했습니다.");
    });
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
    .catch((err) => {
      window.alert("사용자 정보 조회에 실패했습니다.");
    });
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
      window.alert(
        "비밀번호가 초기화되었습니다. 서비스 이용을 위해서는 로그인이 필요합니다."
      );
      navigate("/login");
    })
    .catch((err) => {
      window.alert("비밀번호 수정에 실패했습니다.");
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
      navigate("/updateUserInfo");
    })
    .catch((err) => {
      window.alert("메일 전송에 실패했습니다.");
    });
}
