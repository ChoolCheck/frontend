import "./style/createWorkCheck.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

import { GetWorktypeApi, GetEmployeeApi } from "../../api/manage";
import { CreateWorkcheckApi } from "../../api/workcheck";

import * as type from "./type";
import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

const CreateWorkCheck = ({
  setTotalWorkcheckList,
}: type.createWorkCheckProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
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

  const [employee, setEmployee] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [hours_id, setHoursid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const workCheckForm = { employee, hours_id, date, startTime, endTime };

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      window.alert("작성이 취소되었습니다.");
    } else return;
  };

  const onChangeEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let employeeId = 0;
    let employee = "";
    const selectedOption =
      e.currentTarget.options[e.currentTarget.options.selectedIndex].innerText;

    if (employeeList) {
      if (selectedOption == "직원 선택") {
        setEmployee("");
      } else {
        for (let i = 0; i < employeeList.length; i++) {
          if (employeeList[i].name == selectedOption) {
            employeeId = employeeList[i].id;
            employee = employeeList[i].name;
            break;
          }
        }
        setEmployee(employee);
        setEmployeeId(employeeId.toString());
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

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (employee == "") {
      window.alert("직원을 선택해주세요");
    } else if (date == "") {
      window.alert("날짜를 선택해주세요.");
    } else if (startTime == "") {
      window.alert("시작 시간을 선택해주세요.");
    } else if (endTime == "") {
      window.alert("종료 시간을 선택해주세요.");
    } else
      CreateWorkcheckApi({
        employeeId,
        date,
        hours_id,
        startTime,
        endTime,
        setWriteModal,
        setTotalWorkcheckList,
      });
  };

  return (
    <div className="CreateWorkCheck-container">
      <h3>출근부 작성</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-employee">
          <span>직원</span>
          <select>
            <option>김어진</option>
            <option>이예빈</option>
            <option>고구마</option>
          </select>
        </p>
        <p className="modal-date">
          <span>날짜</span>
          <input type="date"></input>
        </p>
        <p className="modal-worktype">
          <span>근무형태</span>
          <input type="checkbox"></input>
        </p>
        <p className="modal-time">
          <span>시간</span>
          <input
            className="modal-time-start"
            name="startTime"
            type="time"
          ></input>
          {" ~ "}
          <input className="modal-time-end" name="endTime" type="time"></input>
        </p>
      </div>
      <div className="modal-write-button-container">
        <button
          className="modal-write-close-button"
          onClick={onClickCancelOnModal}
        >
          취소
        </button>
        <button>완료</button>
      </div>
    </div>
  );
};

export default CreateWorkCheck;
