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
    .catch((err) => {});
}

export async function GetWorktypeApi({
  setWorkTypeList,
  hours,
  setHoursid,
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
      const workTypeList: {
        id: string;
        title: string;
        startTime: string;
        endTime: string;
      }[] = res.data;
      setWorkTypeList(res.data);

      for (let i = 0; i < workTypeList.length; i++) {
        if (workTypeList[i].title == hours && setHoursid) {
          setHoursid(workTypeList[i].id);
        }
      }
    })
    .catch((err) => {});
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
    .catch((err) => {});
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
    .catch((err) => {});
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
    })
    .catch((err) => {});
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
    .catch((err) => {});
}
export async function GetEmployeeApi({
  setEmployeeList,
  employee,
  setEmployeeId,
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
      const employeeList: {
        id: string;
        name: string;
        role: string;
        color: string;
      }[] = res.data;
      setEmployeeList(res.data);

      for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].name == employee && setEmployeeId) {
          setEmployeeId(employeeList[i].id);
        }
      }
    })

    .catch((err) => {});
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
    .catch((err) => {});
}
