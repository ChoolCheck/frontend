import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { UpdateEmployeeApi } from "../../api/manage";
import * as type from "./type";

import { colorInfo } from "../../static/color";
import { roleInfo } from "../../static/role";

const UpdateEmployee = ({
  employeeDetail,
  setEmployeeList,
}: type.updateEmployeeProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const [name, setName] = useState(employeeDetail ? employeeDetail.name : "");
  const [role, setRole] = useState(employeeDetail ? employeeDetail.role : "");
  const [color, setColor] = useState(
    employeeDetail ? employeeDetail.color : ""
  );

  console.log(employeeDetail);
  console.log({ name, role, color });

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(roleInfo[e.target.options.selectedIndex].roleName);
  };

  const onCreateClick = (id: number) => {
    if (name == "" || (name && name.length < 2)) {
      window.alert("이름을 2글자 이상 입력해주세요");
    } else {
      if (employeeDetail !== undefined) {
        UpdateEmployeeApi({
          id,
          name,
          role,
          color,
          setWriteModal,
          setEmployeeList,
        });
      }
    }
  };

  const onClickColor = () => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const selectedButton = e.currentTarget;
      let prevNode = selectedButton.previousElementSibling;
      let nextNode = selectedButton.nextElementSibling;

      selectedButton.classList.add("selected");

      while (prevNode) {
        if (prevNode.className == "selected") {
          prevNode.classList.remove("selected");
        } else prevNode = prevNode.previousElementSibling;
      }
      while (nextNode) {
        if (nextNode.className == "selected") {
          nextNode.classList.remove("selected");
        } else nextNode = nextNode.nextElementSibling;
      }
      setColor(e.currentTarget.name);
    };
  };

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
    } else window.alert("작성이 취소되었습니다.");
  };

  return (
    <div className="CreateWorkCheck-container">
      <h3>직원 추가</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-name">
          <span>이름</span>
          <input name="name" onChange={onChangeName}></input>
        </p>
        <p className="modal-employee">
          <span>직급</span>
          <select name="role" onChange={onChangeRole}>
            {roleInfo.map((item) => (
              <option>{item.roleValue}</option>
            ))}
          </select>
        </p>
        <p className="modal-color">
          <span>색상</span>
          <div className="color-button-container">
            {colorInfo.map((item, idx) => (
              <button
                className={item.colorName == color ? "selected" : ""}
                name={item.colorName}
                onClick={onClickColor()}
                style={{ backgroundColor: `#${item.colorCode}` }}
              >
                &nbsp;
              </button>
            ))}
          </div>
        </p>
      </div>
      <div className="modal-write-button-container">
        <button
          className="modal-write-close-button"
          onClick={onClickCancelOnModal}
        >
          취소
        </button>
        <button
          onClick={() => onCreateClick(employeeDetail ? employeeDetail.id : 0)}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default UpdateEmployee;
