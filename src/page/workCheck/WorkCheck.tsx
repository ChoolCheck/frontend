import React, { useState, useEffect, useCallback } from "react";
import WorkCheckView from "./WorkCheckView";
import "./style/workCheck.scss";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalWorkcheckList } from "../../Redux/Actions/handleTotalWorkcheckList";
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
  const totalWorkCheckList = useSelector(
    (state: RootState) => state.totalWorkcheckListReducer
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );
  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );

  const setTotalWorkCheckList = useCallback(
    (totalWorkcheckList: type.workcheckObjProps[] | undefined) =>
      dispatch(setTotalWorkcheckList(totalWorkcheckList)),
    [dispatch]
  );

  const [employeeList, setEmployeeList] = useState<
    employeeType.employeeProps[] | undefined
  >([]);

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
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      GetDateWorkcheckApi({ startInput, endInput, setWorkcheckToShow });
    };
  };

  useEffect(() => {
    GetTotalWorkcheckApi({ setTotalWorkCheckList });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onShowNameButtonClick = (id: number) => {
    const employee_id = id.toString();
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      GetEmployeeWorkcheckApi({ employee_id, setWorkcheckToShow });
    };
  };

  const onShowTotalButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWorkcheckToShow(totalWorkCheckList.totalWorkcheckList);
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
      ></WorkCheckView>
    </div>
  );
};
export default WorkCheck;
