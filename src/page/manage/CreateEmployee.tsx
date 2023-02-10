import "./createEmployee.scss";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

const CreateEmployee = () => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const colors = {
    RED: "FFADAD",
    ORANGE: "FFD6A5",
    YELLOW: "FDFFB6",
    GREEN: "CAFFBF",
    LIGHT_BLUE: "9BF6FF",
    BLUE: "A0C4FF",
    PURPLE: "BDB2FF",
    PINK: "FFC6FF",
    GRAY: "DEDEDE",
  };

  const buttonInfo = [
    { color: colors.RED, isSelected: true },
    { color: colors.ORANGE, isSelected: false },
    { color: colors.YELLOW, isSelected: false },
    { color: colors.GREEN, isSelected: false },
    { color: colors.LIGHT_BLUE, isSelected: false },
    { color: colors.BLUE, isSelected: false },
    { color: colors.PURPLE, isSelected: false },
    { color: colors.PINK, isSelected: false },
    { color: colors.GRAY, isSelected: false },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);

  const rank = { MANAGER: "매니저", PART_TIME: "알바", FULL_TIME: "직원" };

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [color, setColor] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const onClickColor = (idx: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.classList.add("selected");

      buttonInfo[selectedIdx].isSelected = false;
      buttonInfo[idx].isSelected = true;
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
            <option>{rank.MANAGER}</option>
            <option>{rank.FULL_TIME}</option>
            <option>{rank.PART_TIME}</option>
          </select>
        </p>
        <p className="modal-color">
          <span>색상</span>
          <div className="color-button-container">
            {buttonInfo.map((item, idx) => (
              <button
                name={item.color}
                onClick={onClickColor(idx)}
                style={{ backgroundColor: `#${item.color}` }}
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
        <button>완료</button>
      </div>
    </div>
  );
};

export default CreateEmployee;
