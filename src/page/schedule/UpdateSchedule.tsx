import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";
import { setPaginationFocus } from "../../Redux/Actions/handlePaginationFocus";

import { GetWorktypeApi, GetEmployeeApi } from "../../api/manage";
import { UpdateScheduleApi } from "../../api/schedule";

import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";
import * as type from "./type";
import * as enumType from "../../commonType/enum";
import * as employeeSelectType from "../../commonType/employeeSelectType";

import { ActionMeta, SingleValue } from "react-select";
import UpdateScheduleView from "./view/UpdateScheduleView";

const UpdateSchedule = ({
  id,
  scheduleDetail,
  setWeekScheduleList,
  setTotalScheduleList,
  setScheduleToShow,
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
  const setTotalElement = useCallback(
    (totalElementState: number) =>
      dispatch(setTotalElements(totalElementState)),
    [dispatch]
  );
  const setTotalPage = useCallback(
    (totalPageState: number) => dispatch(setTotalPages(totalPageState)),
    [dispatch]
  );
  const setPaginationfocus = useCallback(
    (paginationFocus: string) => dispatch(setPaginationFocus(paginationFocus)),
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
  const [hours, setHours] = useState(
    scheduleDetail
      ? scheduleDetail.hours == null
        ? ""
        : scheduleDetail.hours
      : ""
  );
  const [hoursId, setHoursid] = useState("");
  const [startTime, setStartTime] = useState(
    scheduleDetail ? scheduleDetail.startTime : ""
  );
  const [endTime, setEndTime] = useState(
    scheduleDetail ? scheduleDetail.endTime : ""
  );
  const [date, setDate] = useState(scheduleDetail ? scheduleDetail.date : "");

  const [optionList, setOptionList] = useState<
    Array<employeeSelectType.optionObj>
  >([]);

  const [defaultValueIndex, setDefaultValueIndex] = useState(0);

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList, hours, setHoursid });
    GetEmployeeApi({
      employee,
      color: scheduleDetail ? scheduleDetail.color : "white",
      setEmployeeId,
      setEmployeeList,
    });
  }, []);

  useEffect(() => {
    let list: Array<employeeSelectType.optionObj> = [];
    list.push({
      label: "직원선택",
      color: "gray",
      isDisabled: true,
    });
    employeeList?.map((item, i) => {
      if (Number(employeeId) == item.id) setDefaultValueIndex(i + 1);
      list.push({
        label: item.name,
        color: `#${
          enumType.enumColor[item.color as keyof typeof enumType.enumColor]
        }`,
      });
    });
    setOptionList(list);
  }, [employeeList]);

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      setReadModal(true);
    } else return;
  };

  const onChangeEmployee = (
    newValue: SingleValue<employeeSelectType.optionObj>,
    actionMeta: ActionMeta<employeeSelectType.optionObj>
  ) => {
    let employeeId = 0;
    let employee = "";

    if (employeeList && newValue) {
      for (let i = 0; i < employeeList.length; i++) {
        const color = `#${
          enumType.enumColor[
            employeeList[i].color as keyof typeof enumType.enumColor
          ]
        }`;

        if (employeeList[i].name == newValue.label && color == newValue.color) {
          employeeId = employeeList[i].id;
          employee = employeeList[i].name;
          break;
        }
      }
      setEmployee(employee);
      setEmployeeId(employeeId.toString());
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
    } else {
      setPaginationfocus("total");
      UpdateScheduleApi({
        id,
        employeeId,
        date,
        hoursId,
        startTime,
        endTime,
        setWriteModal,
        setReadModal,
        setWeekScheduleList,
        setTotalScheduleList,
        setScheduleToShow,
        setTotalElement,
        setTotalPage,
      });
    }
  };

  return (
    <div className="updateEmployeeView-container">
      <UpdateScheduleView
        defaultValueIndex={defaultValueIndex}
        optionList={optionList}
        workTypeList={workTypeList}
        onClickCancelOnModal={onClickCancelOnModal}
        onChangeEmployee={onChangeEmployee}
        onChangeDate={onChangeDate}
        onChangeWorkType={onChangeWorkType}
        onChangeStartTime={onChangeStartTime}
        onChangeEndTime={onChangeEndTime}
        onClickUpdate={onClickUpdate}
        employeeId={employeeId}
        hoursId={hoursId}
        startTime={startTime}
        endTime={endTime}
        date={date}
      ></UpdateScheduleView>
    </div>
  );
};

export default UpdateSchedule;
