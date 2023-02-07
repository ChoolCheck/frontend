import React, { useEffect, useState } from "react";
import CalendarView from "./CalendarView";
import CalendarDetailView from "./CalendarDetailView";

const Calendar = () => {
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
        time: "09-13",
        date: "2023-02-18",
        backgroundColor: "#a0c4ff",
      },
      {
        name: "이예빈",
        time: "12-17",
        date: "2023-02-18",
        backgroundColor: "#ffd6a5",
      },
    ],
    checkedWorkList: [
      {
        name: "김어진",
        time: "09-13",
        totalWorkTime: "4",
        date: "2023-02-18",
        backgroundColor: "#ffadad",
      },
      {
        name: "고구마",
        time: "12-18",
        totalWorkTime: "6",
        date: "2023-02-18",
        backgroundColor: "#fdffb6",
      },
      {
        name: "감자밭",
        time: "12-18",
        totalWorkTime: "6",
        date: "2023-02-12",
        backgroundColor: "#bdb2ff",
      },
    ],
    memo: "오늘 7시에 10명 단체 예약 있어요. 금요일 마감 알바 대타 구합니다",
  };

  const [detailModalOpen, setDetailModalOpen] = useState(false);
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
  return (
    <div className="Calendar-top-container">
      {detailModalOpen && (
        <CalendarDetailView
          calendarDetailData={calendarDetailData}
          detailModalOpen={detailModalOpen}
          setDetailModalOpen={setDetailModalOpen}
        ></CalendarDetailView>
      )}
      <CalendarView
        calendarData={calendarData}
        onCalendarClick={onCalendarClick}
      ></CalendarView>
    </div>
  );
};

export default Calendar;
