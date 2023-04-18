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
  date: Date;
  setCalendarlist: (calendarList: reducerType.calendarListProps[]) => {
    type: "handleCalendarList/SETCALENDARLIST";
    payload: reducerType.calendarListProps[] | undefined;
  };
  setMemoFlaglist: (memoFlagList: reducerType.memoFlagListProps[]) => {
    type: "handleMemoFlagList/SETMEMOLIST";
    payload: reducerType.memoFlagListProps[] | undefined;
  };
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
