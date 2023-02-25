import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import { GetWeekScheduleApi } from "../../api/schedule";
import { GetTotalScheduleApi } from "../../api/schedule";
import { GetEmployeeApi } from "../../api/manage";

import ScheduleWeeklyView from "./ScheduleWeeklyView";
import ScheduleTotalView from "./ScheduleTotalView";
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
  const [leftOrRight, setLeftOrRight] = useState(true);

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

  const filterTotalList = (name: string) => {
    if (name == "total") {
      setScheduleToShow(totalScheduleList);
    } else if (name != "total"&&totalScheduleList) {
        const filteredList = totalScheduleList.filter((item) => {
          if (item.name == name) {
            return true;
          }
        });
        console.log(filteredList);
        // setScheduleToShow(filteredList);
      }
    }
  };

  useEffect(() => {
    GetWeekScheduleApi({ setWeekScheduleList });
    GetTotalScheduleApi({ setTotalScheduleList });
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onShowNameButtonClick = (name: string) => {
    filterTotalList(name);
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
    };
  };

  const onShowTotalButtonClick = () => {
    filterTotalList("total");
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
    };
  };

  const onWeekItemClick = (id: number) => {
    return (e: React.MouseEventHandler<HTMLLIElement>) => {
      setReadModal(true);
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
          ></CreateSchedule>
        </WriteModal>
      )}

      {readModalState && (
        <ReadModal>
          <ScheduleDetail></ScheduleDetail>
        </ReadModal>
      )}

      {leftOrRight ? (
        <ScheduleWeeklyView
          weekScheduleList={weekScheduleList}
          onWeekItemClick={onWeekItemClick}
        ></ScheduleWeeklyView>
      ) : (
        <ScheduleTotalView
          scheduleToShow={scheduleToShow}
          employeeList={employeeList}
          totalScheduleList={totalScheduleList}
          onShowNameButtonClick={onShowNameButtonClick}
          onShowTotalButtonClick={onShowTotalButtonClick}
        ></ScheduleTotalView>
      )}
    </div>
  );
};
export default Schedule;
