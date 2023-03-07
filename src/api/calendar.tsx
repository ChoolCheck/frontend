import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/calendarType";
import * as scheduleType from "./type/scheduleType";
import * as workcheckType from "./type/workType";
import * as enumType from "../commonType/enum";

import { GetDateMemoApi } from "./memo";

export async function GetTotalCalendarApi({
  date,
  setCalendarTotalList,
}: type.getTotalCalendarProps) {
  const inputDate = new Date(date);
  const nowDate = new Date();

  const inputYear = inputDate.getFullYear();
  const inputMonth =
    inputDate.getMonth() + 1 < 10
      ? "0" + (inputDate.getMonth() + 1)
      : inputDate.getMonth() + 1;

  const inputStart = inputYear + "-" + inputMonth + "-01";

  const inputlastDATE = new Date(inputYear, inputDate.getMonth() + 1, 0);
  const inputEnd = inputYear + "-" + inputMonth + "-" + inputlastDATE.getDate();

  let scheduleStart, scheduleEnd, workcheckStart, workcheckEnd;

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tempResultList: type.calendarListType[] = [];

  // 보여줄 달력이 현재 달보다 이전인 경우 : 달력에 출근부만 표시
  if (
    inputDate.getFullYear() < nowDate.getFullYear() ||
    (inputDate.getFullYear() == nowDate.getFullYear() &&
      inputDate.getMonth() < nowDate.getMonth())
  ) {
    workcheckStart = inputStart;
    workcheckEnd = inputEnd;

    axios
      .all([
        axiosInstance.get(
          `${config.api}/work/date?start=${workcheckStart}&end=${workcheckEnd}`
        ),
      ])
      .then(
        axios.spread((res1) => {
          const workcheckList: workcheckType.workcheckObjProps[] = res1.data;

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
          return tempResultList;
        })
      )
      .then((res) => {
        setCalendarTotalList(tempResultList);
      })
      .catch((error) => {});
  }

  // 보여줄 달력이 현재 달보다 이후인 경우 : 달력에 스케줄만 표시
  else {
    // else if (
    //   inputDate.getFullYear() > nowDate.getFullYear() ||
    //   (inputDate.getFullYear() == nowDate.getFullYear() &&
    //     inputDate.getMonth() > nowDate.getMonth())
    // ) {
    scheduleStart = inputStart;
    scheduleEnd = inputEnd;
    axios
      .all([
        axiosInstance.get(
          `${config.api}/schedule/date?start=${scheduleStart}&end=${scheduleEnd}`
        ),
      ])
      .then(
        axios.spread((res1) => {
          console.log(res1.data);
          const scheduleList: scheduleType.scheduleObjProps[] = res1.data;

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
            tempResultList.push(data);
          }
          return tempResultList;
        })
      )
      .then((res) => {
        setCalendarTotalList(tempResultList);
      })
      .catch((error) => {});
  }
  // 보여줄 달력이 현재 달과 같은 경우 : 달력에 출근부와 스케줄 모두 표시
  // else if (
  //   inputDate.getFullYear() == nowDate.getFullYear() &&
  //   inputDate.getMonth() == nowDate.getMonth()
  // ) {
  //   const today =
  //     nowDate.getFullYear() +
  //     "-" +
  //     (nowDate.getMonth() + 1 < 10
  //       ? "0" + (nowDate.getMonth() + 1)
  //       : nowDate.getMonth() + 1) +
  //     "-" +
  //     (nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate());

  //   scheduleStart = today;
  //   scheduleEnd = inputEnd;
  //   workcheckStart = inputStart;
  //   workcheckEnd = today;

  //   axios
  //     .all([
  //       axiosInstance.get(
  //         `${config.api}/schedule/date?start=${scheduleStart}&end=${scheduleEnd}`
  //       ),
  //       axiosInstance.get(
  //         `${config.api}/work/date?start=${workcheckStart}&end=${workcheckEnd}`
  //       ),
  //     ])
  //     .then(
  //       axios.spread((res1, res2) => {
  //         console.log(res1.data);
  //         console.log(res2.data);

  //         const scheduleList: scheduleType.scheduleObjProps[] = res1.data;
  //         const workcheckList: workcheckType.workcheckObjProps[] = res2.data;

  //         for (let i = 0; i < scheduleList.length; i++) {
  //           const data: type.calendarListType = {
  //             title: (
  //               scheduleList[i].name +
  //               " " +
  //               scheduleList[i].startTime.substring(0, 5) +
  //               "-" +
  //               scheduleList[i].endTime.substring(0, 5)
  //             ).toString(),
  //             date: scheduleList[i].date,
  //             textColor: "black",
  //             backgroundColor: `#${
  //               enumType.enumColor[
  //                 scheduleList[i].color as keyof typeof enumType.enumColor
  //               ]
  //             }`,
  //           };
  //           tempResultList.push(data);
  //         }
  //         for (let i = 0; i < workcheckList.length; i++) {
  //           const data: type.calendarListType = {
  //             title: (
  //               workcheckList[i].name +
  //               " " +
  //               workcheckList[i].startTime.substring(0, 5) +
  //               "-" +
  //               workcheckList[i].endTime.substring(0, 5)
  //             ).toString(),
  //             date: workcheckList[i].date,
  //             textColor: "#727272",
  //             backgroundColor: `#${
  //               enumType.enumColor[
  //                 workcheckList[i].color as keyof typeof enumType.enumColor
  //               ]
  //             }`,
  //           };
  //           tempResultList.push(data);
  //         }
  //         return tempResultList;
  //       })
  //     )
  //     .then((res) => {
  //       console.log(tempResultList);
  //       setCalendarTotalList(tempResultList);
  //     })
  //     .catch((error) => {});
  // }
}

export async function GetDetailCalendarApi({
  setDetailModalOpen,
  date,
  setCalendarDetailScheduleList,
  setCalendarDetailWorkcheckList,
  setMemo,
}: type.getDetailCalendarProps) {
  GetDateMemoApi({ date, setMemo });

  const today = new Date();
  const inputDate = new Date(date);

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const tempScheduleList: type.calendarDetailType[] = [];
  const tempWorkcheckList: type.calendarDetailType[] = [];

  if (
    today.getFullYear() + today.getMonth() + today.getDate() ==
    inputDate.getFullYear() + inputDate.getMonth() + inputDate.getDate()
  ) {
  } else {
    axios
      .all([
        axiosInstance.get(
          `${config.api}/schedule/date?start=${date}&end=${date}`
        ),
        axiosInstance.get(`${config.api}/work/date?start=${date}&end=${date}`),
      ])
      .then(
        axios.spread((res1, res2) => {
          const scheduleDetailList: scheduleType.scheduleObjProps[] = res1.data;
          const workcheckDetailList: workcheckType.workcheckObjProps[] =
            res2.data;

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
                  workcheckDetailList[i]
                    .color as keyof typeof enumType.enumColor
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
}
