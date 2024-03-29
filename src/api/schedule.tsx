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
  setTotalPage,
  setTotalElement,
  setScheduleToShow,
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
      GetTotalScheduleApi({
        setTotalScheduleList,
        setTotalPage,
        setTotalElement,
        setScheduleToShow,
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
  setTotalPage,
  setTotalElement,
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
      GetTotalScheduleApi({
        setTotalScheduleList,
        setScheduleToShow,
        setTotalPage,
        setTotalElement,
      });
    })
    .then((res) => {
      setWriteModal(false);
      setReadModal(false);
    })
    .catch((err) => {});
}

export async function DeleteScheduleApi({
  id,
  setReadModal,
  setTotalScheduleList,
  setWeekScheduleList,
  setScheduleToShow,
  setTotalPage,
  setTotalElement,
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
      GetTotalScheduleApi({
        setTotalScheduleList,
        setScheduleToShow,
        setTotalPage,
        setTotalElement,
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
  });
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
  setTotalPage,
  setTotalElement,
  page,
}: type.getTotalScheduleProps) {
  await axios({
    method: "GET",
    url: page
      ? `${config.api}/schedule?page=${page}`
      : `${config.api}/schedule?page=${0}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setTotalPage(res.data.totalPages);
      setTotalElement(res.data.setTotalElements);
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
  setTotalPage,
  setTotalElement,
  page,
}: type.getEmployeeScheduleProps) {
  let url;
  if (page) {
    url = `${config.api}/schedule?employee=${employeeId}&page=${page}`;
  } else url = `${config.api}/schedule?employee=${employeeId}`;

  await axios({
    method: "GET",
    url: url,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setTotalPage(res.data.totalPages);
      setTotalElement(res.data.setTotalElements);
      setScheduleToShow(res.data.content);
    })
    .catch((err) => {});
}

export async function integratedScheduleRender({
  setWeekScheduleList,
  setTotalScheduleList,
  setTotalElement,
  setTotalPage,
  setEmployeeList,
}: type.integratedScheduleRenderProps) {
  const url1 = `${config.api}/schedule/week`;
  const url2 = `${config.api}/schedule?page=${0}`;
  const url3 = `${config.api}/employee`;

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  await axios({
    method: "Get",
    url: url1,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setWeekScheduleList(res.data);
      return true;
    })
    .then((res) => {
      axios.all([axiosInstance.get(url2), axiosInstance.get(url3)]).then(
        axios.spread((res1, res2) => {
          setTotalPage(res1.data.totalPages);
          setTotalElement(res1.data.setTotalElements);
          setTotalScheduleList(res1.data.content);

          setEmployeeList(res2.data);
        })
      );
    })
    .catch((error) => {});
}
