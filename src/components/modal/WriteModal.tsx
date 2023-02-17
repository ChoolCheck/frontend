import React from "react";
import "./modal.scss";

type writeModalProps = {
  children: React.ReactNode;
};

const WriteModal = (props: writeModalProps) => {
  return (
    <div className="modal-background">
      <div className="writemodal-container">{props.children}</div>
    </div>
  );
};

export default WriteModal;
