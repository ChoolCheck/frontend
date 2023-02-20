import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/manageType";

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
      console.log(res.data);
      setWorkTypeList(res.data);
    })
    .catch((err) => {
      window.alert("근무 형태 조회에 실패했습니다.");
    });
}

export async function DeleteWorktypeApi({
  workTypeList,
  setWorkTypeList,
  id,
}: type.deleteWorktypeProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/hours/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      return workTypeList?.filter((item) => item.id !== id);
    })
    .then((res) => {
      setWorkTypeList(res);
    })
    .catch((err) => {
      window.alert("근무 삭제에 실패했습니다.");
    });
}

export async function CreateEmployeeApi({
  name,
  color,
  role,
  setWriteModal,
  setEmployeeList,
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
      GetEmployeeApi({ setEmployeeList });
    })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {
      window.alert("직원 추가에 실패했습니다.");
    });
}

export async function UpdateEmployeeApi({
  id,
  name,
  color,
  role,
  setWriteModal,
  setEmployeeList,
  setReadModal,
}: type.updateEmployeeProps) {
  await axios({
    method: "Patch",
    url: `${config.api}/employee/${id}`,
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
      GetEmployeeApi({ setEmployeeList });
    })
    .then((res) => {
      setWriteModal(false);
      setReadModal(false);
    })
    .catch((err) => {
      window.alert("직원 수정에 실패했습니다.");
    });
}

export async function DeleteEmployeeApi({
  setReadModal,
  employeeList,
  setEmployeeList,
  id,
}: type.deleteEmployeeProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/employee/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      return employeeList?.filter((item) => item.id !== id);
    })
    .then((res) => {
      setEmployeeList(res);
      return true;
    })
    .then((res) => {
      setReadModal(false);
    })
    .catch((err) => {
      window.alert("직원 삭제에 실패했습니다.");
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
      window.alert("직원 조회에 실패했습니다.");
    });
}

export async function GetEmployeeDetailApi({
  setEmployeeDetail,
  setReadModal,
  id,
}: type.getEmployeeDetailProps) {
  await axios({
    method: "GET",
    url: `${config.api}/employee/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setEmployeeDetail(res.data);
      return true;
    })
    .then((res) => {
      setReadModal(res);
    })
    .catch((err) => {
      window.alert("직원 상세 조회에 실패했습니다.");
    });
}
