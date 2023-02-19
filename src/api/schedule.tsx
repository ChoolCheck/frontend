import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/scheduleType";

export async function CreateScheduleApi({
  employee_id,
  hours_id,
  date,
  startTime,
  endTime,
}: type.createScheduleProps) {
  await axios({
    method: "POST",
    url: `${config.api}/schdule`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      employee_id: employee_id,
      hours_id: hours_id,
      date: date,
      startTime: startTime,
      endTime: endTime,
    },
  })
    .then((res) => {})
    .then((res) => {})
    .catch((err) => {
      window.alert("스케줄 추가에 실패했습니다.");
    });
}

export async function UpdateScheduleApi({
  id,
  employee_id,
  hours_id,
  date,
  startTime,
  endTime,
}: type.updateScheduleProps) {
  await axios({
    method: "Patch",
    url: `${config.api}/schdule/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      employee_id: employee_id,
      hours_id: hours_id,
      date: date,
      startTime: startTime,
      endTime: endTime,
    },
  })
    .then((res) => {})
    .then((res) => {})
    .catch((err) => {
      window.alert("스케줄 수정에 실패했습니다.");
    });
}

export async function DeleteScheduleApi({ id }: type.deleteScheduleProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/schdule/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("스케줄 삭제에 실패했습니다.");
    });
}

export async function GetMonthScheduleApi({
  date,
}: type.getMonthScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schdule/month?date=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("월별 스케줄 조회에 실패했습니다.");
    });
}

export async function GetWeekScheduleApi({}: type.getWeekScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schdule/week`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("주별 스케줄 조회에 실패했습니다.");
    });
}
export async function GetDetailScheduleApi({
  id,
}: type.getDetailScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schdule/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("스케줄 상세 조회에 실패했습니다.");
    });
}

export async function GetEmployeeScheduleProps({
  employee_id,
}: type.getEmployeeScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schdule/employee/${employee_id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("직원별 스케줄 조회에 실패했습니다.");
    });
}

export async function GetTotalScheduleApi({}: type.getTotalScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schdule`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {
      window.alert("스케줄 전체 조회에 실패했습니다.");
    });
}
