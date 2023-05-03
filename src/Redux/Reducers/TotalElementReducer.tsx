import * as type from "../Types";
import { SET_TOTAL_ELEMENTS } from "../Actions/handleTotalElement";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const totalElementInitialState: type.totalElement = {
  totalElementState: 0,
};

const totalElementState = createReducer<
  type.totalElement,
  type.handleTotalElement
>(totalElementInitialState, {
  [SET_TOTAL_ELEMENTS]: (state, action) =>
    produce(state, (draft) => {
      draft.totalElementState = action.payload;
    }),
});

export default totalElementState;
