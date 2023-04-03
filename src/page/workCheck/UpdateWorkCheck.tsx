import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalWorkcheckList } from "../../Redux/Actions/handleTotalWorkcheckList";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";
import { setPaginationFocus } from "../../Redux/Actions/handlePaginationFocus";

import { GetWorktypeApi, GetEmployeeApi } from "../../api/manage";
import { UpdateWorkcheckApi } from "../../api/workcheck";

import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";
import * as type from "./type";
import * as enumType from "../../commonType/enum";
import * as employeeSelectType from "../../commonType/employeeSelectType";

import { ActionMeta, SingleValue } from "react-select";
import UpdateWorkCheckView from "./view/UpdateWorkCheckView";

const UpdateWorkCheck = ({
  id,
  workcheckDetail,
  setWorkcheckToShow,
}: type.updateWorkcheckProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const setTotalWorkCheckList = useCallback(
    (totalWorkcheckList: type.workcheckObjProps[] | undefined) =>
      dispatch(setTotalWorkcheckList(totalWorkcheckList)),
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

  const [employee, setEmployee] = useState(workcheckDetail?.name);
  const [employeeId, setEmployeeId] = useState("");
  const [hours, setHours] = useState(
    workcheckDetail
      ? workcheckDetail.hours == null
        ? ""
        : workcheckDetail.hours
      : ""
  );
  const [hoursId, setHoursid] = useState("");
  const [startTime, setStartTime] = useState(
    workcheckDetail ? workcheckDetail.startTime : ""
  );
  const [endTime, setEndTime] = useState(
    workcheckDetail ? workcheckDetail.endTime : ""
  );
  const [date, setDate] = useState(workcheckDetail ? workcheckDetail.date : "");

  const [optionList, setOptionList] = useState<
    Array<employeeSelectType.optionObj>
  >([]);

  const [defaultValueIndex, setDefaultValueIndex] = useState(0);

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList, hours, setHoursid });
    GetEmployeeApi({
      employee,
      color: workcheckDetail ? workcheckDetail.color : "white",
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
    console.log("employeeId : " + employeeId);
    employeeList?.map((item, i) => {
      if (Number(employeeId) == item.id) setDefaultValueIndex(i + 1);

      console.log({
        item: item.id + " " + item.name + " " + item.color,
      });

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
      UpdateWorkcheckApi({
        id,
        employeeId,
        date,
        hoursId,
        startTime,
        endTime,
        setWriteModal,
        setReadModal,
        setTotalWorkCheckList,
        setWorkcheckToShow,
        setTotalPage,
        setTotalElement,
      });
    }
  };

  return (
    <UpdateWorkCheckView
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
    ></UpdateWorkCheckView>
  );
};

export default UpdateWorkCheck;
