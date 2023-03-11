import React, { useEffect, useState, useCallback } from "react";
import CalendarDetailView from "./CalendarDetailView";
import WriteModal from "../../components/modal/WriteModal";
import CreateWorkCheck from "../workCheck/CreateWorkCheck";
import CreateMemo from "../memo/CreateMemo";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import { GetDetailCalendarApi, GetTotalCalendarApi } from "../../api/calendar";
import * as type from "./type";
import "./style/calendarView.scss";

import { CalendarView } from "./calendar/Calendar";
import MemoDetail from "../memo/MemoDetail";

const Calendar = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const readModalState = useSelector(
    (state: RootState) => state.ReadModalReducer.readModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [selectedModal, setSelectedModal] = useState<string>("");

  const [calendarTotalList, setCalendarTotalList] = useState<
    type.calendarListType[] | undefined
  >();

  const [calendarDetailScheduleList, setCalendarDetailScheduleList] = useState<
    type.calendarDetailType[] | undefined
  >();

  const [calendarDetailWorkcheckList, setCalendarDetailWorkcheckList] =
    useState<type.calendarDetailType[] | undefined>();

  const [memo, setMemo] = useState<
    {
      id: number;
      date: string;
      content: string;
    }[]
  >();

  const [selectedMemo, setSelectedMemo] = useState<{
    id: number;
    date: string;
    content: string;
  }>();

  const onCalendarClick = (nowDate: Date) => {
    const date = (
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1 < 10
        ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1) +
      "-" +
      (nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate())
    ).toString();

    GetDetailCalendarApi({
      setDetailModalOpen,
      date,
      setCalendarDetailScheduleList,
      setCalendarDetailWorkcheckList,
      setMemo,
    });
  };

  const onCreateWorkcheckClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteModal(true);
    setSelectedModal("workcheck");
  };

  const onCreateMemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteModal(true);
    setSelectedModal("memo");
  };

  const onMemoClick = (item: type.memoProps) => {
    return (e: React.MouseEvent<HTMLParagraphElement>) => {
      setDetailModalOpen(false);
      setSelectedMemo(item);
      setReadModal(true);
    };
  };

  return (
    <div className="Calendar-top-container">
      {readModalState && <MemoDetail memoDetail={selectedMemo}></MemoDetail>}

      {detailModalOpen && (
        <CalendarDetailView
          calendarDetailScheduleList={calendarDetailScheduleList}
          calendarDetailWorkcheckList={calendarDetailWorkcheckList}
          memo={memo}
          setDetailModalOpen={setDetailModalOpen}
          setSelectedModal={setSelectedModal}
          onMemoClick={onMemoClick}
        ></CalendarDetailView>
      )}

      {writeModalState && (
        <WriteModal>
          {selectedModal == "workcheck" ? (
            <CreateWorkCheck></CreateWorkCheck>
          ) : (
            <CreateMemo></CreateMemo>
          )}
        </WriteModal>
      )}
      <CalendarView
        setCalendarTotalList={setCalendarTotalList}
        calendarTotalList={calendarTotalList}
        onCalendarClick={onCalendarClick}
        onCreateWorkcheckClick={onCreateWorkcheckClick}
        onCreateMemoClick={onCreateMemoClick}
      ></CalendarView>
    </div>
  );
};

export default Calendar;
