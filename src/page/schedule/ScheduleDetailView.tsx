import * as type from "./type";

import WriteModal from "../../components/modal/WriteModal";
import UpdateSchedule from "./UpdateSchedule";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

const ScheduleDetailView = ({
  scheduleDetail,
  onUpdateClick,
  setTotalScheduleList,
  setWeekScheduleList,
}: type.scheduleDetailViewProps) => {
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );
  const day = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="employeeDetailView-container">
      {writeModalState && (
        <WriteModal>
          <UpdateSchedule
            id={scheduleDetail ? scheduleDetail.id : 0}
            scheduleDetail={scheduleDetail}
            setWeekScheduleList={setWeekScheduleList}
            setTotalScheduleList={setTotalScheduleList}
          ></UpdateSchedule>
        </WriteModal>
      )}
      <h3>스케줄 정보</h3>
      <div className="detail-info">
        <p className="modal-date">
          <span className="detail-title">날짜</span>
          <span className="detail-content detail-date">
            {scheduleDetail && scheduleDetail.date}(
            {scheduleDetail && day[new Date(scheduleDetail.date).getDay()]})
          </span>
        </p>
        <p className="modal-name">
          <span className="detail-title">이름</span>
          <span className="detail-content detail-name">
            {scheduleDetail?.name}
          </span>
        </p>{" "}
        <p className="modal-worktype">
          <span className="detail-title">근무형태</span>
          <span className="detail-content detail-worktype">
            {scheduleDetail?.hours == null ? "없음" : scheduleDetail?.hours}
          </span>
        </p>
        <p className="modal-time">
          <span className="detail-title">시간</span>
          <span className="detail-content detail-time">
            {scheduleDetail?.startTime.substring(0, 5)} -
            {scheduleDetail?.endTime.substring(0, 5)}
          </span>
        </p>
        <p className="modal-totalWorkTime">
          <span className="detail-title">총 근무시간</span>
          <span className="detail-content detail-totalWorkTime">
            {scheduleDetail &&
              parseInt(scheduleDetail.endTime) -
                parseInt(scheduleDetail.startTime)}
            시간
          </span>
        </p>
      </div>
      <div className="modal-read-button-container">
        <button className="update-button" onClick={onUpdateClick}>
          스케줄 수정
        </button>
        <button className="delete-button">스케줄 삭제</button>
      </div>
    </div>
  );
};

export default ScheduleDetailView;
