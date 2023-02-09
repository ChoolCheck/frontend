import * as type from "../Types";

export const SETREADMODAL = "handleReadModal/SETREADMODAL" as const;

export const setReadModalOpen = (readModalState: boolean) => ({
  type: SETREADMODAL,
  payload: readModalState,
});
