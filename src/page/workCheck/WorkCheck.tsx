import React, { useState, useEffect, useCallback } from "react";
import WorkCheckView from "./WorkCheckView";
import "./style/workCheck.scss";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import {
  GetDetailWorkcheckApi,
  GetTotalWorkcheckApi,
  GetEmployeeWorkcheckApi,
  GetDateWorkcheckApi,
} from "../../api/workcheck";
import { GetEmployeeApi } from "../../api/manage";

import WriteModal from "../../components/modal/WriteModal";
import ReadModal from "../../components/modal/ReadModal";

import "./style/schedule.scss";
import * as type from "./type";
import * as employeeType from "../../commonType/employee";

const WorkCheck = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );
  const readModalState = useSelector(
    (state: RootState) => state.ReadModalReducer.readModalState
  );
  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );
  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const workCheckTotal = {
    totalList: [
      {
        day: "월",
        date: "01/02",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#ffd6a5",
      },
      {
        day: "월",
        date: "01/02",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "화",
        date: "01/03",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",

        backgroundColor: "#ffd6a5",
      },
      {
        day: "화",
        date: "01/03",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "수",
        date: "01/04",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#ffd6a5",
      },

      {
        day: "목",
        date: "01/05",
        name: "고구마",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#fdffb6",
      },
      {
        day: "목",
        date: "01/05",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "금",
        date: "01/06",
        name: "옥수수",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#a0c4ff",
      },
      {
        day: "금",
        date: "01/06",
        name: "감자밭",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#bdb2ff",
      },

      {
        day: "토",
        date: "01/07",
        name: "감자밭",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#a0c4ff",
      },
      {
        day: "토",
        date: "01/07",
        name: "고구마",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#fdffb6",
      },

      {
        day: "일",
        date: "01/08",
        name: "고구마",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#fdffb6",
      },
      {
        day: "일",
        date: "01/08",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },
    ],
    employee: [
      { name: "김어진", backgroundColor: "#ffd6a5" },
      { name: "이예빈", backgroundColor: "#ffadad" },
      { name: "감자밭", backgroundColor: "#bdb2ff" },
      { name: "고구마", backgroundColor: "#fdffb6" },
      { name: "옥수수", backgroundColor: "#a0c4ff" },
      { name: "김어진", backgroundColor: "#ffd6a5" },
      { name: "이예빈", backgroundColor: "#ffadad" },
      { name: "감자밭", backgroundColor: "#bdb2ff" },
      { name: "고구마", backgroundColor: "#fdffb6" },
      { name: "옥수수", backgroundColor: "#a0c4ff" },
    ],
  };

  const [employeeList, setEmployeeList] = useState<
    employeeType.employeeProps[] | undefined
  >([]);

  const [totalWorkcheckList, setTotalWorkcheckList] = useState<
    type.workcheckObjProps[] | undefined
  >();

  const [workcheckToShow, setWorkcheckToShow] = useState<
    type.workcheckObjProps[] | undefined
  >();

  const [workcheckDetail, setWorkcheckDetail] =
    useState<type.workcheckObjProps>();

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetResultClick = () => {
    //조회 로직 : startInput, endInput 서버에 넘겨주고 결과 list 받기
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      GetDateWorkcheckApi({ startInput, endInput, setWorkcheckToShow });
    };
  };

  useEffect(() => {
    GetTotalWorkcheckApi({ setTotalWorkcheckList });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onShowNameButtonClick = (id: number) => {
    const employee_id = id.toString();
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      GetEmployeeWorkcheckApi({ employee_id, setWorkcheckToShow });
    };
  };

  const onShowTotalButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWorkcheckToShow(totalWorkcheckList);
  };

  const onItemClick = (id: number) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      GetDetailWorkcheckApi({ id, setWorkcheckDetail, setReadModal });
    };
  };

  return (
    <div className="WorkCheck-top-container">
      <div className="WorkCheck-Header-container">
        <span className="WorkCheck-Header">기간 내 조회</span>
        <form>
          <input
            className="WorkCheck-startInput"
            onChange={onChageStartInput}
            type="date"
            required
            aria-required="true"
          ></input>
          -
          <input
            className="WorkCheck-endInput"
            onChange={onChageEndInput}
            type="date"
            required
            aria-required="true"
          ></input>
          <button
            className="WorkCheck-getResultButton"
            onClick={onGetResultClick}
          >
            조회
          </button>
        </form>

        <button className="getFileButton">출근부 엑셀 파일 다운로드</button>
      </div>

      <WorkCheckView
        onShowNameButtonClick={onShowNameButtonClick}
        onShowTotalButtonClick={onShowTotalButtonClick}
        onItemClick={onItemClick}
        workcheckToShow={workcheckToShow}
        employeeList={employeeList}
        totalWorkcheckList={totalWorkcheckList}
      ></WorkCheckView>
    </div>
  );
};
export default WorkCheck;
