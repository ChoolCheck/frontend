import * as type from "../Types";
import { SETMEMOLIST } from "../Actions/handleMemoFlagList";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.memoFlagList = {
  memoFlagList: undefined,
};

const memoFlagList = createReducer<type.memoFlagList, type.handleMemoFlagList>(
  initialState,
  {
    [SETMEMOLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.memoFlagList = action.payload;
      }),
  }
);

export default memoFlagList;
