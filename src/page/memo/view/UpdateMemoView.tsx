import * as type from "../type";

const UpdateMemoView = ({
  date,
  content,
  onChangeContent,
  onClickCancelOnModal,
  onClickCreate,
}: type.updateMemoViewProps) => {
  return (
    <div className="CreateMemo-container">
      <h3>메모 수정</h3>
      <div className="CreateMemo-content">
        <p className="modal-date">
          <span>날짜</span>
          <span className="detail-content detail-date">{date}</span>
        </p>
        <p className="modal-content">
          <span>내용</span>
          <textarea
            onChange={onChangeContent}
            defaultValue={content}
          ></textarea>
        </p>
      </div>
      <div className="modal-write-button-container">
        <button
          className="modal-write-close-button"
          onClick={onClickCancelOnModal}
        >
          취소
        </button>
        <button onClick={onClickCreate}>완료</button>
      </div>
    </div>
  );
};

export default UpdateMemoView;
