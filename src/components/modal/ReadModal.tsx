import React, { useCallback } from "react";
import "./readModal.scss";
import { useDispatch } from "react-redux";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

type readModalProps = {
  children: React.ReactNode;
};
function ReadModal(props: readModalProps) {
  const dispatch = useDispatch();

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );
  return (
    <div className="ReadModal-background">
      <div className="ReadModal-container">
        <button onClick={() => setReadModal(false)}>닫기</button>
        {props.children}
      </div>
    </div>
  );
}

export default ReadModal;
