import * as type from "../type";
import TotalWorkTime from "../../../components/common/TotalWorkTime";

const WorkCheckDetailView = ({
  id,
  workcheckDetail,
  onUpdateClick,
  onDeleteClick,
}: type.workcheckDetailViewProps) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="employeeDetailView-container">
      <h3>출근부 정보</h3>
      {workcheckDetail && (
        <div className="detail-info">
          <p className="modal-date">
            <span className="detail-title">날짜</span>
            <span className="detail-content detail-date">
              {workcheckDetail.date}(
              {day[new Date(workcheckDetail.date).getDay()]})
            </span>
          </p>
          <p className="modal-name">
            <span className="detail-title">이름</span>
            <span className="detail-content detail-name">
              {workcheckDetail.name}
            </span>
          </p>
          <p className="modal-worktype">
            <span className="detail-title">근무형태</span>
            <span className="detail-content detail-worktype">
              {workcheckDetail.hours == null ? "없음" : workcheckDetail.hours}
            </span>
          </p>
          <p className="modal-time">
            <span className="detail-title">시간</span>
            <span className="detail-content detail-time">
              {workcheckDetail.startTime.substring(0, 5)} -
              {workcheckDetail.endTime.substring(0, 5)}
            </span>
          </p>
          <p className="modal-totalWorkTime">
            <span className="detail-title">총 근무시간</span>
            <span className="detail-content detail-totalWorkTime">
              <TotalWorkTime
                startDate={workcheckDetail.date}
                endDate={workcheckDetail.date}
                startTime={workcheckDetail.startTime}
                endTime={workcheckDetail.endTime}
              ></TotalWorkTime>
            </span>
          </p>
        </div>
      )}
      <div className="modal-read-button-container">
        <button className="update-button" onClick={onUpdateClick}>
          출근부 수정
        </button>
        <button className="delete-button" onClick={onDeleteClick(id)}>
          출근부 삭제
        </button>
      </div>
    </div>
  );
};

export default WorkCheckDetailView;
