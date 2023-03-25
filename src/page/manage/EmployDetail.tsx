import React, { useCallback } from "react";
import * as type from "./type";

import { DeleteEmployeeApi } from "../../api/manage";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import EmployeeDetailView from "./view/EmployeeDetailView";

const EmployeeDetail = ({
  employeeDetail,
  employeeList,
  setEmployeeList,
  setSelectedModal,
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
    setSelectedModal("updateEmployee");
    setWriteModal(true);
    setReadModal(false);
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
      }
    };
  };

  return (
    <div className="employeeDetail-container">
      <EmployeeDetailView
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
        employeeDetail={employeeDetail}
      ></EmployeeDetailView>
    </div>
  );
};

export default EmployeeDetail;
