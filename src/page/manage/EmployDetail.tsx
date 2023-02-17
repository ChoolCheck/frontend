import React, { useCallback, useState } from "react";
import * as type from "./type";

import { DeleteEmployeeApi } from "../../api/manage";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import EmployeeDetailView from "./EmployeeDetailView";

const EmployeeDetail = ({
  employeeDetail,
  employeeList,
  setEmployeeList,
}: type.employeeDetailProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const onUpdateClick = () => {
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  return (
    <div className="employeeDetail-container">
      <EmployeeDetailView
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
        employeeDetail={employeeDetail}
        setEmployeeList={setEmployeeList}
      ></EmployeeDetailView>
    </div>
  );
};

export default EmployeeDetail;
