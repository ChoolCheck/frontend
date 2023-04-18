import { setReadModalOpen } from "./Actions/handleReadModal";
import { setWriteModalOpen } from "./Actions/handleWriteModal";
import { setTotalWorkcheckList } from "./Actions/handleTotalWorkcheckList";
import { setTotalElements } from "./Actions/handleTotalElement";
import { setTotalPages } from "./Actions/handleTotalPages";
import { setPaginationFocus } from "./Actions/handlePaginationFocus";
import { setCalendarList } from "./Actions/handleCalendarList";
import { setMemoFlagList } from "./Actions/handleMemoFlagList";

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

export interface calendarList {
  calendarList: calendarListProps[] | undefined;
}

export interface calendarListProps {
  title: string;
  date: string;
  textColor: string;
  backgroundColor: string;
}

export interface memoFlagListProps {
  date: string;
  exist: boolean;
}

export interface memoFlagList {
  memoFlagList: memoFlagListProps[] | undefined;
}

export type handleReadModal = ReturnType<typeof setReadModalOpen>;

export type handleWriteModal = ReturnType<typeof setWriteModalOpen>;

export type handleTotalWorkcheckList = ReturnType<typeof setTotalWorkcheckList>;

export type handleTotalElement = ReturnType<typeof setTotalElements>;

export type handleTotalPage = ReturnType<typeof setTotalPages>;

export type handlePaginationFocus = ReturnType<typeof setPaginationFocus>;

export type handleCalendarList = ReturnType<typeof setCalendarList>;

export type handleMemoFlagList = ReturnType<typeof setMemoFlagList>;
