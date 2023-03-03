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

  useEffect(() => {
    GetTotalCalendarApi({ calendarTotalList, setCalendarTotalList });
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
  // const calendarData = [
  //   {
  //     title: "김어진 11:00-14:00",date: "2023-02-18",
  //     textColor: "#727272",backgroundColor: "#ffadad",
  //   },
  //   {
  //     title: "이예빈 14:00-18:00", date: "2023-02-22",
  //     textColor: "black",backgroundColor: "#ffd6a5",
  //   },
  // ];

  // const calendarDetailData = {
  //   scheduleList: [
  //     {
  //       name: "옥수수판매합니다",
  //       time: "17:00-21:00",
  //       date: "2023-02-18",
  //       backgroundColor: "#a0c4ff",
  //     },
  //     {
  //       name: "감자밭",
  //       time: "18:00-22:00",
  //       date: "2023-02-12",
  //       backgroundColor: "#bdb2ff",
  //       workType: "마감",
  //     },
  //   ],
  //   checkedWorkList: [
  //     {
  //       name: "김어진",
  //       time: "09:00-13:00",
  //       totalWorkTime: "4",
  //       date: "2023-02-18",
  //       backgroundColor: "#ffadad",
  //       workType: "오픈",
  //     },
  //   ],
  //   memo: "오늘 7시에 10명 단체 예약 있어요. 금요일 마감 알바 대타 구합니다",
  // };

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
      calendarDetailScheduleList,
      calendarDetailWorkcheckList,
      setMemo,
    });
  };
  const onCreateWorkcheckClick = (ev: MouseEvent, element: HTMLElement) => {
    setWriteModal(true);
    setSelectedModal("workcheck");
  };
  const onCreateMemoClick = (ev: MouseEvent, element: HTMLElement) => {
    setWriteModal(true);
    setSelectedModal("memo");
  };

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
      ></CalendarView>
    </div>
  );
};

export default Calendar;
