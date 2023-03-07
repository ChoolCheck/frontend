import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";

import * as type from "./type";
import { GetDetailCalendarApi, GetTotalCalendarApi } from "../../api/calendar";
import "./style/calendarView.scss";

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  onCreateWorkcheckClick,
  onCreateMemoClick,
}: type.renderheaderProps) => {
  return (
    <div className="CalendarView-container">
      <div className="header row">
        <div className="col col-start">
          <h2 className="text">
            <span className="text month">
              {format(currentMonth, "M")}월&nbsp;
            </span>
            {format(currentMonth, "yyyy")}
          </h2>
        </div>

        <div className="col col-end">
          <button
            className="createWorkcheckButton"
            onClick={onCreateWorkcheckClick}
          >
            출근부 작성하기
          </button>
          <button className="createMemoButton" onClick={onCreateMemoClick}>
            메모 작성하기
          </button>
          <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
          <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
        </div>
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Mon", "Thu", "Wed", "Thrs", "Fri", "Sat", "Sun"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }
  return <div className="days row">{days}</div>;
};

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
}: type.rendercellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;

      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={
            cloneDay.getFullYear() +
            "-" +
            (cloneDay.getMonth() + 1 < 10
              ? "0" + (cloneDay.getMonth() + 1)
              : cloneDay.getMonth() + 1) +
            "-" +
            (cloneDay.getDate() < 10
              ? "0" + cloneDay.getDate()
              : cloneDay.getDate())
          }
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div
        className="row"
        key={
          day.getFullYear() +
          "-" +
          (day.getMonth() + 1 < 10
            ? "0" + (day.getMonth() + 1)
            : day.getMonth() + 1) +
          "-" +
          (day.getDate() < 10 ? "0" + day.getDate() : day.getDate())
        }
      >
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const CalendarView = ({
  calendarTotalList,
  onCalendarClick,
  onCreateWorkcheckClick,
  onCreateMemoClick,
  setCalendarTotalList,
}: type.calendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  console.log(calendarTotalList);

  const prevMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(subMonths(currentMonth, 1));
    const date = (
      currentMonth.getFullYear() +
      "-" +
      (currentMonth.getMonth() == 0 ? 12 : currentMonth.getMonth()) +
      "-01"
    ).toString();

    GetTotalCalendarApi({ date, setCalendarTotalList });
  };

  const nextMonth = (e: React.MouseEvent<SVGSVGElement>) => {
    setCurrentMonth(addMonths(currentMonth, 1));

    const date = (
      currentMonth.getFullYear() +
      "-" +
      (currentMonth.getMonth() + 2 == 13 ? 1 : currentMonth.getMonth() + 2) +
      "-01"
    ).toString();

    GetTotalCalendarApi({ date, setCalendarTotalList });
  };

  const onDateClick = (day: Date) => {
    console.log(day);

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
