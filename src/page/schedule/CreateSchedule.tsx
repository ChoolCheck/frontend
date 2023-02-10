import "./createSchedule.scss";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

const CreateSchedule = () => {
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

  const [scheduleForm, setWorkCheckForm] = useState({
    employee: "",
    date: "",
    workType: "",
    time: "",
  });

  return (
    <div className="CreateWorkCheck-container">
      <h3>스케줄 추가</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-employee">
          <span>직원</span>
          <input></input>
        </p>
        <p className="modal-date">
          <span>날짜</span>
          <input type="date"></input>
        </p>
        <p className="modal-worktype">
          <span>근무형태</span>
          <input type="checkbox"></input>
        </p>
        <p className="modal-time">
          <span>시간</span>
          <input className="modal-time-start" type="time"></input>
          {" ~ "}
          <input className="modal-time-end" type="time"></input>
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

export default CreateSchedule;
