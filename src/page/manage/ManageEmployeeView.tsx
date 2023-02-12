import "./style/manage-employee.scss";
import * as type from "./type";
import React, { useEffect, useState, useCallback } from "react";
import CreateEmployee from "./CreateEmployee";
import WriteModal from "../../components/modal/WriteModal";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";
import { GetEmployeeApi } from "../../api/manage";

const ManageEmployeeView = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const [employeeList, setEmployeeList] = useState<type.employeeProps[]>();

  useEffect(() => {
    GetEmployeeApi({ setEmployeeList });
  }, []);

  return (
    <div className="ManageEmployeeView-top-container">
      {writeModalState && (
        <WriteModal>
          <CreateEmployee></CreateEmployee>
        </WriteModal>
      )}

      {employeeList && employeeList.length > 0 && (
        <div>
          <div className="employeeList-ul-col">
            <span className="employeeList-ul-col-name">이름</span>
            <span className="employeeList-ul-col-rank">직급</span>
            <span className="employeeList-ul-col-color">색상</span>
          </div>
          <ul className="employeeList-ul">
            {employeeList.map((item) => (
              <li className="employeeList-li">
                <span className="employeeList-li-name">{item.name}</span>
                <span className="employeeList-li-rank">{item.role}</span>
                <span className="employeeList-li-color">
                  <span
                    className="employeeList-li-color-content"
                    style={{ backgroundColor: item.color }}
                  ></span>
                </span>
              </li>
            ))}
          </ul>
          <div className="button-container">
            <button
              className="employeeList-addButton"
              onClick={() => setWriteModal(true)}
            >
              직원추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageEmployeeView;
