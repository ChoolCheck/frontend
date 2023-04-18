import React, { useState, useEffect, useCallback } from "react";
import { addMonths, subMonths } from "date-fns";

import RenderHeader from "./RenderHeader";
import RenderCells from "./RenderCells";
import RenderDays from "./RenderDays";

import { GetTotalCalendarApi } from "../../../api/calendar";
import "../style/calendar.scss";
import * as type from "../type";
import memoIcon from "../../../static/icon/stickyNote.png";

import { setCalendarList } from "../../../Redux/Actions/handleCalendarList";
import { setMemoFlagList } from "../../../Redux/Actions/handleMemoFlagList";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Reducers/rootReducer";

export const Calendar = ({
  onCalendarClick,
  onCreateWorkcheckClick,
  onCreateMemoClick,
}: type.calendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const now = new Date();

  const dispatch = useDispatch();

  const totalWorkCheckList = useSelector(
    (state: RootState) => state.TotalWorkcheckListReducer.totalWorkcheckList
  );
  const calendarList = useSelector(
    (state: RootState) => state.CalendarReducer.calendarList
  );
  const memoFlagList = useSelector(
    (state: RootState) => state.MemoFlagReducer.memoFlagList
  );

  const setCalendarlist = useCallback(
    (calendarList: type.calendarListProps[]) =>
      dispatch(setCalendarList(calendarList)),
    [dispatch]
  );

  const setMemoFlaglist = useCallback(
    (memoFlagList: type.memoFlagListProps[]) =>
      dispatch(setMemoFlagList(memoFlagList)),
    [dispatch]
  );

  useEffect(() => {
    GetTotalCalendarApi({
      date: currentMonth,
      setCalendarlist,
      setMemoFlaglist,
    });
  }, [totalWorkCheckList]);

  useEffect(() => {
    renderData();
  }, [calendarList]);

  useEffect(() => {
    renderMemo();
  }, [memoFlagList]);

  const renderMemo = () => {
    if (memoFlagList) {
      for (let i = 0; i < memoFlagList.length; i++) {
        const cell = document.getElementById(memoFlagList[i].date);
        if (cell) {
          // 특정 날에 대해 memo가 있으면 memoFlagValue[0].exist = true
          // 특정 날에 대해 memo가 없으면 memoFlagValue[0].exist = false
          const memoFlagValue = memoFlagList.filter(
            (value) => value.date == memoFlagList[i].date
          );

          //memo가 있을 때, memoFlag 넣을 span 태그가 없을 때
          if (memoFlagValue[0].exist && !cell.childNodes[0].childNodes[1]) {
            const memoFlag = document.createElement("img");
            memoFlag.className = "memoFlag";
            memoFlag.src = memoIcon;
            cell.childNodes[0].appendChild(memoFlag);
          }
        }
      }
    }
  };

  const renderData = () => {
    const prevItemContainerCells =
      document.querySelectorAll(".calendarContainer");

    prevItemContainerCells.forEach((cell) => {
      cell.remove();
    });

    const prevItemCells = document.querySelectorAll(".calendarItem");

    prevItemCells.forEach((cell) => {
      cell.remove();
    });

    if (calendarList) {
      for (let i = 0; i < calendarList.length; i++) {
        const cell = document.getElementById(calendarList[i].date);
        let calendarItemContainer;
        if (cell) {
          if (cell.childNodes.length > 1) {
            calendarItemContainer = cell.childNodes[1];
          } else {
            calendarItemContainer = document.createElement("div");
            calendarItemContainer.className = "calendarContainer";
            cell?.appendChild(calendarItemContainer);
          }
        }

        const cellDate = new Date(calendarList[i].date);
        if (!cell?.classList.contains("disabled")) {
          const calendarItem = document.createElement("p");
          calendarItem.className = "calendarItem";

          //스케줄
          if (now <= cellDate) {
            calendarItem.innerText = calendarList[i].title;
            calendarItem.style.backgroundColor =
              calendarList[i].backgroundColor;
            calendarItem.style.color = calendarList[i].textColor;
          }
          //출근부
          else {
            const colorSpan = document.createElement("span");
            const titleSpan = document.createElement("span");
            colorSpan.className = "colorSpan";
            titleSpan.className = "titleSpan";

            colorSpan.style.backgroundColor = calendarList[i].backgroundColor;
            titleSpan.innerText = calendarList[i].title.substring(
              0,
              calendarList[i].title.length - 12
            );

            titleSpan.style.color = calendarList[i].textColor;

            calendarItem.appendChild(colorSpan);
            calendarItem.appendChild(titleSpan);
          }
          calendarItemContainer?.appendChild(calendarItem);
        }
      }
    }
  };

  const prevMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(subMonths(currentMonth, 1));

    GetTotalCalendarApi({
      date: currentMonth,
      setCalendarlist,
      setMemoFlaglist,
    });
  };

  const nextMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(addMonths(currentMonth, 1));

    GetTotalCalendarApi({
      date: currentMonth,
      setCalendarlist,
      setMemoFlaglist,
    });
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    onCalendarClick(day);
    return (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  };

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        onCreateWorkcheckClick={onCreateWorkcheckClick}
        onCreateMemoClick={onCreateMemoClick}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default Calendar;
