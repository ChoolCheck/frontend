import React, { useCallback } from "react";
import "./modal.scss";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

type writeModalProps = {
  children: React.ReactNode;
};

function WriteModal(props: writeModalProps) {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setWriteModal(false)}>닫기</button>
        {props.children}
      </div>
    </div>
  );
}

export default WriteModal;
