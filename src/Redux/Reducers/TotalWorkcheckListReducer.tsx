import * as type from "../Types";
import { SETTOTALWORKCHECKLIST } from "../Actions/handleTotalWorkcheckList";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.totalWorkcheckList = {
  totalWorkcheckList: undefined,
};

//draft : 기존의 state, action : 새로운 action
const totalWorkcheckList = createReducer<
  type.totalWorkcheckList,
  type.handleTotalWorkcheckList
>(initialState, {
  [SETTOTALWORKCHECKLIST]: (state, action) =>
    produce(state, (draft) => {
      draft.totalWorkcheckList = action.payload;
    }),
});

export default totalWorkcheckList;
