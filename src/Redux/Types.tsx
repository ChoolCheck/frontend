import { setReadModalOpen } from "./Actions/handleReadModal";
import { setWriteModalOpen } from "./Actions/handleWriteModal";
import { setTotalWorkcheckList } from "./Actions/handleTotalWorkcheckList";

export interface readModal {
  readModalState: boolean;
}
export interface writeModal {
  writeModalState: boolean;
}

export interface totalWorkcheckList {
  totalWorkcheckList: workcheckObjProps[] | undefined;
}

export interface workcheckObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}

export type handleReadModal = ReturnType<typeof setReadModalOpen>;

export type handleWriteModal = ReturnType<typeof setWriteModalOpen>;

export type handleTotalWorkcheckList = ReturnType<typeof setTotalWorkcheckList>;
