import React, { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";

import RenderHeader from "./RenderHeader";
import RenderCells from "./RenderCells";
import RenderDays from "./RenderDays";

import { GetTotalCalendarApi } from "../../../api/calendar";
import "../style/calendarView.scss";
import * as type from "../type";

export const CalendarView = ({
  calendarTotalList,
  onCalendarClick,
  onCreateWorkcheckClick,
  onCreateMemoClick,
  setCalendarTotalList,
}: type.calendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const now = new Date();
    const date =
      now.getFullYear() +
      "-" +
      (now.getMonth() + 1 < 10
        ? "0" + (now.getMonth() + 1)
        : now.getMonth() + 1) +
      "-" +
      (now.getDate() + 1 < 10 ? "0" + (now.getDate() + 1) : now.getDate() + 1);

    GetTotalCalendarApi({ date, setCalendarTotalList, renderData });
  }, []);

  const renderData = (calendarTotalList: type.calendarListType[]) => {
    const prevItemContainerCells = document.getElementById("classitem");
    prevItemContainerCells?.remove();

    const prevItemCells = document.getElementById("classitem");
    prevItemCells?.remove();

    if (calendarTotalList) {
      for (let i = 0; i < calendarTotalList?.length; i++) {
        const cell = document.getElementById(calendarTotalList[i].date);
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

        if (cell?.classList.contains("disabled")) continue;
        else {
          const calendarItem = document.createElement("p");
          calendarItem.className = "calendarItem";
          calendarItem.id = "classitem";
          calendarItem.innerText = calendarTotalList[i].title;
          calendarItem.style.backgroundColor =
            calendarTotalList[i].backgroundColor;
          calendarItemContainer?.appendChild(calendarItem);
        }
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

    GetTotalCalendarApi({ date, setCalendarTotalList, renderData });
  };

  const nextMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(addMonths(currentMonth, 1));

    const date = (
      currentMonth.getFullYear() +
      "-" +
      (currentMonth.getMonth() + 2 == 13 ? 1 : currentMonth.getMonth() + 2) +
      "-01"
    ).toString();

    GetTotalCalendarApi({ date, setCalendarTotalList, renderData });
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
