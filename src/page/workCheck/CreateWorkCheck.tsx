import "./createWorkCheck.scss";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

const CreateWorkCheck = () => {
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

  const [workCheckForm, setWorkCheckForm] = useState({
    employee: "",
    date: "",
    workType: "",
    time: "",
  });

  return (
    <div className="CreateWorkCheck-container">
      <h3>출근부 작성</h3>
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
          <span>근무형태</span>
          <input type="checkbox"></input>
        </p>
        <p>
          <span>시간</span>
          <input type="time"></input>
          <input type="time"></input>
        </p>
      </div>
      <button onClick={onClickCancelOnModal}>취소</button>
      <button>완료</button>
    </div>
  );
};

export default CreateWorkCheck;
