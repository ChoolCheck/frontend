import React, { useEffect, useState, useCallback } from "react";
import WriteModal from "../../components/modal/WriteModal";
import CreateWorkType from "./CreateWorkType";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import "./manage-work.scss";
import * as type from "./type";

const ManageWorkView = ({ workFormList }: type.manageWorkProps) => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );
  const onDeleteClick = () => {};
  return (
    <div className="ManageWorkView-top-container">
      {writeModalState && (
        <WriteModal>
          <CreateWorkType></CreateWorkType>
        </WriteModal>
      )}
      <p className="workTypeList-ul-col">
        <span className="workTypeList-ul-col-workForm">근무형태</span>
        <span className="workTypeList-ul-col-time">시간</span>
        <span className="workTypeList-ul-col-delete"></span>
      </p>
      <ul className="workTypeList-ul">
        {workFormList.map((item) => (
          <li className="workTypeList-li">
            <span className="workTypeList-li-workForm">{item.workForm}</span>
            <span className="workTypeList-li-time">{item.time}</span>
            <button className="workTypeList-li-delete" onClick={onDeleteClick}>
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button
          className="workTypeList-addButton"
          onClick={() => setWriteModal(true)}
        >
          근무추가
        </button>
      </div>
    </div>
  );
};
export default ManageWorkView;
