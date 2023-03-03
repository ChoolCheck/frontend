import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/calendarType";
import * as scheduleType from "./type/scheduleType";
import * as workcheckType from "./type/workType";
import * as enumType from "../commonType/enum";

import { GetDateMemoApi } from "./memo";

export async function GetTotalCalendarApi({
  calendarTotalList,
  setCalendarTotalList,
}: type.getTotalCalendarProps) {
  await axios({
    method: "GET",
    url: `${config.api}/schedule`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);

      const scheduleList: scheduleType.scheduleObjProps[] = res.data;

      for (let i = 0; i < scheduleList.length; i++) {
        const data: type.calendarListType[] = [
          {
            title: (
              scheduleList[i].name +
              " " +
              scheduleList[i].startTime +
              "-" +
              scheduleList[i].endTime
            ).toString(),
            date: scheduleList[i].date,
            textColor: "black",
            backgroundColor: `#${
              enumType.enumColor[
                scheduleList[i].color as keyof typeof enumType.enumColor
              ]
            }`,
          },
        ];
        setCalendarTotalList(...(calendarTotalList as []), data);
      }
    })
    .catch((err) => {});

  await axios({
    method: "GET",
    url: `${config.api}/work`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);

      const workcheckList: workcheckType.workcheckObjProps[] = res.data;
      for (let i = 0; i < workcheckList.length; i++) {
        const data: type.calendarListType[] = [
          {
            title: (
              workcheckList[i].name +
              " " +
              workcheckList[i].startTime +
              "-" +
              workcheckList[i].endTime
            ).toString(),
            date: workcheckList[i].date,
            textColor: "#727272",
            backgroundColor: `#${
              enumType.enumColor[
                workcheckList[i].color as keyof typeof enumType.enumColor
              ]
            }`,
          },
        ];

        setCalendarTotalList(...(calendarTotalList as []), data);
      }
    })
    .catch((err) => {});
}

export async function GetDetailCalendarApi({
  setDetailModalOpen,
  date,
  calendarDetailScheduleList,
  calendarDetailWorkcheckList,
  setMemo,
}: type.getDetailCalendarProps) {
  GetDateMemoApi({ date, setMemo });

  await axios({
    method: "GET",
    url: `${config.api}/schedule/date?start=${date}&end=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);

      const scheduleDetailList: workcheckType.workcheckObjProps[] = res.data;

      for (let i = 0; i < scheduleDetailList.length; i++) {
        calendarDetailScheduleList?.push({
          name: scheduleDetailList[i].name,
          time: (
            scheduleDetailList[i].startTime +
            "-" +
            scheduleDetailList[i].endTime
          ).toString(),
          backgroundColor: `#${
            enumType.enumColor[
              scheduleDetailList[i].color as keyof typeof enumType.enumColor
            ]
          }`,
          totalWorkTime:
            Math.round(
              ((new Date(
                scheduleDetailList[i].date + "T" + scheduleDetailList[i].endTime
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
        });
      }
    })
    .then((res) => {
      console.log(calendarDetailWorkcheckList);
    })
    .catch((err) => {});
  // time : startTime+"-"+endTime

  await axios({
    method: "GET",
    url: `${config.api}/work/date?start=${date}&end=${date}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);

      const workcheckDetailList: workcheckType.workcheckObjProps[] = res.data;

      for (let i = 0; i < workcheckDetailList.length; i++) {
        calendarDetailWorkcheckList?.push({
          name: workcheckDetailList[i].name,
          time: (
            workcheckDetailList[i].startTime +
            "-" +
            workcheckDetailList[i].endTime
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
                  workcheckDetailList[i].endTime
              ).getTime() -
                new Date(
                  workcheckDetailList[i].date +
                    "T" +
                    workcheckDetailList[i].startTime
                ).getTime()) /
                1000 /
                60 /
                60) *
                10
            ) / 10,
          workType: workcheckDetailList[i].hours
            ? workcheckDetailList[i].hours
            : null,
        });
      }
    })
    .then((res) => {
      console.log(calendarDetailWorkcheckList);
      setDetailModalOpen(true);
    })
    .catch((err) => {});
}
