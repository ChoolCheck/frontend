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
    { color: colors.RED },
    { color: colors.ORANGE },
    { color: colors.YELLOW },
    { color: colors.GREEN },
    { color: colors.LIGHT_BLUE },
    { color: colors.BLUE },
    { color: colors.PURPLE },
    { color: colors.PINK },
    { color: colors.GRAY },
  ];

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
                onClick={onClickColor()}
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
        <button
          onClick={() =>
            CreateEmployeeApi({ name, role, color, setWriteModal })
          }
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;
