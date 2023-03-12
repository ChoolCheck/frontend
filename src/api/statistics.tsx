import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/statisticsType";

export async function GetMonthStatisticsApi({
  start,
  end,
  setStatisticsList,
}: type.getMonthStatisticsProps) {
  await axios({
    method: "GET",
    url: `${config.api}/statistics?start=${start}&end=${end}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setStatisticsList(res.data);
    })
    .catch((err) => {});
}

export async function GetDateStatisticsApi({
  startInput,
  endInput,
  setStatisticsList,
}: type.getDateStatisticsProps) {
  await axios({
    method: "GET",
    url: `${config.api}/statistics?start=${startInput}&end=${endInput}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      setStatisticsList(res.data);
    })
    .catch((err) => {});
}
