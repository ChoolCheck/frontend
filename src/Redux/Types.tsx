import { setReadModalOpen } from "./Actions/handleReadModal";
import { setWriteModalOpen } from "./Actions/handleWriteModal";

export interface readModal {
  readModalState: boolean;
}
export interface writeModal {
  writeModalState: boolean;
}

export type handleReadModal = ReturnType<typeof setReadModalOpen>;

export type handleWriteModal = ReturnType<typeof setWriteModalOpen>;
