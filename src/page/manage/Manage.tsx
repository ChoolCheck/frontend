import { useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

import ManageEmployeeView from "./view/ManageEmployeeView";
import ManageWorkView from "./view/ManageWorkView";
import ToggleButton from "../../components/button/ToggleButton";

import "./style/manage.scss";
const Manage = () => {
  const dispatch = useDispatch();

  const [leftOrRight, setLeftOrRight] = useState(true);

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );
  return (
    <div className="Manage-top-container">
      <div className="Manage-Header-container">
        <ToggleButton
          leftButtonTitle="직원관리"
          rightButtonTitle="근무관리"
          leftOrRight={leftOrRight}
          setLeftOrRight={setLeftOrRight}
        ></ToggleButton>

        <div className="button-container">
          {leftOrRight ? (
            <button
              className="employeeList addButton"
              onClick={() => setWriteModal(true)}
            >
              직원추가
            </button>
          ) : (
            <button
              className="workTypeList addButton"
              onClick={() => setWriteModal(true)}
            >
              근무추가
            </button>
          )}
        </div>
      </div>

      {leftOrRight ? (
        <ManageEmployeeView></ManageEmployeeView>
      ) : (
        <ManageWorkView></ManageWorkView>
      )}
    </div>
  );
};

export default Manage;
