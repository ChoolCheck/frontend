import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/calendarType";
import * as scheduleType from "./type/scheduleType";
import * as workcheckType from "./type/workType";
import * as enumType from "../commonType/enum";

import { GetDateMemoApi } from "./memo";
import { isTypedArray } from "util/types";

export async function GetTotalCalendarApi({
  calendarTotalList,
  setCalendarTotalList,
}: type.getTotalCalendarProps) {
  const date = new Date();
  const today =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();

  const monthStart = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 1;

  const lastDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const monthEnd = lastDate.getDate();

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tempScheduleList: type.calendarListType[] = [];

  axios
    .all([
      axiosInstance.get(
        `${config.api}/schedule/date?start=${today}&end=${monthEnd}`
      ),
      axiosInstance.get(
        `${config.api}/work/date?start=${monthStart}&end=${today}`
      ),
    ])
    .then(
      axios.spread((res1, res2) => {
        console.log(res1.data);
        console.log(res2.data);

        const scheduleList: scheduleType.scheduleObjProps[] = res1.data;
        const workcheckList: workcheckType.workcheckObjProps[] = res2.data;

        for (let i = 0; i < scheduleList.length; i++) {
          const data: type.calendarListType = {
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
          };
          tempScheduleList.push(data);
        }
        for (let i = 0; i < workcheckList.length; i++) {
          const data: type.calendarListType = {
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
          };
          tempScheduleList.push(data);
        }
        return tempScheduleList;
      })
    )
    .then((res) => {
      setCalendarTotalList(tempScheduleList);
    })
    .catch((error) => {});
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
