import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/memoType";

export async function CreateMemoApi({
  date,
  content,
  setWriteModal,
}: type.createMemoProps) {
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
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {});
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
    .catch((err) => {});
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
    .catch((err) => {});
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
    .catch((err) => {});
}

export async function GetDateMemoApi({ date, setMemo }: type.getDateMemoProps) {
  await axios({
    method: "GET",
    url: `${config.api}/memo?date=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setMemo(res.data[0]);
    })
    .catch((err) => {});
}
