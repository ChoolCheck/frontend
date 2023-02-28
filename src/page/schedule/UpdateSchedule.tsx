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

  const [employee, setEmployee] = useState(scheduleDetail?.name);
  const [employeeId, setEmployeeId] = useState("");
  const [hours_id, setHoursid] = useState(
    scheduleDetail
      ? scheduleDetail.hours == null
        ? ""
        : scheduleDetail.hours
      : "0"
  );
  const [startTime, setStartTime] = useState(
    scheduleDetail ? scheduleDetail.startTime : ""
  );
  const [endTime, setEndTime] = useState(
    scheduleDetail ? scheduleDetail.endTime : ""
  );
  const [date, setDate] = useState(scheduleDetail ? scheduleDetail.date : "");

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList });
    GetEmployeeApi({ setEmployeeList, employee, setEmployeeId });

    const workTypeInputs = document.getElementsByName("hours_id");
    console.log(workTypeInputs);

    for (let i = 0; i < workTypeInputs.length; i++) {
      if (workTypeInputs[i].id == hours_id) {
        workTypeInputs[i].setAttribute("defaultChecked", "defaultChecked");
        break;
      }
    }
  }, []);

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      window.alert("작성이 취소되었습니다.");
    } else return;
  };

  const onChangeEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption =
      e.currentTarget.options[e.currentTarget.options.selectedIndex].innerText;

    if (employeeList) {
      if (selectedOption == "직원 선택") {
        setEmployee("");
      } else {
        for (let i = 0; i < employeeList.length; i++) {
          if (employeeList[i].name == selectedOption) {
            setEmployee(employeeList[i].name);
            setEmployeeId(employeeList[i].id.toString());
            break;
          }
        }
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

      // startTimeInput.setAttribute("value", startTime);
      // endTimeInput.setAttribute("value", endTime);
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
        employeeId,
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
        onChangeEmployee={onChangeEmployee}
        onChangeDate={onChangeDate}
        onChangeWorkType={onChangeWorkType}
        onChangeStartTime={onChangeStartTime}
        onChangeEndTime={onChangeEndTime}
        onClickUpdate={onClickUpdate}
        employeeId={employeeId}
        hours_id={hours_id}
        startTime={startTime}
        endTime={endTime}
        date={date}
      ></UpdateScheduleView>
    </div>
  );
};

export default UpdateSchedule;
