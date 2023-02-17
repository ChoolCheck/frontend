import React, { useCallback, useState } from "react";
import * as type from "./type";

import WriteModal from "../../components/modal/WriteModal";
import UpdateEmployee from "./UpdateEmployee";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

const EmployeeDetailView = ({
  onUpdateClick,
  onDeleteClick,
  employeeDetail,
  setEmployeeList,
}: type.employeeDetailViewProps) => {
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  return (
    <div className="employee-detail-container">
      {writeModalState && (
        <WriteModal>
          <UpdateEmployee
            employeeDetail={employeeDetail}
            setEmployeeList={setEmployeeList}
          ></UpdateEmployee>
        </WriteModal>
      )}
      <h3>직원 정보</h3>
      <div className="detail-info">
        <p className="modal-name">
          <span className="info-title">이름</span>
          <span className="info-content-name">{employeeDetail?.name}</span>
        </p>
        <p className="modal-role">
          <span className="info-title">직급</span>
          <span className="info-content-role">
            {type.enumRole[employeeDetail?.role as keyof typeof type.enumRole]}
          </span>
        </p>
        <p className="modal-color">
          <span className="info-title">색상</span>
          <span
            className="info-content-title"
            style={{
              backgroundColor: `#${
                type.enumColor[
                  employeeDetail?.color as keyof typeof type.enumColor
                ]
              }`,
            }}
          >
            &nbsp;
          </span>
        </p>
      </div>
      <div className="modal-button-container">
        <button className="update-button" onClick={onUpdateClick}>
          직원 수정
        </button>
        <button
          className="delete-button"
          onClick={onDeleteClick(employeeDetail ? employeeDetail.id : 0)}
        >
          직원 삭제
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
