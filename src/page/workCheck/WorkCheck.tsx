import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalWorkcheckList } from "../../Redux/Actions/handleTotalWorkcheckList";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";

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
import WorkCheckHeader from "./view/WorkcheckHeader";

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
    (state: RootState) => state.TotalWorkcheckListReducer
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
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    GetTotalWorkcheckApi({
      setTotalWorkCheckList,
      setTotalElement,
      setTotalPage,
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

  const setDate = () => {
    setStartInput("");
    setEndInput("");
  };

  const onGetDateResultClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    GetDateWorkcheckApi({ startInput, endInput, setWorkcheckToShow });
  };

  const onShowNameButtonClick = (id: number) => {
    const employeeId = id.toString();
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (startInput && endInput)
        GetEmployeeWorkcheckApi({
          employeeId,
          setWorkcheckToShow,
          startInput,
          endInput,
        });
      else GetEmployeeWorkcheckApi({ employeeId, setWorkcheckToShow });
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

  const onPaginationClick = (item: number) => {
    const page = item;
    setPage(item);
    GetTotalWorkcheckApi({
      setTotalWorkCheckList,
      page,
      setTotalPage,
      setTotalElement,
    });
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };
  };

  return (
    <div className="WorkCheck-top-container">
      {writeModalState && (
        <WriteModal>
          <CreateWorkCheck></CreateWorkCheck>
        </WriteModal>
      )}

      {readModalState && (
        <ReadModal>
          <WorkCheckDetail
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
        page={page}
        onPaginationClick={onPaginationClick}
      ></WorkCheckView>
    </div>
  );
};
export default WorkCheck;
