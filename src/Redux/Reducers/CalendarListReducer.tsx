import * as type from "../Types";
import { SETCALENDARLIST } from "../Actions/handleCalendarlist";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.calendarList = {
  calendarList: undefined,
};

const calendarList = createReducer<type.calendarList, type.handleCalendarlist>(
  initialState,
  {
    [SETCALENDARLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.calendarList = action.payload;
      }),
  }
);

export default calendarList;
