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

const Calendar = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [selectedModal, setSelectedModal] = useState<string>("");
  const calendarData = [
    {
      title: "김어진 11-14",
      date: "2023-02-18",
      textColor: "#727272",
      backgroundColor: "#ffadad",
    },
    {
      title: "이예빈 14-18",
      date: "2023-02-18",
      textColor: "#727272",
      backgroundColor: "#ffd6a5",
    },
    {
      title: "이예빈 14-18",
      date: "2023-02-22",
      textColor: "black",
      backgroundColor: "#ffd6a5",
    },
  ];

  const calendarDetailData = {
    scheduleList: [
      {
        name: "옥수수판매합니다",
        time: "17-21",
        date: "2023-02-18",
        backgroundColor: "#a0c4ff",
      },
      {
        name: "이예빈",
        time: "15-17",
        date: "2023-02-18",
        backgroundColor: "#ffd6a5",
      },
      {
        name: "감자밭",
        time: "18-22",
        date: "2023-02-12",
        backgroundColor: "#bdb2ff",
        workType: "마감",
      },
    ],
    checkedWorkList: [
      {
        name: "김어진",
        time: "09-13",
        totalWorkTime: "4",
        date: "2023-02-18",
        backgroundColor: "#ffadad",
        workType: "오픈",
      },
      {
        name: "고구마",
        time: "11-15",
        totalWorkTime: "4",
        date: "2023-02-18",
        backgroundColor: "#fdffb6",
      },
    ],
    memo: "오늘 7시에 10명 단체 예약 있어요. 금요일 마감 알바 대타 구합니다",
  };

  const onCalendarClick = (calendarData: any) => {
    setDetailModalOpen(true);
    //back에서 해당 날짜에 대한 데이터 받고 detailmodal에 넘겨주기
    console.log(
      calendarData.event.start.getFullYear() +
        " " +
        calendarData.event.start.getMonth() +
        1 +
        " " +
        calendarData.event.start.getDate()
    );
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
          calendarDetailData={calendarDetailData}
          detailModalOpen={detailModalOpen}
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
        calendarData={calendarData}
        onCalendarClick={onCalendarClick}
        onCreateWorkcheckClick={onCreateWorkcheckClick}
        onCreateMemoClick={onCreateMemoClick}
      ></CalendarView>
    </div>
  );
};

export default Calendar;
