import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/memoType";

export async function CreateMemoApi({ date, content }: type.createMemoProps) {
  await axios({
    method: "POST",
    url: `${config.api}/memo`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      date: date,
      content: content,
    },
  })
    .then((res) => {})
    .then((res) => {})
    .catch((err) => {
      window.alert("메모 추가에 실패했습니다.");
    });
}

export async function UpdateMemoApi({
  id,
  date,
  content,
}: type.updateMemoProps) {
  await axios({
    method: "Patch",
    url: `${config.api}/memo/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      date: date,
      content: content,
    },
  })
    .then((res) => {})
    .then((res) => {})
    .catch((err) => {
      window.alert("메모 수정에 실패했습니다.");
    });
}

export async function DeleteMemoApi({ id }: type.deleteMemoProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/memo/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("메모 삭제에 실패했습니다.");
    });
}

export async function GetDetailMemoApi({ id }: type.getDetailMemoProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("메모 상세 조회에 실패했습니다.");
    });
}

export async function GetDateMemoProps({ date }: type.getDateMemoProps) {
  await axios({
    method: "GET",
    url: `${config.api}/memo?date=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("날짜별 메모 조회에 실패했습니다.");
    });
}
