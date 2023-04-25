import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/statisticsType";
import * as enumType from "../commonType/enum";

export async function GetMonthStatisticsApi({
  start,
  end,
  setStatisticsList,
  setStatisticsData,
}: type.getMonthStatisticsProps) {
  let statisticsDataLabels: Array<string> = [];
  let statisticsDataColor: Array<string> = [];
  let statisticsDataContent: Array<number> = [];

  await axios({
    method: "GET",
    url: `${config.api}/statistics?dateFrom=${start}&dateTo=${end}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setStatisticsList(res.data);

      const resultList = res.data;

      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].totalTime != 0) {
          statisticsDataLabels.push(resultList[i].name);
          statisticsDataColor.push(
            `#${
              enumType.enumColor[
                resultList[i].color as keyof typeof enumType.enumColor
              ]
            }`
          );
          statisticsDataContent.push(resultList[i].totalTime);
        }
      }

      return {
        labels: statisticsDataLabels,
        datasets: [
          {
            axis: "y",
            data: statisticsDataContent,
            backgroundColor: statisticsDataColor,
            borderRadius: Number.MAX_VALUE,
            maxBarThickness: 20,
            borderSkipped: false,
          },
        ],
      };
    })
    .then((res) => {
      setStatisticsData(res);
    })
    .catch((err) => {});
}

export async function GetDateStatisticsApi({
  startInput,
  endInput,
  setStatisticsList,
  setStatisticsData,
}: type.getDateStatisticsProps) {
  let statisticsDataLabels: Array<string> = [];
  let statisticsDataColor: Array<string> = [];
  let statisticsDataContent: Array<number> = [];
  await axios({
    method: "GET",
    url: `${config.api}/statistics?dateFrom=${startInput}&dateTo=${endInput}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setStatisticsList(res.data);

      const resultList = res.data;

      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].totalTime != 0) {
          statisticsDataLabels.push(resultList[i].name);
          statisticsDataColor.push(
            `#${
              enumType.enumColor[
                resultList[i].color as keyof typeof enumType.enumColor
              ]
            }`
          );
          statisticsDataContent.push(resultList[i].totalTime);
        }
      }

      return {
        labels: statisticsDataLabels,
        datasets: [
          {
            axis: "y",
            data: statisticsDataContent,
            backgroundColor: statisticsDataColor,
            borderRadius: Number.MAX_VALUE,
            maxBarThickness: 20,
            borderSkipped: false,
          },
        ],
      };
    })
    .then((res) => {
      setStatisticsData(res);
    })
    .catch((err) => {});
}
