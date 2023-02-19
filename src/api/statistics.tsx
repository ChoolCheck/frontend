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
    .catch((err) => {
      window.alert("월별 통계 조회에 실패했습니다.");
    });
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
    .catch((err) => {
      window.alert("기간별 통계 조회에 실패했습니다.");
    });
}
