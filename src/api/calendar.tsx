import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/calendarType";
import * as scheduleType from "./type/scheduleType";
import * as workcheckType from "./type/workcheckType";
import * as enumType from "../commonType/enum";

import { GetDateMemoApi, GetMemoFlagApi } from "./memo";

export function getTotalworktime(
  scheduleDetail?: scheduleType.scheduleObjProps,
  workcheckDetail?: workcheckType.workcheckObjProps
) {
  let detailObj;
  if (scheduleDetail) detailObj = scheduleDetail;
  else detailObj = workcheckDetail;

  if (detailObj) {
    const timeDifference =
      Math.round(
        ((new Date(detailObj.date + "T" + detailObj.endTime).getTime() -
          new Date(detailObj.date + "T" + detailObj.startTime).getTime()) /
          3600000) *
          10
      ) / 10;
    return timeDifference < 0 ? timeDifference + 24 : timeDifference;
  } else return 0;
}
export function handleSchedulelist(
  scheduleList: scheduleType.scheduleObjProps[],
  tempResultList: type.calendarListType[]
) {
  for (let i = 0; i < scheduleList.length; i++) {
    const data: type.calendarListType = {
      title: (
        scheduleList[i].name +
        " " +
        scheduleList[i].startTime.substring(0, 5) +
        "-" +
        scheduleList[i].endTime.substring(0, 5)
      ).toString(),
      date: scheduleList[i].date,
      textColor: "black",
      backgroundColor: `#${
        enumType.enumColor[
          scheduleList[i].color as keyof typeof enumType.enumColor
        ]
      }`,
    };
    tempResultList.push(data);
  }
}
export function handleWorklist(
  workcheckList: workcheckType.workcheckObjProps[],
  tempResultList: type.calendarListType[]
) {
  for (let i = 0; i < workcheckList.length; i++) {
    const data: type.calendarListType = {
      title: (
        workcheckList[i].name +
        " " +
        workcheckList[i].startTime.substring(0, 5) +
        "-" +
        workcheckList[i].endTime.substring(0, 5)
      ).toString(),
      date: workcheckList[i].date,
      textColor: "#727272",
      backgroundColor: `#${
        enumType.enumColor[
          workcheckList[i].color as keyof typeof enumType.enumColor
        ]
      }`,
    };
    tempResultList.push(data);
  }
}

export async function GetTotalCalendarApi({
  date,
  setCalendarlist,
  setMemoFlaglist,
}: type.getTotalCalendarProps) {
  const inputDate = new Date(date);

  const inputYear = inputDate.getFullYear();
  const inputMonth =
    inputDate.getMonth() + 1 < 10
      ? "0" + (inputDate.getMonth() + 1)
      : inputDate.getMonth() + 1;
  const inputStart = inputYear + "-" + inputMonth + "-01";

  const tempResultList: type.calendarListType[] = [];

  axios({
    method: "Get",
    url: `${config.api}/work/month?date=${inputStart}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      const workcheckList: workcheckType.workcheckObjProps[] = res.data;
      handleWorklist(workcheckList, tempResultList);
    })
    .then((res) => {
      axios({
        method: "GET",
        url: `${config.api}/schedule/month?date=${inputStart}`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const scheduleList: scheduleType.scheduleObjProps[] = res.data;
          handleSchedulelist(scheduleList, tempResultList);
          return tempResultList;
        })
        .then((res) => {
          setCalendarlist(tempResultList);
          GetMemoFlagApi({ month: inputStart, setMemoFlaglist });
        });
    });
}

export async function GetDetailCalendarApi({
  onModalOpen,
  date,
  setCalendarDetailScheduleList,
  setCalendarDetailWorkcheckList,
  setMemo,
}: type.getDetailCalendarProps) {
  GetDateMemoApi({ date, setMemo });

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const tempScheduleList: type.calendarDetailType[] = [];
  const tempWorkcheckList: type.calendarDetailType[] = [];

  axios
    .all([
      axiosInstance.get(
        `${config.api}/schedule?dateFrom=${date}&dateTo=${date}`
      ),
      axiosInstance.get(`${config.api}/work?dateFrom=${date}&dateTo=${date}`),
    ])
    .then(
      axios.spread((res1, res2) => {
        const scheduleDetailList: scheduleType.scheduleObjProps[] =
          res1.data.content;
        const workcheckDetailList: workcheckType.workcheckObjProps[] =
          res2.data.content;

        for (let i = 0; i < scheduleDetailList.length; i++) {
          const data: type.calendarDetailType = {
            name: scheduleDetailList[i].name,
            time: (
              scheduleDetailList[i].startTime.substring(0, 5) +
              "-" +
              scheduleDetailList[i].endTime.substring(0, 5)
            ).toString(),
            backgroundColor: `#${
              enumType.enumColor[
                scheduleDetailList[i].color as keyof typeof enumType.enumColor
              ]
            }`,
            totalWorkTime: getTotalworktime(scheduleDetailList[i]),
            workType: scheduleDetailList[i].hours
              ? scheduleDetailList[i].hours
              : null,
          };
          tempScheduleList.push(data);
        }
        for (let i = 0; i < workcheckDetailList.length; i++) {
          const data: type.calendarDetailType = {
            name: workcheckDetailList[i].name,
            time: (
              workcheckDetailList[i].startTime.substring(0, 5) +
              "-" +
              workcheckDetailList[i].endTime.substring(0, 5)
            ).toString(),
            backgroundColor: `#${
              enumType.enumColor[
                workcheckDetailList[i].color as keyof typeof enumType.enumColor
              ]
            }`,
            totalWorkTime: getTotalworktime(workcheckDetailList[i]),
            workType: workcheckDetailList[i].hours
              ? workcheckDetailList[i].hours
              : null,
          };
          tempWorkcheckList.push(data);
        }
      })
    )
    .then((res) => {
      setCalendarDetailScheduleList(tempScheduleList);
      setCalendarDetailWorkcheckList(tempWorkcheckList);
    })
    .then((res) => {
      onModalOpen();
    })
    .catch((error) => {});
}
