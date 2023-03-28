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

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList, hours, setHoursid });
    GetEmployeeApi({ setEmployeeList, employee, setEmployeeId });
  }, []);

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
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
      hoursId={hoursId}
      startTime={startTime}
      endTime={endTime}
      date={date}
    ></UpdateWorkCheckView>
  );
};

export default UpdateWorkCheck;
