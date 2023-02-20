import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

import { GetWorktypeApi, GetEmployeeApi } from "../../api/manage";

import * as type from "./type";
import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

import CreateScheduleView from "./CreateScheduleView";
import "./style/createSchedule.scss";
import { stringify } from "querystring";

const CreateSchedule = () => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const [workTypeList, setWorkTypeList] = useState<
    worktypeType.worktypeProps[] | undefined
  >([
    { id: 1, title: "미들", startTime: "14:00", endTime: "18:00" },
    { id: 2, title: "마감", startTime: "19:00", endTime: "23:00" },
  ]);

  const [employeeList, setEmployeeList] = useState<
    employeeType.employeeProps[]
  >([
    {
      id: 3,
      name: "이예빈",
      role: "MANAGER",
      color: "RED",
    },
    {
      id: 5,
      name: "김어진",
      role: "MANAGER",
      color: "Yellow",
    },
  ]);

  // useEffect(() => {
  //   GetWorktypeApi({ setWorkTypeList });
  //   GetEmployeeApi({ setEmployeeList });
  // }, []);

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      window.alert("작성이 취소되었습니다.");
    } else return;
  };

  const [scheduleForm, setWorkCheckForm] = useState({
    employee: "",
    hours_id: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const { employee, hours_id, date, startTime, endTime } = scheduleForm;

  const onChangeForm = (name: string, value: string) => {
    setWorkCheckForm({
      ...scheduleForm,
      [name]: value,
    });
  };

  const onChangeEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeForm(
      "employee",
      e.currentTarget.options[e.currentTarget.options.selectedIndex].innerText
    );
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm("date", e.target.value);
  };

  const onChangeWorkType = (id: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(id);
      onChangeForm("hours_id", id.toString());
    };
  };

  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm("startTime", e.target.value);
  };

  const onChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm("endTime", e.target.value);
  };

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    console.log(scheduleForm);
  };

  return (
    <div>
      <CreateScheduleView
        workTypeList={workTypeList}
        employeeList={employeeList}
        onClickCancelOnModal={onClickCancelOnModal}
        scheduleForm={scheduleForm}
        onChangeEmployee={onChangeEmployee}
        onChangeDate={onChangeDate}
        onChangeWorkType={onChangeWorkType}
        onChangeStartTime={onChangeStartTime}
        onChangeEndTime={onChangeEndTime}
        onClickCreate={onClickCreate}
      ></CreateScheduleView>
    </div>
  );
};

export default CreateSchedule;
