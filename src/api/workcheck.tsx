import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/workcheckType";

const page = 0;

export async function CreateWorkcheckApi({
  employeeId,
  hoursId,
  date,
  startTime,
  endTime,
  setWriteModal,
  setTotalWorkCheckList,
  setTotalPages,
  setTotalElements,
}: type.createWorkcheckProps) {
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
    url: `${config.api}/work`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  })
    .then((res) => {
      GetTotalWorkcheckApi({
        setTotalWorkCheckList,
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

export async function UpdateWorkcheckApi({
  id,
  employeeId,
  hoursId,
  date,
  startTime,
  endTime,
  setWriteModal,
  setReadModal,
  setTotalWorkCheckList,
  setWorkcheckToShow,
  setTotalPages,
  setTotalElements,
}: type.updateWorkcheckProps) {
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
    url: `${config.api}/work/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  })
    .then((res) => {
      GetTotalWorkcheckApi({
        setTotalWorkCheckList,
        setWorkcheckToShow,
        setTotalPages,
        setTotalElements,
        page,
      });
    })
    .then((res) => {
      setWriteModal(false);
      setReadModal(false);
    })
    .catch((err) => {});
}

export async function DeleteWorkcheckApi({
  id,
  setReadModal,
  setTotalWorkCheckList,
  setWorkcheckToShow,
  setTotalPages,
  setTotalElements,
}: type.deleteWorkcheckProps) {
  await axios({
    method: "Delete",
    url: `${config.api}/work/${id}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      GetTotalWorkcheckApi({
        setTotalWorkCheckList,
        setWorkcheckToShow,
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
      setWorkcheckToShow(res.data);
    })
    .catch((err) => {});
}

export async function GetDateWorkcheckApi({
  startInput,
  endInput,
  setWorkcheckToShow,
}: type.getDateWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/date?dateFrom=${startInput}&dateTo=${endInput}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setWorkcheckToShow(res.data);
    })
    .catch((err) => {});
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
      setWorkcheckDetail(res.data);
    })
    .then((res) => {
      setReadModal(true);
    })
    .catch((err) => {});
}

export async function GetEmployeeWorkcheckApi({
  employeeId,
  setWorkcheckToShow,
}: type.getEmployeeWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work?employee=${employeeId}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setWorkcheckToShow(res.data);
    })
    .catch((err) => {});
}

export async function GetTotalWorkcheckApi({
  setTotalWorkCheckList,
  setWorkcheckToShow,
  setTotalPages,
  setTotalElements,
}: type.getTotalWorkcheckProps) {
  const now = new Date();

  const yearmonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-";

  const startInput = yearmonth + "01";
  const endInput =
    yearmonth + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  await axios({
    method: "GET",
    url: `${config.api}/work?dateFrom=${startInput}&dateTo=${endInput}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setTotalPages(res.data.pageable.totalPages);
      setTotalElements(res.data.pageable.setTotalElements);
      setWorkcheckToShow && setWorkcheckToShow(res.data.content);
      setTotalWorkCheckList(res.data.content);
    })
    .catch((err) => {});
}
