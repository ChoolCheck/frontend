import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import { UpdateEmployeeApi } from "../../api/manage";
import UpdateEmployeeView from "./UpdateEmployeeVIew";

import * as type from "./type";
import { roleInfo } from "../../static/role";

const UpdateEmployee = ({
  employeeDetail,
  setEmployeeList,
}: type.updateEmployeeProps) => {
  const dispatch = useDispatch();

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const [name, setName] = useState(employeeDetail ? employeeDetail.name : "");
  const [role, setRole] = useState(employeeDetail ? employeeDetail.role : "");
  const [color, setColor] = useState(
    employeeDetail ? employeeDetail.color : ""
  );

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(roleInfo[e.target.options.selectedIndex].roleName);
  };

  const onUpdateClick = (id: number) => {
    return (e: React.MouseEventHandler<HTMLButtonElement>) => {
      if (name == "" || (name && name.length < 2)) {
        window.alert("이름을 2글자 이상 입력해주세요");
      } else {
        if (employeeDetail !== undefined) {
          const colorName =
            type.enumColor[color as keyof typeof type.enumColor];
          const roleName = type.enumRole[role as keyof typeof type.enumRole];

          UpdateEmployeeApi({
            id,
            name,
            colorName,
            roleName,
            setWriteModal,
            setEmployeeList,
            setReadModal,
          });
        }
      }
    };
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
    <div className="updateEmployee-container">
      <UpdateEmployeeView
        employeeDetail={employeeDetail}
        name={name}
        role={role}
        color={color}
        onChangeName={onChangeName}
        onChangeRole={onChangeRole}
        onUpdateClick={onUpdateClick}
        onClickColor={onClickColor}
        onClickCancelOnModal={onClickCancelOnModal}
      ></UpdateEmployeeView>
    </div>
  );
};

export default UpdateEmployee;
