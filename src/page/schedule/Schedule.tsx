import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

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
import ToggleButton from "../../components/button/ToggleButton";
import CreateSchedule from "./CreateSchedule";
import WriteModal from "../../components/modal/WriteModal";
import ReadModal from "../../components/modal/ReadModal";

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
  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
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

  useEffect(() => {
    GetWeekScheduleApi({ setWeekScheduleList });
    GetTotalScheduleApi({ setTotalScheduleList });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onShowNameButtonClick = (id: number) => {
    const employee_id = id.toString();
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      GetEmployeeScheduleApi({ employee_id, setScheduleToShow });
    };
  };

  const onShowTotalButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setScheduleToShow(totalScheduleList);
  };

  const onItemClick = (id: number) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      GetDetailScheduleApi({ id, setScheduleDetail, setReadModal });
    };
  };

  return (
    <div className="Schedule-top-container">
      <div className="Schedule-Header-container">
        <div className="Schedule-Header-left">
          <ToggleButton
            leftButtonTitle="이번주스케줄"
            rightButtonTitle="전체스케줄"
            leftOrRight={leftOrRight}
            setLeftOrRight={setLeftOrRight}
          ></ToggleButton>
        </div>
        <div className="Schedule-Header-right">
          <button
            className="add-Schedule-button page-header-button"
            onClick={() => setWriteModal(true)}
          >
            스케줄추가
          </button>
        </div>
      </div>

      {writeModalState && (
        <WriteModal>
          <CreateSchedule
            setWeekScheduleList={setWeekScheduleList}
            setTotalScheduleList={setTotalScheduleList}
          ></CreateSchedule>
        </WriteModal>
      )}
      {readModalState && (
        <ReadModal>
          <ScheduleDetail
            scheduleDetail={scheduleDetail}
            setTotalScheduleList={setTotalScheduleList}
            setWeekScheduleList={setWeekScheduleList}
            setScheduleToShow={setScheduleToShow}
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
        ></ScheduleTotalView>
      )}
    </div>
  );
};
export default Schedule;
