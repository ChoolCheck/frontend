import "./createEmployee.scss";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

const CreateEmployee = () => {
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
      <h3>직원 추가</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-name">
          <span>이름</span>
          <input></input>
        </p>
        <p className="modal-employee">
          <span>직원</span>
          <input></input>
        </p>
        <p className="modal-color">
          <span>색상</span>
          <input></input>
        </p>
      </div>
      <div className="modal-write-button-container">
        <button
          className="modal-write-close-button"
          onClick={onClickCancelOnModal}
        >
          취소
        </button>
        <button>완료</button>
      </div>
    </div>
  );
};

export default CreateEmployee;
