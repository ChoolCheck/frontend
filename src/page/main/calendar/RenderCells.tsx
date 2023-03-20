import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import * as type from "../type";

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
      const cellKey =
        cloneDay.getFullYear() +
        "-" +
        (cloneDay.getMonth() + 1 < 10
          ? "0" + (cloneDay.getMonth() + 1)
          : cloneDay.getMonth() + 1) +
        "-" +
        (cloneDay.getDate() < 10
          ? "0" + cloneDay.getDate()
          : cloneDay.getDate());

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
          key={cellKey}
          id={cellKey}
          onClick={() => onDateClick(cloneDay)}
        >
          <p
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : "text day"
            }
          >
            {formattedDate}
          </p>
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
  return (
    <div className="body" id="calendar-body">
      {rows}
    </div>
  );
};

export default RenderCells;
