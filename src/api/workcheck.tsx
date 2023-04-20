import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/workcheckType";
import * as workcheckType from "../page/workCheck/type";
import { getTotalWorkTime } from "../components/common/TotalWorkTime";

export async function CreateWorkcheckApi({
  employeeId,
  hoursId,
  date,
  startTime,
  endTime,
  setWriteModal,
  setTotalWorkCheckList,
  setTotalPage,
  setTotalElement,
  setWorkcheckToShow,
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
      if (setWorkcheckToShow) {
        GetTotalWorkcheckApi({
          setTotalWorkCheckList,
          setTotalElement,
          setTotalPage,
          setWorkcheckToShow,
        });
      } else {
        GetTotalWorkcheckApi({
          setTotalWorkCheckList,
          setTotalPage,
          setTotalElement,
        });
      }
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
  setTotalPage,
  setTotalElement,
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

export async function DeleteWorkcheckApi({
  id,
  setReadModal,
  setTotalWorkCheckList,
  setWorkcheckToShow,
  setTotalPage,
  setTotalElement,
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
        setTotalPage,
        setTotalElement,
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
  setTotalPage,
  setTotalElement,
}: type.getDateWorkcheckProps) {
  await axios({
    method: "GET",
    url: `${config.api}/work/?dateFrom=${startInput}&dateTo=${endInput}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setTotalPage(res.data.totalPages);
      setTotalElement(res.data.setTotalElements);
      setWorkcheckToShow(res.data.content);
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
  startInput,
  endInput,
  employeeId,
  page,
  setWorkcheckToShow,
  setTotalPage,
  setTotalElement,
}: type.getEmployeeWorkcheckProps) {
  let url;
  if (page && startInput && endInput) {
    url = `${config.api}/work?employee=${employeeId}&dateFrom=${startInput}&dateTo=${endInput}&page=${page}`;
  } else if (startInput && endInput) {
    url = `${config.api}/work?employee=${employeeId}&dateFrom=${startInput}&dateTo=${endInput}`;
  } else if (page) {
    url = `${config.api}/work?employee=${employeeId}&page=${page}`;
  } else url = `${config.api}/work?employee=${employeeId}`;

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
      setWorkcheckToShow(res.data.content);
    })
    .catch((err) => {});
}

export async function GetTotalWorkcheckApi({
  setTotalWorkCheckList,
  setWorkcheckToShow,
  setTotalPage,
  setTotalElement,
  page,
  startInput,
  endInput,
}: type.getTotalWorkcheckProps) {
  const now = new Date();

  const yearmonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-";

  const monthStart = yearmonth + "01";
  const monthEnd =
    yearmonth + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  let url;
  if (page && startInput && endInput)
    url = `${config.api}/work?dateFrom=${startInput}&dateTo=${endInput}&page=${page}`;
  else if (startInput && endInput) {
    url = `${config.api}/work?dateFrom=${startInput}&dateTo=${endInput}`;
  } else if (page) {
    url = `${config.api}/work?dateFrom=${monthStart}&dateTo=${monthEnd}&page=${page}`;
  } else {
    url = `${config.api}/work?dateFrom=${monthStart}&dateTo=${monthEnd}&page=${page}`;
  }

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
      setWorkcheckToShow && setWorkcheckToShow(res.data.content);
      setTotalWorkCheckList(res.data.content);
    })
    .catch((err) => {});
}

export async function GetExcelDataApi({
  startTime,
  endTime,
  setExcelData,
}: type.getExcelDataProps) {
  let url = `${
    config.api
  }/work?dateFrom=${startTime}&dateTo=${endTime}&size=${1000}`;

  await axios({
    method: "GET",
    url: url,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (res.data.content.length == 0) {
        window.alert("해당 날짜에 출근부 데이터가 없습니다.");
      } else {
        const resList: Array<workcheckType.workcheckObjProps> =
          res.data.content;
        const newData: Array<workcheckType.excelDataProps> = [];

        for (let i = 0; i < resList.length; i++) {
          newData.push({
            date: resList[i].date,
            name: resList[i].name,
            time:
              resList[i].startTime.substring(0, 5) +
              "-" +
              resList[i].endTime.substring(0, 5),
            workType: resList[i].hours ? resList[i].hours : "없음",
            totalWorkTime: getTotalWorkTime(
              resList[i].startTime,
              resList[i].endTime
            ).toString(),
          });
        }
        setExcelData(newData);
      }
    })
    .catch((err) => {});
}

export async function integratedWorkcheckRender({
  setTotalWorkCheckList,
  setTotalElement,
  setTotalPage,
  setEmployeeList,
}: type.integratedWorkcheckRenderProps) {
  const now = new Date();

  const yearmonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-";

  const monthStart = yearmonth + "01";
  const monthEnd =
    yearmonth + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  axios({
    method: "Get",
    url: `${config.api}/employee`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setEmployeeList(res.data);
    })
    .then((res) => {
      axios({
        method: "GET",
        url: `${config.api}/work?dateFrom=${monthStart}&dateTo=${monthEnd}`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        setTotalPage(res.data.totalPages);
        setTotalElement(res.data.setTotalElements);
        setTotalWorkCheckList(res.data.content);
      });
    });
}
