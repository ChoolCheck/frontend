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
  >([]);
  // { id: 1, title: "미들입니다", startTime: "12:00", endTime: "18:00" },
  // { id: 2, title: "마감", startTime: "19:00", endTime: "23:00" },
  // { id: 3, title: "오픈", startTime: "09:00", endTime: "18:00" },

  const [employeeList, setEmployeeList] = useState<
    employeeType.employeeProps[] | undefined
  >([]);
  // {
  //   id: 3,
  //   name: "이예빈",
  //   role: "MANAGER",
  //   color: "REd",
  // },
  // {
  //   id: 2,
  //   name: "김어진",
  //   role: "MANAGER",
  //   color: "REd",
  // },

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

  // const [scheduleForm, setScheduleForm] = useState({
  //   employee: "",
  //   hours_id: "",
  //   date: "",
  //   startTime: "",
  //   endTime: "",
  // });

  const scheduleForm = { employee, hours_id, date, startTime, endTime };

  // const onChangeForm = (name: string, value: string) => {
  //   console.log("name : " + name);
  //   console.log("value : " + value);
  //   setScheduleForm({
  //     ...scheduleForm,
  //     [name]: value,
  //   });
  //   console.log(scheduleForm);
  // };

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
    // onChangeForm("employee", employeeId.toString());
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChangeForm("date", e.target.value);
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

      // setScheduleForm({
      //   ...scheduleForm,
      //   ["startTime"]: startTime,
      // });

      // if (id > 0) onChangeForm("hours_id", id.toString());
      // else onChangeForm("hours_id", "");

      setStartTime(startTime);
      setEndTime(endTime);

      if (id > 0) setHoursid(id.toString());
      else setHoursid("");
    };
  };

  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChangeForm("startTime", e.target.value);
    setStartTime(e.target.value);
  };
  const onChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChangeForm("endTime", e.target.value);
    setEndTime(e.target.value);
  };

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      CreateScheduleApi({
        employee,
        date,
        hours_id,
        startTime,
        endTime,
        setWriteModal,
      });
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
