import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import * as type from "./type";
import "./style/calendarDetailView.scss";
import threeDots from "../../static/icon/three-dots.png";

const CalendarDetailView = ({
  calendarDetailScheduleList,
  calendarDetailWorkcheckList,
  memo,
  onModalOpen,
  onModalClose,
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
        <button className="close-button" onClick={() => onModalClose()}>
          닫기
        </button>

        <div className="list-top-container">
          <div className="checkedWorkList-container">
            <h2>출근부</h2>
            <ul className="ul">
              {calendarDetailWorkcheckList &&
                calendarDetailWorkcheckList.map((item) => (
                  <li className="li">
                    <span>
                      <span
                        className="li-color"
                        style={{ backgroundColor: item.backgroundColor }}
                      >
                        &nbsp;&nbsp;&nbsp;
                      </span>
                      <span className="li-name">{item.name}</span>
                    </span>

                    <span className="li-time">{item.time}</span>
                    <span className="li-totalWorkTime">
                      {item.totalWorkTime}시간
                    </span>
                    <span className="li-workType">
                      {item.workType != null ? item.workType : ""}
                    </span>
                    <img
                      className="seeMore-button"
                      src={threeDots}
                      onClick={() => {}}
                    ></img>
                  </li>
                ))}
            </ul>
          </div>

          <div className="scheduleList-container">
            <h2>스케줄</h2>
            <ul className="ul">
              {calendarDetailScheduleList &&
                calendarDetailScheduleList.map((item) => (
                  <li className="li">
                    <span
                      className="li-color"
                      style={{ backgroundColor: item.backgroundColor }}
                    >
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="li-name">{item.name}</span>
                    <span className="li-time">{item.time} </span>
                    <span className="li-workType">
                      {item.workType != null ? item.workType : ""}
                    </span>
                    <img
                      className="seeMore-button"
                      src={threeDots}
                      onClick={() => {}}
                    ></img>
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
            onModalClose();
          }}
        >
          출근부 작성
        </button>
      </div>
    </div>
  );
};

export default CalendarDetailView;
