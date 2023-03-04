import React, { useEffect, useState, useCallback } from "react";
import CalendarView from "./CalendarView";
import CalendarDetailView from "./CalendarDetailView";
import WriteModal from "../../components/modal/WriteModal";
import CreateWorkCheck from "../workCheck/CreateWorkCheck";
import CreateMemo from "../memo/CreateMemo";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import { GetDetailCalendarApi, GetTotalCalendarApi } from "../../api/calendar";
import * as type from "./type";

const Calendar = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const now = new Date();
  const [nowDate, setNowDate] = useState(now);

  useEffect(() => {
    const now = new Date();
    const date =
      now.getFullYear() +
      "-" +
      (now.getMonth() + 1 < 10
        ? "0" + now.getMonth() + 1
        : now.getMonth() + 1) +
      "-" +
      now.getDay();
    GetTotalCalendarApi({ date, setCalendarTotalList });
  }, []);

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

  const [memo, setMemo] = useState("");

  const onCalendarClick = (calendarData: any) => {
    const date = (
      calendarData.event.start.getFullYear() +
      "-" +
      (calendarData.event.start.getMonth() + 1) +
      "-" +
      calendarData.event.start.getDate()
    ).toString();

    GetDetailCalendarApi({
      setDetailModalOpen,
      date,
      setCalendarDetailScheduleList,
      setCalendarDetailWorkcheckList,
      setMemo,
    });
  };

  const onLeftButtonClick = () => {
    const date = (
      nowDate.getFullYear() +
      "-" +
      nowDate.getMonth() +
      "-01"
    ).toString();
    GetTotalCalendarApi({ date, setCalendarTotalList });
  };

  const onRightButtonClick = () => {
    const date = (
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 2) +
      "-01"
    ).toString();
    GetTotalCalendarApi({ date, setCalendarTotalList });
  };

  const onCreateWorkcheckClick = (ev: MouseEvent, element: HTMLElement) => {
    setWriteModal(true);
    setSelectedModal("workcheck");
  };
  const onCreateMemoClick = (ev: MouseEvent, element: HTMLElement) => {
    setWriteModal(true);
    setSelectedModal("memo");
  };
  const prev = document.getElementsByClassName("fc-prev-button");
  const next = document.getElementsByClassName("fc-next-button");

  console.log(prev);
  console.log(prev[0]);

  // prev[0].addEventListener("click", () => {
  //   onLeftButtonClick();
  // });
  // next[0].addEventListener("click", () => {
  //   onRightButtonClick();
  // });
  return (
    <div className="Calendar-top-container">
      {detailModalOpen && (
        <CalendarDetailView
          calendarDetailScheduleList={calendarDetailScheduleList}
          calendarDetailWorkcheckList={calendarDetailWorkcheckList}
          memo={memo}
          setDetailModalOpen={setDetailModalOpen}
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
        calendarTotalList={calendarTotalList}
        onCalendarClick={onCalendarClick}
        onCreateWorkcheckClick={onCreateWorkcheckClick}
        onCreateMemoClick={onCreateMemoClick}
        onLeftButtonClick={onLeftButtonClick}
        onRightButtonClick={onRightButtonClick}
      ></CalendarView>
    </div>
  );
};

export default Calendar;
