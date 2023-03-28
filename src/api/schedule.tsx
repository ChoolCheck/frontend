import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/scheduleType";

export async function CreateScheduleApi({
  employeeId,
  hoursId,
  date,
  startTime,
  endTime,
  setWriteModal,
  setWeekScheduleList,
  setTotalScheduleList,
  setTotalPages,
  setTotalElements,
}: type.createScheduleProps) {
  let data;
  if (hoursId == "") {
    data = {
      employeeId: employeeId,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  } else {
    data = {
      employeeId: employeeId,
      hoursId: hoursId,
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
      const page = 0;
      GetTotalScheduleApi({
        setTotalScheduleList,
        setTotalPages,
        setTotalElements,
        page,
      });
    })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {});
}

export async function UpdateScheduleApi({
  id,
  employeeId,
  hoursId,
  date,
  startTime,
  endTime,
  setWriteModal,
  setReadModal,
  setWeekScheduleList,
  setTotalScheduleList,
  setScheduleToShow,
  setTotalPages,
  setTotalElements,
}: type.updateScheduleProps) {
  let data;
  if (hoursId == "") {
    data = {
      employeeId: employeeId,
      date: date,
      startTime: startTime.substring(0, 5),
      endTime: endTime.substring(0, 5),
    };
  } else {
    data = {
      employeeId: employeeId,
      hoursId: hoursId,
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
      const page = 0;
      GetTotalScheduleApi({
        setTotalScheduleList,
        setScheduleToShow,
        setTotalPages,
        setTotalElements,
        page,
      });
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
  setTotalPages,
  setTotalElements,
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
      const page = 0;
      GetTotalScheduleApi({
        setTotalScheduleList,
        setScheduleToShow,
        setTotalPages,
        setTotalElements,
        page,
      });
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
  setTotalPages,
  setTotalElements,
  page,
}: type.getTotalScheduleProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule?page=${page}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setTotalPages(res.data.pageable.totalPages);
      setTotalElements(res.data.pageable.setTotalElements);
      setScheduleToShow && setScheduleToShow(res.data.content);
      setTotalScheduleList(res.data.content);
    })
    .catch((err) => {});
}

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
