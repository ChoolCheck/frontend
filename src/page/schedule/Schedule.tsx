import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";
import { setPaginationFocus } from "../../Redux/Actions/handlePaginationFocus";

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

  const paginationFocus = useSelector(
    (state: RootState) => state.PaginationFocus.paginationState
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const setTotalElement = useCallback(
    (totalElement: number) => dispatch(setTotalElements(totalElement)),
    [dispatch]
  );
  const setTotalPage = useCallback(
    (totalPage: number) => dispatch(setTotalPages(totalPage)),
    [dispatch]
  );

  const setPaginationfocus = useCallback(
    (paginationFocus: string) => dispatch(setPaginationFocus(paginationFocus)),
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

  const [employeeToShow, setEmployeeToShow] = useState<string>("0");
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPaginationfocus("total");
    GetWeekScheduleApi({ setWeekScheduleList });
    GetTotalScheduleApi({
      setTotalScheduleList,
      setTotalElement,
      setTotalPage,
    });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onShowNameButtonClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      setPaginationfocus("employee");
      setEmployeeToShow(id.toString());

      GetEmployeeScheduleApi({
        employeeId: id.toString(),
        setScheduleToShow,
        setTotalElement,
        setTotalPage,
      });
    };
  };

  const onShowTotalButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPaginationfocus("total");
    GetTotalScheduleApi({
      setTotalScheduleList,
      setScheduleToShow,
      setTotalElement,
      setTotalPage,
    });
  };

  const onItemClick = (id: number) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      GetDetailScheduleApi({ id, setScheduleDetail, setReadModal });
    };
  };

  const onPaginationClick = (item: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPage(item);
      if (paginationFocus == "total") {
        GetTotalScheduleApi({
          setScheduleToShow,
          setTotalScheduleList,
          setTotalPage,
          setTotalElement,
          page: item,
        });
      } else if (paginationFocus == "employee") {
        GetEmployeeScheduleApi({
          employeeId: employeeToShow,
          setScheduleToShow,
          setTotalElement,
          setTotalPage,
          page: item,
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
            setScheduleToShow={setScheduleToShow}
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
          page={page}
        ></ScheduleTotalView>
      )}
    </div>
  );
};

export default Schedule;
