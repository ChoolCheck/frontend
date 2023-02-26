import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import { GetWorktypeApi, GetEmployeeApi } from "../../api/manage";
import { UpdateScheduleApi } from "../../api/schedule";

import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";
import * as type from "./type";

import UpdateScheduleView from "./view/UpdateScheduleView";

const UpdateSchedule = ({
  id,
  scheduleDetail,
  setWeekScheduleList,
  setTotalScheduleList,
}: type.updateScheduleProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );
  const [workTypeList, setWorkTypeList] = useState<
    worktypeType.worktypeProps[] | undefined
  >([]);

  const [employeeList, setEmployeeList] = useState<
    employeeType.employeeProps[] | undefined
  >([]);

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

  const [employee, setEmployee] = useState("");
  const [hours_id, setHoursid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const scheduleForm = { id, employee, hours_id, date, startTime, endTime };

  const onChangeEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let employeeId = 0;
    const selectedOption =
      e.currentTarget.options[e.currentTarget.options.selectedIndex].innerText;

    if (employeeList) {
      if (selectedOption == "직원 선택") {
        setEmployee("");
      } else {
        for (let i = 0; i < employeeList.length; i++) {
          if (employeeList[i].name == selectedOption) {
            employeeId = employeeList[i].id;
            break;
          }
        }
        setEmployee(employeeId.toString());
      }
    }
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onChangeWorkType = (id: number, startTime: string, endTime: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputs = document.querySelectorAll("input");
      const startTimeInput = inputs[inputs.length - 2];
      const endTimeInput = inputs[inputs.length - 1];

      startTimeInput.setAttribute("value", startTime);
      endTimeInput.setAttribute("value", endTime);
      startTimeInput.value = startTime;
      endTimeInput.value = endTime;

      setStartTime(startTime);
      setEndTime(endTime);

      if (id > 0) setHoursid(id.toString());
      else setHoursid("");
    };
  };

  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const onChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(scheduleForm);
    if (employee == "") {
      window.alert("직원을 선택해주세요");
    } else if (date == "") {
      window.alert("날짜를 선택해주세요.");
    } else if (startTime == "") {
      window.alert("시작 시간을 선택해주세요.");
    } else if (endTime == "") {
      window.alert("종료 시간을 선택해주세요.");
    } else
      UpdateScheduleApi({
        id,
        employee,
        date,
        hours_id,
        startTime,
        endTime,
        setWriteModal,
        setReadModal,
        setWeekScheduleList,
        setTotalScheduleList,
      });
  };

  return (
    <div className="updateEmployeeView-container">
      <UpdateScheduleView
        workTypeList={workTypeList}
        employeeList={employeeList}
        onClickCancelOnModal={onClickCancelOnModal}
        scheduleForm={scheduleForm}
        onChangeEmployee={onChangeEmployee}
        onChangeDate={onChangeDate}
        onChangeWorkType={onChangeWorkType}
        onChangeStartTime={onChangeStartTime}
        onChangeEndTime={onChangeEndTime}
        onClickUpdate={onClickUpdate}
      ></UpdateScheduleView>
    </div>
  );
};

export default UpdateSchedule;
