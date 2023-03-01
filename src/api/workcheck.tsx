import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/workType";

export async function CreateWorkcheckApi({
  employeeId,
  hours_id,
  date,
  startTime,
  endTime,
  setWriteModal,
  setTotalWorkCheckList,
}: type.createWorkcheckProps) {
  let data;
  if (hours_id == "") {
    data = {
      employee_id: employeeId,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  } else {
    data = {
      employee_id: employeeId,
      hours_id: hours_id,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  }
  await axios({
    method: "POST",
    url: `${config.api}/work`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  })
    .then((res) => {
      GetTotalWorkcheckApi({ setTotalWorkCheckList });
    })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {
      window.alert("출근부 추가에 실패했습니다.");
    });
}

export async function UpdateWorkcheckApi({
  id,
  employeeId,
  hours_id,
  date,
  startTime,
  endTime,
}: type.updateWorkcheckProps) {
  await axios({
    method: "Patch",
    url: `${config.api}/work/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      employee_id: employeeId,
      hours_id: hours_id,
      date: date,
      startTime: startTime,
      endTime: endTime,
    },
  })
    .then((res) => {})
    .then((res) => {})
    .catch((err) => {
      window.alert("출근부 수정에 실패했습니다.");
    });
}

export async function DeleteWorkcheckApi({ id }: type.deleteWorkcheckProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/work/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("출근부 삭제에 실패했습니다.");
    });
}

export async function GetMonthWorkcheckApi({
  date,
  setWorkcheckToShow,
}: type.getMonthWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/month?date=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setWorkcheckToShow(res.data);
    })
    .catch((err) => {
      window.alert("월별 출근부 조회에 실패했습니다.");
    });
}
export async function GetDateWorkcheckApi({
  startInput,
  endInput,
  setWorkcheckToShow,
}: type.getDateWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/month?start=${startInput}&end=${endInput}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setWorkcheckToShow(res.data);
    })
    .catch((err) => {
      window.alert("월별 출근부 조회에 실패했습니다.");
    });
}

export async function GetDetailWorkcheckApi({
  id,
  setWorkcheckDetail,
  setReadModal,
}: type.getDetailWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setWorkcheckDetail(res.data);
    })
    .then((res) => {
      setReadModal(true);
    })
    .catch((err) => {
      window.alert("출근부 상세 조회에 실패했습니다.");
    });
}

export async function GetEmployeeWorkcheckApi({
  employee_id,
  setWorkcheckToShow,
}: type.getEmployeeWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/employee/${employee_id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setWorkcheckToShow(res.data);
    })
    .catch((err) => {
      window.alert("직원별 출근부 조회에 실패했습니다.");
    });
}

export async function GetTotalWorkcheckApi({
  setTotalWorkCheckList,
}: type.getTotalWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schdule`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setTotalWorkCheckList(res.data);
    })
    .catch((err) => {
      window.alert("출근부 전체 조회에 실패했습니다.");
    });
}
