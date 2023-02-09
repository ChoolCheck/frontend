import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import ScheduleWeeklyView from "./ScheduleWeeklyView";
import ScheduleTotalView from "./ScheduleTotalView";
import ToggleButton from "../../components/button/ToggleButton";
import CreateSchedule from "./CreateSchedule";
import WriteModal from "../../components/modal/WriteModal";
import "./schedule.scss";

const Schedule = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );
  const [leftOrRight, setLeftOrRight] = useState(true);

  const scheduleTotal = {
    totalList: [
      {
        day: "월",
        date: "01/02",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        workType: "직원",
        backgroundColor: "#ffd6a5",
      },
      {
        day: "월",
        date: "01/02",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        workType: "직원",

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
    ],
  };

  const scheduleWeekly = [
    {
      day: "월요일",
      date: "01/02",
      schedule: [
        { name: "김어진", time: "10:00-14:00", backgroundColor: "#ffd6a5" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
    {
      day: "화요일",
      date: "01/03",
      schedule: [
        { name: "김어진", time: "10:00-14:00", backgroundColor: "#ffd6a5" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
    {
      day: "수요일",
      date: "01/04",
      schedule: [
        { name: "김어진", time: "10:00-14:00", backgroundColor: "#ffd6a5" },
      ],
    },
    {
      day: "목요일",
      date: "01/05",
      schedule: [
        { name: "고구마", time: "10:00-14:00", backgroundColor: "#fdffb6" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
    {
      day: "금요일",
      date: "01/06",
      schedule: [
        { name: "옥수수", time: "10:00-14:00", backgroundColor: "#a0c4ff" },
        { name: "감자밭", time: "13:00-18:00", backgroundColor: "#bdb2ff" },
      ],
    },
    {
      day: "토요일",
      date: "01/07",
      schedule: [
        { name: "감자밭", time: "10:00-14:00", backgroundColor: "#a0c4ff" },
        { name: "고구마", time: "13:00-18:00", backgroundColor: "#fdffb6" },
      ],
    },
    {
      day: "일요일",
      date: "01/08",
      schedule: [
        { name: "고구마", time: "10:00-14:00", backgroundColor: "#fdffb6" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
  ];

  const [scheduleTotalList, setScheduleTotalList] = useState(scheduleTotal);
  const [scheduleWeeklyList, setSheduleWeeklyList] = useState(scheduleWeekly);

  const filterTotalList = (name: string) => {
    if (name == "total") {
      setScheduleTotalList(scheduleTotal);
    } else {
      const filteredList = scheduleTotal.totalList.filter((item) => {
        if (item.name == name) {
          return true;
        }
      });
      setScheduleTotalList({ ...scheduleTotal, totalList: filteredList });
    }
  };

  useEffect(() => {
    //scheduleTotalList(scheduleTotal);
  }, []);

  const onShowNameButtonClick = (name: string) => {
    filterTotalList(name);
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    };
  };

  const onShowTotalButtonClick = () => {
    filterTotalList("total");
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
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
          <CreateSchedule></CreateSchedule>
        </WriteModal>
      )}

      {leftOrRight ? (
        <ScheduleWeeklyView
          scheduleWeeklyList={scheduleWeeklyList}
        ></ScheduleWeeklyView>
      ) : (
        <ScheduleTotalView
          scheduleTotalList={scheduleTotalList}
          onShowNameButtonClick={onShowNameButtonClick}
          onShowTotalButtonClick={onShowTotalButtonClick}
        ></ScheduleTotalView>
      )}
    </div>
  );
};
export default Schedule;
