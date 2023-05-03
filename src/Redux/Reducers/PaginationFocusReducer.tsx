import * as type from "../Types";
import { SETPAGINATION } from "../Actions/handlePaginationFocus";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const paginationInitialState: type.pagination = {
  paginationState: "total",
};

const paginationState = createReducer<
  type.pagination,
  type.handlePaginationFocus
>(paginationInitialState, {
  [SETPAGINATION]: (state, action) =>
    produce(state, (draft) => {
      draft.paginationState = action.payload;
    }),
});

export default paginationState;
