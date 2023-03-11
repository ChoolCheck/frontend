import * as type from "./type";

const MemoDetailView = ({
  onUpdateClick,
  onDeleteClick,
  memoDetail,
}: type.memoDetailViewProps) => {
  return (
    <div className="employeeDetailView-container">
      <h3>메모 정보</h3>
      <div className="detail-info">
        <p className="modal-date">
          <span className="detail-title">날짜</span>
          <span className="detail-content detail-date">{memoDetail?.date}</span>
        </p>
        <p className="modal-content">
          <span className="detail-title">내용</span>
          <span className="detail-content detail-memocontent">
            {memoDetail?.content}
          </span>
        </p>
      </div>
      <div className="modal-read-button-container">
        <button className="update-button" onClick={onUpdateClick}>
          메모 수정
        </button>
        <button
          className="delete-button"
          onClick={onDeleteClick(memoDetail ? memoDetail.id : 0)}
        >
          메모 삭제
        </button>
      </div>
    </div>
  );
};

export default MemoDetailView;
