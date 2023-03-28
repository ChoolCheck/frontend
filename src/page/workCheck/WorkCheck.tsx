import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
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

import CreateWorkCheck from "./CreateWorkCheck";
import WorkCheckDetail from "./WorkCheckDetail";
import WorkCheckView from "./view/WorkCheckView";
import WorkCheckHeader from "./WorkcheckHeader";

import "./style/workCheck.scss";
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

  //pagination
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const size = 10;
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    GetTotalWorkcheckApi({
      setTotalWorkCheckList,
      setTotalPages,
      setTotalElements,
      page,
    });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetDateResultClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    GetDateWorkcheckApi({ startInput, endInput, setWorkcheckToShow });
  };

  const onShowNameButtonClick = (id: number) => {
    const employeeId = id.toString();
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      GetEmployeeWorkcheckApi({ employeeId, setWorkcheckToShow });
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

  const onClickGetFile = () => {
    if (startInput == "") window.alert("시작일을 입력해주세요");
    else if (endInput == "") window.alert("마감일을 입력해주세요");
    else {
    }
  };

  return (
    <div className="WorkCheck-top-container">
      {writeModalState && (
        <WriteModal>
          <CreateWorkCheck
            setTotalPages={setTotalPages}
            setTotalElements={setTotalElements}
          ></CreateWorkCheck>
        </WriteModal>
      )}

      {readModalState && (
        <ReadModal>
          <WorkCheckDetail
            setTotalPages={setTotalPages}
            setTotalElements={setTotalElements}
            workcheckDetail={workcheckDetail}
            setWorkcheckToShow={setWorkcheckToShow}
          ></WorkCheckDetail>
        </ReadModal>
      )}

      <WorkCheckHeader
        onChageStartInput={onChageStartInput}
        onChageEndInput={onChageEndInput}
        onGetDateResultClick={onGetDateResultClick}
        onClickGetFile={onClickGetFile}
      ></WorkCheckHeader>

      <WorkCheckView
        onShowNameButtonClick={onShowNameButtonClick}
        onShowTotalButtonClick={onShowTotalButtonClick}
        onItemClick={onItemClick}
        workcheckToShow={workcheckToShow}
        employeeList={employeeList}
        totalPages={totalPages}
        totalElements={totalElements}
        page={page}
      ></WorkCheckView>
    </div>
  );
};
export default WorkCheck;
