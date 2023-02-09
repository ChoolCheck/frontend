import * as type from "../Types";

export const SETWRITEMODAL = "handleWriteodal/SETWRITEMODAL" as const;

export const setWriteModalOpen = (writeModalState: boolean) => ({
  type: SETWRITEMODAL,
  payload: writeModalState,
});
