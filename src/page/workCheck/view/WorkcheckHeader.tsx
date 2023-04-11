import ExcelDownload from "./ExcelDownload";
import * as type from "../type";
import "../style/workCheck.scss";

const WorkCheckHeader = ({
  onChageStartInput,
  onChageEndInput,
  onGetDateResultClick,
  onClickGetFile,
  startTime,
  endTime,
}: type.workcheckHeaderProps) => {
  return (
    <div className="WorkCheck-Header-container">
      <span className="WorkCheck-Header">기간 내 조회</span>
      <form>
        <input
          className="WorkCheck-startInput"
          onChange={onChageStartInput}
          type="date"
          required
          aria-required="true"
        ></input>
        -
        <input
          className="WorkCheck-endInput"
          onChange={onChageEndInput}
          type="date"
          required
          aria-required="true"
        ></input>
        <button
          type="button"
          className="WorkCheck-getResultButton"
          onClick={onGetDateResultClick}
        >
          조회
        </button>
      </form>

      <ExcelDownload
        onClickGetFile={onClickGetFile}
        startTime={startTime}
        endTime={endTime}
      ></ExcelDownload>
    </div>
  );
};
export default WorkCheckHeader;
