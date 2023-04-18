import * as type from "../Types";

export const SETCALENDARLIST = "handleCalendarlist/SETCALENDARLIST" as const;

export const setCalendarList = (
  calendarList: type.calendarListProps[] | undefined
) => ({
  type: SETCALENDARLIST,
  payload: calendarList,
});
