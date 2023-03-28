import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/scheduleType";

export async function CreateScheduleApi({
  employeeId,
  hours_id,
  date,
  startTime,
  endTime,
  setWriteModal,
  setWeekScheduleList,
  setTotalScheduleList,
}: type.createScheduleProps) {
  let data;
  if (hours_id == "") {
    data = {
      employeeId: employeeId,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  } else {
    data = {
      employeeId: employeeId,
      hours_id: hours_id,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  }
  await axios({
    method: "POST",
    url: `${config.api}/schedule`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  })
    .then((res) => {
      GetWeekScheduleApi({ setWeekScheduleList });
      GetTotalScheduleApi({ setTotalScheduleList });
    })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {});
}

export async function UpdateScheduleApi({
  id,
  employeeId,
  hours_id,
  date,
  startTime,
  endTime,
  setWriteModal,
  setReadModal,
  setWeekScheduleList,
  setTotalScheduleList,
  setScheduleToShow,
}: type.updateScheduleProps) {
  let data;
  if (hours_id == "") {
    data = {
      employeeId: employeeId,
      date: date,
      startTime: startTime.substring(0, 5),
      endTime: endTime.substring(0, 5),
    };
  } else {
    data = {
      employeeId: employeeId,
      hours_id: hours_id,
      date: date,
      startTime: startTime.substring(0, 5),
      endTime: endTime.substring(0, 5),
    };
  }
  await axios({
    method: "Patch",
    url: `${config.api}/schedule/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  })
    .then((res) => {
      GetWeekScheduleApi({ setWeekScheduleList });
      GetTotalScheduleApi({ setTotalScheduleList, setScheduleToShow });
    })
    .then((res) => {
      setWriteModal(false);
      setReadModal(false);
    })
    .catch((err) => {
      window.alert("스케줄 수정에 실패했습니다.");
    });
}

export async function DeleteScheduleApi({
  id,
  setReadModal,
  setTotalScheduleList,
  setWeekScheduleList,
  setScheduleToShow,
}: type.deleteScheduleProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/schedule/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      GetWeekScheduleApi({ setWeekScheduleList });
      GetTotalScheduleApi({ setTotalScheduleList, setScheduleToShow });
    })

    .then((res) => {
      setReadModal(false);
    })
    .catch((err) => {});
}

export async function GetMonthScheduleApi({
  date,
}: type.getMonthScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule/month?date=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {});
}

export async function GetWeekScheduleApi({
  setWeekScheduleList,
}: type.getWeekScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule/week`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setWeekScheduleList(res.data);
    })
    .catch((err) => {});
}

export async function GetTotalScheduleApi({
  setTotalScheduleList,
  setScheduleToShow,
}: type.getTotalScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setScheduleToShow && setScheduleToShow(res.data);
      setTotalScheduleList(res.data);
    })
    .catch((err) => {});
}
//   const page = 1;
//   await axios({
//     method: "GET",
//     url: `${config.api}/schedule?page=${page}`,
//     headers: {
//       "Content-Type": `application/json`,
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   })
//     .then((res) => {
//       setScheduleToShow && setScheduleToShow(res.data);
//       setTotalScheduleList(res.data);
//     })
//     .catch((err) => {});
// }
export async function GetDetailScheduleApi({
  id,
  setScheduleDetail,
  setReadModal,
}: type.getDetailScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setScheduleDetail(res.data);
    })
    .then((res) => {
      setReadModal(true);
    })
    .catch((err) => {});
}

export async function GetEmployeeScheduleApi({
  employeeId,
  setScheduleToShow,
}: type.getEmployeeScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule/employee/${employeeId}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setScheduleToShow(res.data);
    })
    .catch((err) => {});
}
