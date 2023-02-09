import * as type from "../Types";
import { SETREADMODAL } from "../Actions/handleReadModal";
import produce from "immer";
import { createReducer } from "typesafe-actions";

export const initialState: type.readModal = {
  readModalState: false,
};

//draft : 기존의 state, action : 새로운 action
const readModalState = createReducer<type.readModal, type.handleReadModal>(
  initialState,
  {
    [SETREADMODAL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.readModalState = action.payload;
      }),
  }
);

export default readModalState;
