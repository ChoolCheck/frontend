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
