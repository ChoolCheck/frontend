import { useCallback } from "react";
import * as type from "./type";
import "./style/calendarDetailView.scss";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

const CalendarDetailView = ({
  calendarDetailScheduleList,
  calendarDetailWorkcheckList,
  memo,
  setDetailModalOpen,
  setSelectedModal,
  onMemoClick,
}: type.calendarDetailViewProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  return (
    <div className="CalendarDetailView-top-container">
      <div className="CalendarDetailView-container">
        <button
          className="close-button"
          onClick={() => setDetailModalOpen(false)}
        >
          닫기
        </button>

        <div className="list-top-container">
          <div className="checkedWorkList-container">
            <h2>출근부</h2>
            <ul className="checkedWorkList-ul">
              {calendarDetailWorkcheckList &&
                calendarDetailWorkcheckList.map((item) => (
                  <li className="checkedWorkList-li">
                    <span
                      className="checkedWorkList-li-color"
                      style={{ backgroundColor: item.backgroundColor }}
                    >
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="checkedWorkList-li-name">{item.name}</span>
                    <span className="checkedWorkList-li-time">{item.time}</span>
                    <span className="checkedWorkList-li-totalWorkTime">
                      {item.totalWorkTime}시간
                    </span>
                    <span className="checkedWorkList-li-workType">
                      {item.workType != null ? item.workType : ""}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="scheduleList-container">
            <h2>스케줄</h2>
            <ul className="scheduleList-ul">
              {calendarDetailScheduleList &&
                calendarDetailScheduleList.map((item) => (
                  <li className="scheduleList-li">
                    <span
                      className="scheduleList-li-color"
                      style={{ backgroundColor: item.backgroundColor }}
                    >
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="scheduleList-li-name">{item.name}</span>
                    <span className="scheduleList-li-time">{item.time} </span>
                    <span className="scheduleList-li-workType">
                      {item.workType != null ? item.workType : ""}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="memo-container">
          <h3 className="memo-container-header"> 메모</h3>
          {memo &&
            memo.map((item) => (
              <p className="memo-container-content" onClick={onMemoClick(item)}>
                -{item.content}
              </p>
            ))}
        </div>

        <button
          className="add-work-button"
          onClick={() => {
            setSelectedModal("createworkcheck");
            setWriteModal(true);
            setDetailModalOpen(false);
          }}
        >
          출근부 작성
        </button>
      </div>
    </div>
  );
};

export default CalendarDetailView;
