import React, { useCallback } from "react";
import * as type from "./type";

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
    // setReadModal(false);
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    DeleteEmployeeApi({
      setReadModal,
      employeeList,
      setEmployeeList,
      id,
    });
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
        <p>
          <span className="info-title">이름</span>
          <span className="info-content">{employeeDetail?.name}</span>
        </p>
        <p>
          <span className="info-title">직급</span>
          <span> className="info-content"{employeeDetail?.role}</span>
        </p>
        <p>
          <span className="info-title">색상</span>
          <span
            className="info-content"
            style={{ backgroundColor: employeeDetail?.color }}
          >
            &nbsp;
          </span>
        </p>
      </div>
      <div className="button-container">
        <button onClick={() => onUpdateClick()}>직원 수정</button>
        <button
          onClick={() => onDeleteClick(employeeDetail ? employeeDetail.id : 0)}
        >
          직원 삭제
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
