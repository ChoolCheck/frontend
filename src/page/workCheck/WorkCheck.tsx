import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalWorkcheckList } from "../../Redux/Actions/handleTotalWorkcheckList";
import { RootState } from "../../Redux/Reducers/rootReducer";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";
import { setPaginationFocus } from "../../Redux/Actions/handlePaginationFocus";

import {
  integratedWorkcheckRender,
  GetDetailWorkcheckApi,
  GetTotalWorkcheckApi,
  GetEmployeeWorkcheckApi,
  GetDateWorkcheckApi,
} from "../../api/workcheck";

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
  const now = new Date();
  const today = (
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-" +
    (now.getDate() < 10 ? "0" + now.getDate() : now.getDate())
  ).toString();
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

  const paginationFocus = useSelector(
    (state: RootState) => state.PaginationFocus.paginationState
  );

  const setPaginationfocus = useCallback(
    (paginationFocus: string) => dispatch(setPaginationFocus(paginationFocus)),
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
  const [employeeToShow, setEmployeeToShow] = useState<string>("0");

  useEffect(() => {
    setPaginationfocus("total");

    integratedWorkcheckRender({
      setTotalWorkCheckList,
      setTotalElement,
      setTotalPage,
      setEmployeeList,
    });
  }, []);

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetDateResultClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPaginationfocus("total");
    GetDateWorkcheckApi({
      startInput,
      endInput,
      setWorkcheckToShow,
      setTotalElement,
      setTotalPage,
    });
  };

  const onShowNameButtonClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setEmployeeToShow(id.toString());
      setPaginationfocus("employee");

      if (startInput !== "" && endInput !== "")
        GetEmployeeWorkcheckApi({
          employeeId: id.toString(),
          startInput,
          endInput,
          setWorkcheckToShow,
          setTotalElement,
          setTotalPage,
        });
      else
        GetEmployeeWorkcheckApi({
          employeeId: id.toString(),
          setWorkcheckToShow,
          setTotalElement,
          setTotalPage,
        });
    };
  };

  const onShowTotalButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPaginationfocus("total");

    if (startInput !== "" && endInput !== "") {
      GetTotalWorkcheckApi({
        setTotalWorkCheckList,
        setTotalElement,
        setTotalPage,
        setWorkcheckToShow,
        startInput,
        endInput,
      });
    } else {
      GetTotalWorkcheckApi({
        setTotalWorkCheckList,
        setTotalElement,
        setTotalPage,
        setWorkcheckToShow,
      });
    }
  };

  const onItemClick = (id: number) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      GetDetailWorkcheckApi({ id, setWorkcheckDetail, setReadModal });
    };
  };

  const onPaginationClick = (item: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPage(item);

      if (paginationFocus == "total") {
        if (startInput !== "" && endInput !== "") {
          GetTotalWorkcheckApi({
            setTotalWorkCheckList,
            setWorkcheckToShow,
            setTotalPage,
            setTotalElement,
            page: item,
            startInput,
            endInput,
          });
        } else {
          GetTotalWorkcheckApi({
            setWorkcheckToShow,
            setTotalWorkCheckList,
            setTotalPage,
            setTotalElement,
            page: item,
          });
        }
      } else if (paginationFocus == "employee") {
        if (startInput !== "" && endInput !== "")
          GetEmployeeWorkcheckApi({
            employeeId: employeeToShow,
            startInput,
            endInput,
            setWorkcheckToShow,
            setTotalElement,
            setTotalPage,
            page: item,
          });
        else
          GetEmployeeWorkcheckApi({
            employeeId: employeeToShow,
            page: item,
            setWorkcheckToShow,
            setTotalElement,
            setTotalPage,
          });
      }
    };
  };

  return (
    <div className="WorkCheck-top-container">
      {writeModalState && (
        <WriteModal>
          <CreateWorkCheck
            defaultDate={today}
            setWorkcheckToShow={setWorkcheckToShow}
          ></CreateWorkCheck>
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
        startTime={startInput}
        endTime={endInput}
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
