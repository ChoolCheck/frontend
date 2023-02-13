import * as type from "./type";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { CreateWorktypeApi } from "../../api/manage";

const CreateWorkType = ({ setWorkTypeList }: type.createWorktypeProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );

  const [worktypeForm, setWorktypeForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const { title, startTime, endTime } = worktypeForm;

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorktypeForm({
      ...worktypeForm,
      [e.target.name]: e.target.value,
    });
  };

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      window.alert("작성이 취소되었습니다.");
    } else return;
  };

  return (
    <div className="CreateWorkCheck-container">
      <h3>근무 시간 추가</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-worktype">
          <span>근무명</span>
          <input
            name="title"
            placeholder="ex)오픈,미들,마감"
            onChange={onChangeForm}
          ></input>
        </p>
        <p className="modal-time">
          <span>시간</span>

          <input
            className="modal-time-start"
            name="startTime"
            type="time"
            onChange={onChangeForm}
          ></input>
          {" ~ "}
          <input
            className="modal-time-end"
            name="endTime"
            type="time"
            onChange={onChangeForm}
          ></input>
        </p>
      </div>
      <div className="modal-button-container">
        <button
          className="modal-write-close-button"
          onClick={onClickCancelOnModal}
        >
          취소
        </button>
        <button
          onClick={() =>
            CreateWorktypeApi({ worktypeForm, setWriteModal, setWorkTypeList })
          }
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default CreateWorkType;
