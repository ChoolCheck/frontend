import * as calendarType from "../../page/main/type";
import * as reducerType from "../../Redux/Types";
export interface calendarListType {
  title: string;
  date: string;
  textColor: string;
  backgroundColor: string;
}
export interface calendarDetailType {
  name: string;
  time: string;
  totalWorkTime: number;
  backgroundColor: string;
  workType: string | null;
}

export interface getTotalCalendarProps {
  date: string;
  setCalendarList: (
    calendarList: reducerType.calendarListProps[] | undefined
  ) => {
    type: "handleCalendarList/SETCALENDARLIST";
    payload: reducerType.calendarListProps[] | undefined;
  };

  renderData: (memoFlagList: calendarType.memoFlagProps[]) => void;
}

export interface getDetailCalendarProps {
  onModalOpen: () => void;
  setCalendarDetailScheduleList: React.Dispatch<
    React.SetStateAction<calendarDetailType[] | undefined>
  >;
  setCalendarDetailWorkcheckList: React.Dispatch<
    React.SetStateAction<calendarDetailType[] | undefined>
  >;
  date: string;
  setMemo: React.Dispatch<React.SetStateAction<memoProps[] | undefined>>;
}
export interface memoProps {
  id: number;
  date: string;
  content: string;
}
