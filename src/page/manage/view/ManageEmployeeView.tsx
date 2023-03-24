import { useEffect, useState, useCallback } from "react";
import CreateEmployee from "../CreateEmployee";
import EmployeeDetail from "../EmployDetail";

import WriteModal from "../../../components/modal/WriteModal";
import ReadModal from "../../../components/modal/ReadModal";

import { GetEmployeeApi } from "../../../api/manage";
import { GetEmployeeDetailApi } from "../../../api/manage";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Reducers/rootReducer";

import * as employeeType from "../../../commonType/employee";
import * as enumType from "../../../commonType/enum";
import "../style/manage-employee.scss";
import "../style/manageView.scss";

const ManageEmployeeView = () => {
  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const readModalState = useSelector(
    (state: RootState) => state.ReadModalReducer.readModalState
  );

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const [employeeList, setEmployeeList] =
    useState<employeeType.employeeProps[]>();
  const [employeeDetail, setEmployeeDetail] =
    useState<employeeType.employeeProps>();

  useEffect(() => {
    GetEmployeeApi({ setEmployeeList });
  }, []);

  const onClickDetail = (id: number) => {
    GetEmployeeDetailApi({ id, setEmployeeDetail, setReadModal });
  };

  return (
    <div className="ManageEmployeeView top-container">
      {writeModalState && (
        <WriteModal>
          <CreateEmployee setEmployeeList={setEmployeeList}></CreateEmployee>
        </WriteModal>
      )}
      {readModalState && (
        <ReadModal>
          <EmployeeDetail
            employeeList={employeeList}
            employeeDetail={employeeDetail}
            setEmployeeList={setEmployeeList}
          ></EmployeeDetail>
        </ReadModal>
      )}

      {employeeList && employeeList.length > 0 ? (
        <div className="employeeList-exist">
          <div className="employeeList ul-col">
            <span className="employeeList ul-col-name">이름</span>
            <span className="employeeList ul-col-role">직급</span>
            <span className="employeeList ul-col-color">색상</span>
          </div>
          <ul className="employeeList ul">
            {employeeList.map((item) => (
              <li
                className="employeeList li"
                onClick={() => onClickDetail(item.id)}
              >
                <span className="employeeList-li-name">{item.name}</span>
                <span className="employeeList-li-role">
                  {
                    enumType.enumRole[
                      item.role as keyof typeof enumType.enumRole
                    ]
                  }
                </span>
                <span className="employeeList-li-color">
                  <span
                    className="employeeList-li-color-content"
                    style={{
                      backgroundColor: `#${
                        enumType.enumColor[
                          item.color as keyof typeof enumType.enumColor
                        ]
                      }`,
                    }}
                  ></span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="employeeList notexist">
          <p className="employeeList notexist-content">직원이 아직 없습니다.</p>
          <button
            className="employeeList notexist-addButton"
            onClick={() => setWriteModal(true)}
          >
            직원 추가하기
          </button>
        </div>
      )}
    </div>
  );
};
export default ManageEmployeeView;
