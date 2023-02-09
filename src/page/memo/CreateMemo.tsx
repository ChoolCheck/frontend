import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import "./createMemo.scss";

const CreateMemo = () => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );
  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      window.alert("작성이 취소되었습니다.");
    } else return;
  };

  return (
    <div className="CreateWorkCheck-container">
      <h3>메모 작성</h3>
      <div className="CreateWorkCheck-content">
        <p>
          <span>직원</span>
          <input></input>
        </p>
        <p>
          <span>날짜</span>
          <input type="date"></input>
        </p>
        <p>
          <span>내용</span>
          <textarea></textarea>
        </p>
      </div>
      <button onClick={onClickCancelOnModal}>취소</button>
      <button>완료</button>
    </div>
  );
};

export default CreateMemo;
