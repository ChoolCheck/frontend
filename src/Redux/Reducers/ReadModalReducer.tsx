import * as type from "../Types";
import { SETREADMODAL } from "../Actions/handleReadModal";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.readModal = {
  readModalState: false,
};

const readModalState = createReducer<type.readModal, type.handleReadModal>(
  initialState,
  {
    [SETREADMODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.readModalState = action.payload;
        if (action.payload) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "unset";
        }
      }),
  }
);

export default readModalState;
