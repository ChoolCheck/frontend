import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/memoType";

export async function GetMemoFlagApi({
  date,
  setMemoFlaglist,
}: type.getMemoFlagProps) {
  axios({
    method: "GET",
    url: `${config.api}/memo/month?date=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    setMemoFlaglist(res.data);
  });
}

export async function CreateMemoApi({
  date,
  content,
  setWriteModal,
  setMemoFlaglist,
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
      let inputDate = date.substring(0, 8) + "01";

      GetMemoFlagApi({ date: inputDate, setMemoFlaglist });
    })
    .then((res) => {
      setWriteModal(false);
    });
}

export async function UpdateMemoApi({
  id,
  date,
  content,
  setWriteModal,
  setMemoDetail,
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
    .then((res) => {
      GetDetailMemoApi({ id, setMemoDetail });
    })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {});
}

export async function DeleteMemoApi({
  id,
  setReadModal,
}: type.deleteMemoProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/memo/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setReadModal(false);
    })
    .catch((err) => {});
}

export async function GetDetailMemoApi({
  id,
  setMemoDetail,
}: type.getDetailMemoProps) {
  await axios({
    method: "GET",
    url: `${config.api}/memo/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setMemoDetail(res.data);
    })
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
      setMemo(res.data);
    })
    .catch((err) => {});
}
