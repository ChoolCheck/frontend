import axios from "axios";
import { config } from "../static/config";
import * as type from "./manageType";

export async function CreateWorktype({
  worktypeForm,
  setWriteModal,
}: type.createWorktypeProps) {
  console.log(worktypeForm);
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
      setWriteModal(false);
    })
    .catch((err) => {
      window.alert("근무 추가에 실패했습니다.");
    });
}

export async function GetWorktype({ setWorkTypeList }: type.getWorktypeProps) {
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

export async function CreateEmployee({
  employeeForm,
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
      name: employeeForm.name,
      role: employeeForm.role,
      color: employeeForm.color,
    },
  })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {
      window.alert("직원 추가에 실패했습니다.");
    });
}
