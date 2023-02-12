import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { CreateEmployeeApi } from "../../api/manage";

const CreateEmployee = () => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const buttonInfo = [
    { colorName: "RED", colorCode: "FFADAD" },
    { colorName: "ORANGE", colorCode: "FFD6A5" },
    { colorName: "YELLOW", colorCode: "FDFFB6" },
    { colorName: "GREEN", colorCode: "CAFFBF" },
    { colorName: "LIGHT_BLUE", colorCode: "9BF6FF" },
    { colorName: "BLUE", colorCode: "A0C4FF" },
    { colorName: "PURPLE", colorCode: "BDB2FF" },
    { colorName: "PINK", colorCode: "FFC6FF" },
    { colorName: "GRAY", colorCode: "DEDEDE" },
  ];

  const rankInfo = [
    { rankName: "MANAGER", rankValue: "매니저" },
    { rankName: "PART_TIME", rankValue: "알바" },
    { rankName: "FULL_TIME", rankValue: "직원" },
  ];

  const [name, setName] = useState("");
  const [role, setRole] = useState("매니저");
  const [color, setColor] = useState("RED");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(rankInfo[e.target.options.selectedIndex].rankName);
  };

  const onCreateClick = () => {
    if (name == "") {
      window.alert("이름을 2글자 이상 입력해주세요");
    } else {
      CreateEmployeeApi({ name, role, color, setWriteModal });
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
      window.alert("작성이 취소되었습니다.");
    } else return;
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
            {rankInfo.map((item) => (
              <option>{item.rankValue}</option>
            ))}
          </select>
        </p>
        <p className="modal-color">
          <span>색상</span>
          <div className="color-button-container">
            {buttonInfo.map((item, idx) => (
              <button
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
        <button onClick={onCreateClick}>완료</button>
      </div>
    </div>
  );
};

export default CreateEmployee;
