import * as type from "../Types";
import { SET_TOTAL_PAGES } from "../Actions/handleTotalPages";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const totalPageInitialState: type.totalpage = {
  totalpageState: 0,
};

const totalpageState = createReducer<type.totalpage, type.handleTotalPage>(
  totalPageInitialState,
  {
    [SET_TOTAL_PAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.totalpageState = action.payload;
      }),
  }
);

export default totalpageState;
