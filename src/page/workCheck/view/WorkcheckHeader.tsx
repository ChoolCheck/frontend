import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../../Redux/Actions/handleWriteModal";
import ExcelDownload from "./ExcelDownload";
import * as type from "../type";
import "../style/workCheck.scss";

const WorkCheckHeader = ({
  onChageStartInput,
  onChageEndInput,
  onGetDateResultClick,
  startTime,
  endTime,
}: type.workcheckHeaderProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  return (
    <div className="WorkCheck-Header-container">
      {/* <span className="WorkCheck-Header">기간 내 조회</span> */}
      <form>
        <input
          className="startInput"
          onChange={onChageStartInput}
          type="date"
          required
          aria-required="true"
        ></input>
        -
        <input
          className="endInput"
          onChange={onChageEndInput}
          type="date"
          required
          aria-required="true"
        ></input>
        <button
          type="button"
          className="getResultBtn"
          onClick={onGetDateResultClick}
        >
          조회
        </button>
      </form>
      <ExcelDownload startTime={startTime} endTime={endTime}></ExcelDownload>
      <button
        type="button"
        className="createWorkcheckBtn"
        onClick={() => setWriteModal(true)}
      >
        출근부작성
      </button>
    </div>
  );
};
export default WorkCheckHeader;
