import { setReadModalOpen } from "./Actions/handleReadModal";
import { setWriteModalOpen } from "./Actions/handleWriteModal";
import { setTotalWorkcheckList } from "./Actions/handleTotalWorkcheckList";
import { setTotalElements } from "./Actions/handleTotalElement";
import { setTotalPages } from "./Actions/handleTotalPages";
import { setPaginationFocus } from "./Actions/handlePaginationFocus";

export interface totalElement {
  totalElementState: number;
}

export interface totalpage {
  totalpageState: number;
}

export interface pagination {
  paginationState: string;
}

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

export type handleTotalElement = ReturnType<typeof setTotalElements>;

export type handleTotalPage = ReturnType<typeof setTotalPages>;

export type handlePaginationFocus = ReturnType<typeof setPaginationFocus>;
