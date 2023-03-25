import React, { useCallback } from "react";
import * as type from "./type";

import { DeleteEmployeeApi } from "../../api/manage";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import EmployeeDetailView from "./view/EmployeeDetailView";
import WriteModal from "../../components/modal/WriteModal";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeDetail = ({
  employeeDetail,
  employeeList,
  setEmployeeList,
}: type.employeeDetailProps) => {
  const dispatch = useDispatch();
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );
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
      {writeModalState && (
        <WriteModal>
          <UpdateEmployee
            employeeDetail={employeeDetail}
            setEmployeeList={setEmployeeList}
          ></UpdateEmployee>
        </WriteModal>
      )}
      <EmployeeDetailView
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
        employeeDetail={employeeDetail}
      ></EmployeeDetailView>
    </div>
  );
};

export default EmployeeDetail;
