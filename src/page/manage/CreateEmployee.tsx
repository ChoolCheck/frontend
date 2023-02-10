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

  const rank = { MANAGER: "매니저", PART_TIME: "알바", FULL_TIME: "직원" };

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
          <input></input>
        </p>
        <p className="modal-employee">
          <span>직급</span>
          <select>
            <option>{rank.MANAGER}</option>
            <option>{rank.FULL_TIME}</option>
            <option>{rank.PART_TIME}</option>
          </select>
        </p>
        <p className="modal-color">
          <span>색상</span>
          <div className="color-button-container">
            <button style={{ backgroundColor: `#${colors.RED}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.ORANGE}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.YELLOW}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.GREEN}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.LIGHT_BLUE}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.BLUE}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.PURPLE}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.PINK}` }}>
              &nbsp;
            </button>
            <button style={{ backgroundColor: `#${colors.GRAY}` }}>
              &nbsp;
            </button>
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
