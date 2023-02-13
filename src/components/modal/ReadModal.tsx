import React, { useCallback } from "react";
import "./modal.scss";
import { useDispatch } from "react-redux";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

type readModalProps = {
  children: React.ReactNode;
};

const ReadModal = (props: readModalProps) => {
  const dispatch = useDispatch();
  console.log("read modal open");

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="modal-read-close-button"
          onClick={() => setReadModal(false)}
        >
          닫기
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default ReadModal;
