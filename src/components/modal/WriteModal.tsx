import React from "react";
import "./modal.scss";

type writeModalProps = {
  children: React.ReactNode;
};

function WriteModal(props: writeModalProps) {
  return (
    <div className="modal-background">
      <div className="modal-container">{props.children}</div>
    </div>
  );
}

export default WriteModal;
