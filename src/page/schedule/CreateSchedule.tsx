import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

import { GetWorktypeApi, GetEmployeeApi } from "../../api/manage";
import { CreateScheduleApi } from "../../api/schedule";

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
  >();

  const [employeeList, setEmployeeList] =
    useState<employeeType.employeeProps[]>();

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList });
    GetEmployeeApi({ setEmployeeList });
  }, []);

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
    let employeeId = 0;
    if (employeeList) {
      for (let i = 0; i < employeeList.length; i++) {
        if (
          employeeList[i].name ==
          e.currentTarget.options[e.currentTarget.options.selectedIndex]
            .innerText
        )
          employeeId = employeeList[i].id;
      }
    }
    onChangeForm("employee", employeeId.toString());
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
    CreateScheduleApi(scheduleForm);
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
