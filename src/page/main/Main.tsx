import React, { useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import { GetDetailCalendarApi } from "../../api/calendar";

import WriteModal from "../../components/modal/WriteModal";

import Calendar from "./calendar/Calendar";
import CalendarDetailView from "./CalendarDetailView";
import CreateWorkCheck from "../workCheck/CreateWorkCheck";
import CreateMemo from "../memo/CreateMemo";
import MemoDetail from "../memo/MemoDetail";
import ReadModal from "../../components/modal/ReadModal";

import * as type from "./type";
import "./style/calendar.scss";

const Main = () => {
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

  const [memoDetail, setMemoDetail] = useState<{
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
    setSelectedModal("createworkcheck");
  };

  const onCreateMemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteModal(true);
    setSelectedModal("creatememo");
  };

  const onMemoClick = (item: type.memoProps) => {
    return (e: React.MouseEvent<HTMLParagraphElement>) => {
      setDetailModalOpen(false);
      setMemoDetail(item);
      setReadModal(true);
    };
  };

  return (
    <div className="Calendar-top-container">
      {readModalState && (
        <ReadModal>
          <MemoDetail
            memoDetail={memoDetail}
            setMemoDetail={setMemoDetail}
            setSelectedModal={setSelectedModal}
            selectedModal={selectedModal}
          ></MemoDetail>
        </ReadModal>
      )}

      {writeModalState && (
        <>
          {selectedModal == "createworkcheck" && (
            <WriteModal>
              <CreateWorkCheck></CreateWorkCheck>
            </WriteModal>
          )}
          {selectedModal == "creatememo" && (
            <WriteModal>
              <CreateMemo></CreateMemo>
            </WriteModal>
          )}
        </>
      )}

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

      <Calendar
        setCalendarTotalList={setCalendarTotalList}
        onCalendarClick={onCalendarClick}
        onCreateWorkcheckClick={onCreateWorkcheckClick}
        onCreateMemoClick={onCreateMemoClick}
      ></Calendar>
    </div>
  );
};

export default Main;
