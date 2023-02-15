import React, { useCallback, useState } from "react";
import * as type from "./type";
import { roleInfo } from "../../static/role";
import { colorInfo } from "../../static/color";

import WriteModal from "../../components/modal/WriteModal";
import UpdateEmployee from "./UpdateEmployee";

import { DeleteEmployeeApi } from "../../api/manage";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

const EmployeeDetailView = ({
  employeeDetail,
  employeeList,
  setEmployeeList,
}: type.employeeDetailProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );
  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const onUpdateClick = () => {
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    if (window.confirm("직원 정보를 정말로 삭제하시겠습니까?")) {
      DeleteEmployeeApi({
        setReadModal,
        employeeList,
        setEmployeeList,
        id,
      });
    } else {
      window.alert("직원 삭제가 취소되었습니다.");
    }
  };

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
        <button className="update-button" onClick={() => onUpdateClick()}>
          직원 수정
        </button>
        <button
          className="delete-button"
          onClick={() => onDeleteClick(employeeDetail ? employeeDetail.id : 0)}
        >
          직원 삭제
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
