import * as type from "../Types";
import { SETCALENDARLIST } from "../Actions/handleCalendarList";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.calendarList = {
  calendarList: undefined,
};

const calendarList = createReducer<type.calendarList, type.handleCalendarList>(
  initialState,
  {
    [SETCALENDARLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.calendarList = action.payload;
      }),
  }
);

export default calendarList;
