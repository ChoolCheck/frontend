import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { CreateEmployeeApi } from "../../api/manage";
import * as type from "./type";

import CreateEmployeeView from "./view/CreateEmployeeView";

import { roleInfo } from "../../static/role";

const CreateEmployee = ({ setEmployeeList }: type.createEmployeeProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );

  const [name, setName] = useState("");
  const [role, setRole] = useState("MANAGER");
  const [color, setColor] = useState("RED");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(roleInfo[e.target.options.selectedIndex].roleName);
  };

  const onCreateClick = () => {
    if (name == "" || name.length < 2) {
      window.alert("이름을 2글자 이상 입력해주세요");
    } else {
      CreateEmployeeApi({
        name,
        color,
        role,
        setWriteModal,
        setEmployeeList,
      });
    }
  };

  const onClickColor = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
    } else return;
  };

  return (
    <div className="createEmplyee-container">
      <CreateEmployeeView
        color={color}
        onChangeName={onChangeName}
        onChangeRole={onChangeRole}
        onCreateClick={onCreateClick}
        onClickColor={onClickColor}
        onClickCancelOnModal={onClickCancelOnModal}
      ></CreateEmployeeView>
    </div>
  );
};

export default CreateEmployee;
