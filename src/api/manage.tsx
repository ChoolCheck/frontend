import axios from "axios";
import { config } from "../static/config";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as type from "./manageType";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../Redux/Actions/handleWriteModal";

export async function CreateWorktype({
  title,
  startTime,
  endTime,
}: type.createWorktypeProps) {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );
  await axios({
    method: "POST",
    url: `${config.client}/hours`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { title: title, startTime: startTime, endTime: endTime },
  })
    .then((res) => {
      setWriteModal(false);
    })
    .catch((err) => {
      window.alert("근무 추가에 실패했습니다.");
    });
}

export async function GetWorktype({ setWorkTypeList }: type.getWorktypeProps) {
  await axios({
    method: "GET",
    url: `${config.client}/hours`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      return {
        title: res.data.title,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
      };
    })
    .catch((err) => {
      window.alert("근무 형태 조회에 실패했습니다.");
    });
}
