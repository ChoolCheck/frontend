import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/calendarType";
import * as scheduleType from "./type/scheduleType";
import * as workcheckType from "./type/workType";
import * as enumType from "../commonType/enum";

import { GetDateMemoApi } from "./memo";

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
  return true;
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
  return true;
}

export async function GetTotalCalendarApi({
  date,
  setCalendarTotalList,
  renderData,
}: type.getTotalCalendarProps) {
  const inputDate = new Date(date);

  const inputYear = inputDate.getFullYear();
  const inputMonth =
    inputDate.getMonth() + 1 < 10
      ? "0" + (inputDate.getMonth() + 1)
      : inputDate.getMonth() + 1;
  const inputStart = inputYear + "-" + inputMonth + "-01";

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tempResultList: type.calendarListType[] = [];

  axios
    .all([
      axiosInstance.get(`${config.api}/work/month?date=${inputStart}`),
      axiosInstance.get(`${config.api}/schedule/month?date=${inputStart}`),
    ])
    .then(
      axios.spread((res1, res2) => {
        const workcheckList: workcheckType.workcheckObjProps[] = res1.data;
        const scheduleList: scheduleType.scheduleObjProps[] = res2.data;

        if (handleWorklist(workcheckList, tempResultList))
          handleSchedulelist(scheduleList, tempResultList);

        return tempResultList;
      })
    )
    .then((res) => {
      setCalendarTotalList(tempResultList);
    })
    .then((res) => {
      renderData(tempResultList);
    })
    .catch((error) => {});
}

export async function GetDetailCalendarApi({
  setDetailModalOpen,
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
            totalWorkTime:
              Math.round(
                ((new Date(
                  scheduleDetailList[i].date +
                    "T" +
                    scheduleDetailList[i].endTime
                ).getTime() -
                  new Date(
                    scheduleDetailList[i].date +
                      "T" +
                      scheduleDetailList[i].startTime
                  ).getTime()) /
                  1000 /
                  60 /
                  60) *
                  10
              ) / 10,
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
            totalWorkTime:
              Math.round(
                ((new Date(
                  workcheckDetailList[i].date +
                    "T" +
                    workcheckDetailList[i].endTime.substring(0, 5)
                ).getTime() -
                  new Date(
                    workcheckDetailList[i].date +
                      "T" +
                      workcheckDetailList[i].startTime.substring(0, 5)
                  ).getTime()) /
                  1000 /
                  60 /
                  60) *
                  10
              ) / 10,
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
      setDetailModalOpen(true);
    })
    .catch((error) => {});
}
