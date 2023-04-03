import * as type from "../Types";
import { SETWRITEMODAL } from "../Actions/handleWriteModal";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.writeModal = {
  writeModalState: false,
};

//draft : 기존의 state, action : 새로운 action
const writeModalState = createReducer<type.writeModal, type.handleWriteModal>(
  initialState,
  {
    [SETWRITEMODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.writeModalState = action.payload;
        if (action.payload) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "unset";
        }
      }),
  }
);

export default writeModalState;
