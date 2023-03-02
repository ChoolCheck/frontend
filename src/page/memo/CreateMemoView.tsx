import * as type from "./type";

const CreateMemoView = ({
  memoForm,
  onChangeDate,
  onChangeContent,
  onClickCancelOnModal,
  onClickCreate,
}: type.createMemoViewProps) => {
  return (
    <div className="CreateWorkCheck-container">
      <h3>메모 작성</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-date">
          <span>날짜</span>
          <input type="date" name="date" onChange={onChangeDate}></input>
        </p>
        <p className="modal-content">
          <span>내용</span>
          <textarea onChange={onChangeContent}></textarea>
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

export default CreateMemoView;
