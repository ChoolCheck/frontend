import axios from "axios";
import { config } from "../static/config";
import * as type from "./manageType";

export async function CreateWorktypeApi({
  worktypeForm,
  setWriteModal,
  setWorkTypeList,
}: type.createWorktypeProps) {
  await axios({
    method: "POST",
    url: `${config.api}/hours`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      title: worktypeForm.title,
      startTime: worktypeForm.startTime,
      endTime: worktypeForm.endTime,
    },
  })
    .then((res) => {
      GetWorktypeApi({ setWorkTypeList });
    })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {
      window.alert("근무 추가에 실패했습니다.");
    });
}

export async function GetWorktypeApi({
  setWorkTypeList,
}: type.getWorktypeProps) {
  await axios({
    method: "GET",
    url: `${config.api}/hours`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setWorkTypeList(res.data);
    })
    .catch((err) => {
      window.alert("근무 형태 조회에 실패했습니다.");
    });
}

export async function CreateEmployeeApi({
  name,
  role,
  color,
  setWriteModal,
}: type.createEmployeeProps) {
  await axios({
    method: "POST",
    url: `${config.api}/employee`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      name: name,
      role: role,
      color: color,
    },
  })
    .then((res) => {
      setWriteModal(false);
      console.log(res);
    })
    .catch((err) => {
      window.alert("직원 추가에 실패했습니다.");
    });
}

export async function GetEmployeeApi({
  setEmployeeList,
}: type.getEmployeeProps) {
  await axios({
    method: "GET",
    url: `${config.api}/employee`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setEmployeeList(res.data);
    })
    .catch((err) => {
      window.alert("근무 형태 조회에 실패했습니다.");
    });
}
