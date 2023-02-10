import axios from "axios";
import { config } from "../static/config";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as type from "./manageType";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../Redux/Actions/handleWriteModal";

export async function CreateWorktype({
  worktypeForm,
  setWriteModal,
}: type.createWorktypeProps) {
  await axios({
    method: "POST",
    url: `${config.api}/hours`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      title: worktypeForm.title,
      startTime: worktypeForm.startTime,
      endTime: worktypeForm.endTime,
    },
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
    url: `${config.api}/hours`,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      setWorkTypeList(res.data);
    })
    .catch((err) => {
      window.alert("근무 형태 조회에 실패했습니다.");
    });
}
