import axios from "axios";
import { config } from "../static/config";
import * as type from "./type/statisticsType";

export async function GetMonthStatisticsApi({
  start,
  end,
}: type.getDetailStatisticsProps) {
  await axios({
    method: "GET",
    url: `${config.api}/statistics?start=${start}&end=${end}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {});
}

export async function GetDateStatisticsProps({
  start,
  end,
}: type.getDateStatisticsProps) {
  await axios({
    method: "GET",
    url: `${config.api}/statistics?start=${start}&end=${end}`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {})
    .catch((err) => {});
}
