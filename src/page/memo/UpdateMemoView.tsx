import * as type from "./type";
import "./createMemo.scss";

const UpdateMemoView = ({
  date,
  content,
  onChangeDate,
  onChangeContent,
  onClickCancelOnModal,
  onClickCreate,
}: type.updateMemoViewProps) => {
  console.log(date);
  console.log(content);
  return (
    <div className="CreateMemo-container">
      <h3>메모 수정</h3>
      <div className="CreateMemo-content">
        <p className="modal-date">
          <span>날짜</span>
          <input
            type="date"
            name="date"
            onChange={onChangeDate}
            value={date}
          ></input>
        </p>
        <p className="modal-content">
          <span>내용</span>
          <textarea onChange={onChangeContent} value={content}></textarea>
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
