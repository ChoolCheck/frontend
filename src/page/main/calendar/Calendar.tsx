import React, { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";

import RenderHeader from "./RenderHeader";
import RenderCells from "./RenderCells";
import RenderDays from "./RenderDays";

import { GetTotalCalendarApi } from "../../../api/calendar";
import "../style/calendar.scss";
import * as type from "../type";
import memoIcon from "../../static/icon/sticky-note.png";

export const Calendar = ({
  onCalendarClick,
  onCreateWorkcheckClick,
  onCreateMemoClick,
  setCalendarTotalList,
}: type.calendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const now = new Date();
  const date =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-" +
    (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());

  useEffect(() => {
    GetTotalCalendarApi({
      date,
      setCalendarTotalList,
      renderData,
    });
  }, []);

  const renderData = (
    calendarTotalList: type.calendarListType[],
    memoFlagList: type.memoFlagProps[]
  ) => {
    const prevItemContainerCells =
      document.querySelectorAll(".calendarContainer");

    prevItemContainerCells.forEach((cell) => {
      cell.remove();
    });

    const prevItemCells = document.querySelectorAll(".calendarItem");

    prevItemCells.forEach((cell) => {
      cell.remove();
    });

    for (let i = 0; i < calendarTotalList.length; i++) {
      const cell = document.getElementById(calendarTotalList[i].date);
      let calendarItemContainer;
      if (cell) {
        // 특정 날에 대해 memo가 있으면 memoFlagValue[0].exist = true
        // 특정 날에 대해 memo가 없으면 memoFlagValue[0].exist = false
        const memoFlagValue = memoFlagList
          ? memoFlagList.filter(
              (value) => value.date == calendarTotalList[i].date
            )
          : [{ date: calendarTotalList[i].date, exist: false }];

        //memo가 있을 때, memoFlag 넣을 span 태그가 없을 때
        if (memoFlagValue[0].exist && !cell.childNodes[0].childNodes[1]) {
          const memoFlag = document.createElement("img");
          memoFlag.className = "memoFlag";
          memoFlag.src = memoIcon;
          cell.childNodes[0].appendChild(memoFlag);
        }

        if (cell.childNodes.length > 1) {
          calendarItemContainer = cell.childNodes[1];
        } else {
          calendarItemContainer = document.createElement("div");
          calendarItemContainer.className = "calendarContainer";
          cell?.appendChild(calendarItemContainer);
        }
      }

      const cellDate = new Date(calendarTotalList[i].date);
      if (!cell?.classList.contains("disabled")) {
        const calendarItem = document.createElement("p");
        calendarItem.className = "calendarItem";

        //스케줄
        if (now <= cellDate) {
          calendarItem.innerText = calendarTotalList[i].title;
          calendarItem.style.backgroundColor =
            calendarTotalList[i].backgroundColor;
          calendarItem.style.color = calendarTotalList[i].textColor;
        }
        //출근부
        else {
          const colorSpan = document.createElement("span");
          const titleSpan = document.createElement("span");
          colorSpan.className = "colorSpan";
          titleSpan.className = "titleSpan";

          colorSpan.style.backgroundColor =
            calendarTotalList[i].backgroundColor;
          titleSpan.innerText = calendarTotalList[i].title.substring(
            0,
            calendarTotalList[i].title.length - 12
          );

          titleSpan.style.color = calendarTotalList[i].textColor;

          calendarItem.appendChild(colorSpan);
          calendarItem.appendChild(titleSpan);
        }
        calendarItemContainer?.appendChild(calendarItem);
      }
    }
  };

  const prevMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(subMonths(currentMonth, 1));
    const date = (
      currentMonth.getFullYear() +
      "-" +
      (currentMonth.getMonth() == 0 ? 12 : currentMonth.getMonth()) +
      "-01"
    ).toString();

    GetTotalCalendarApi({
      date,
      setCalendarTotalList,
      renderData,
    });
  };

  const nextMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(addMonths(currentMonth, 1));

    const date = (
      currentMonth.getFullYear() +
      "-" +
      (currentMonth.getMonth() + 2 == 13 ? 1 : currentMonth.getMonth() + 2) +
      "-01"
    ).toString();

    GetTotalCalendarApi({
      date,
      setCalendarTotalList,
      renderData,
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
