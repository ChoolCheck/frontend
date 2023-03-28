import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";
import WriteModal from "../../components/modal/WriteModal";
import ReadModal from "../../components/modal/ReadModal";

import {
  GetWeekScheduleApi,
  GetDetailScheduleApi,
  GetTotalScheduleApi,
  GetEmployeeScheduleApi,
} from "../../api/schedule";
import { GetEmployeeApi } from "../../api/manage";

import ScheduleWeeklyView from "./view/ScheduleWeeklyView";
import ScheduleTotalView from "./view/ScheduleTotalView";
import ScheduleDetail from "./ScheduleDetail";
import UpdateSchedule from "./UpdateSchedule";
import CreateSchedule from "./CreateSchedule";
import ScheduleHeader from "./view/ScheduleHeader";

import "./style/schedule.scss";
import * as type from "./type";
import * as employeeType from "../../commonType/employee";

const Schedule = () => {
  const dispatch = useDispatch();

  const [leftOrRight, setLeftOrRight] = useState(true);

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

  const [totalScheduleList, setTotalScheduleList] = useState<
    type.scheduleObjProps[] | undefined
  >();
  const [weekScheduleList, setWeekScheduleList] = useState<
    type.scheduleObjProps[][] | undefined
  >();

  const [scheduleToShow, setScheduleToShow] = useState<
    type.scheduleObjProps[] | undefined
  >();

  const [scheduleDetail, setScheduleDetail] = useState<type.scheduleObjProps>();
  const [selectedModal, setSelectedModal] = useState<string>("");

  const [page, setPage] = useState<number>(0);

  const [employeeId, setEmployeeId] = useState<string>("0");
  const [paginationFocus, setPaginationFocus] = useState("total");

  useEffect(() => {
    GetWeekScheduleApi({ setWeekScheduleList });
    GetTotalScheduleApi({
      setTotalScheduleList,
      setTotalElement,
      setTotalPage,
    });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onShowNameButtonClick = (id: number) => {
    setPaginationFocus("employee");
    setEmployeeId(id.toString());
    const employeeId = id.toString();
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      GetEmployeeScheduleApi({
        employeeId,
        setScheduleToShow,
        setTotalElement,
        setTotalPage,
      });
    };
  };

  const onShowTotalButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPaginationFocus("total");
    GetTotalScheduleApi({
      setTotalScheduleList,
      setScheduleToShow,
      setTotalElement,
      setTotalPage,
    });
    // setScheduleToShow(totalScheduleList);
  };

  const onItemClick = (id: number) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      GetDetailScheduleApi({ id, setScheduleDetail, setReadModal });
    };
  };

  const onPaginationClick = (item: number) => {
    const page = item;
    setPage(item);
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log(paginationFocus);
      if (paginationFocus == "total") {
        GetTotalScheduleApi({
          setTotalScheduleList,
          page,
          setTotalPage,
          setTotalElement,
        });
      } else if (paginationFocus == "employee") {
        GetEmployeeScheduleApi({
          employeeId,
          setScheduleToShow,
          setTotalElement,
          setTotalPage,
          page,
        });
      }
    };
  };

  return (
    <div className="Schedule-top-container">
      <ScheduleHeader
        setSelectedModal={setSelectedModal}
        leftOrRight={leftOrRight}
        setLeftOrRight={setLeftOrRight}
      ></ScheduleHeader>

      {writeModalState && selectedModal == "create" && (
        <WriteModal>
          <CreateSchedule
            setWeekScheduleList={setWeekScheduleList}
            setTotalScheduleList={setTotalScheduleList}
          ></CreateSchedule>
        </WriteModal>
      )}

      {writeModalState && selectedModal == "update" && (
        <WriteModal>
          <UpdateSchedule
            id={scheduleDetail ? scheduleDetail.id : 0}
            scheduleDetail={scheduleDetail}
            setWeekScheduleList={setWeekScheduleList}
            setTotalScheduleList={setTotalScheduleList}
            setScheduleToShow={setScheduleToShow}
          ></UpdateSchedule>
        </WriteModal>
      )}

      {readModalState && (
        <ReadModal>
          <ScheduleDetail
            scheduleDetail={scheduleDetail}
            setTotalScheduleList={setTotalScheduleList}
            setWeekScheduleList={setWeekScheduleList}
            setScheduleToShow={setScheduleToShow}
            setSelectedModal={setSelectedModal}
          ></ScheduleDetail>
        </ReadModal>
      )}

      {leftOrRight ? (
        <ScheduleWeeklyView
          weekScheduleList={weekScheduleList}
          onItemClick={onItemClick}
        ></ScheduleWeeklyView>
      ) : (
        <ScheduleTotalView
          scheduleToShow={scheduleToShow}
          employeeList={employeeList}
          totalScheduleList={totalScheduleList}
          onShowNameButtonClick={onShowNameButtonClick}
          onShowTotalButtonClick={onShowTotalButtonClick}
          onItemClick={onItemClick}
          onPaginationClick={onPaginationClick}
          paginationFocus={paginationFocus}
        ></ScheduleTotalView>
      )}
    </div>
  );
};

export default Schedule;
