import axios from "axios";
import { config } from "../static/config";
import * as type from "./manageType";
import { roleInfo } from "../static/role";

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
  role,
  color,
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
  role,
  color,
  setWriteModal,
  setEmployeeList,
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
      let newEmployeeList = res.data;
      for (let i = 0; i < newEmployeeList.length; i++) {
        if (newEmployeeList[i].role == roleInfo[0].roleName) {
          newEmployeeList[i].role = roleInfo[0].roleValue;
        } else if (newEmployeeList[i].role == roleInfo[1].roleName) {
          newEmployeeList[i].role = roleInfo[1].roleValue;
        } else newEmployeeList[i].role = roleInfo[2].roleValue;
      }
      return newEmployeeList;
    })
    .then((res) => {
      setEmployeeList(res);
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
      let newEmployeeDetail = res.data;
      if (newEmployeeDetail.role == roleInfo[0].roleName) {
        newEmployeeDetail.role = roleInfo[0].roleValue;
      } else if (newEmployeeDetail.role == roleInfo[1].roleName) {
        newEmployeeDetail.role = roleInfo[1].roleValue;
      } else newEmployeeDetail.role = roleInfo[2].roleValue;

      return newEmployeeDetail;
    })
    .then((res) => {
      setEmployeeDetail(res);
      return true;
    })
    .then((res) => {
      setReadModal(res);
    })
    .catch((err) => {
      window.alert("직원 상세 조회에 실패했습니다.");
    });
}
