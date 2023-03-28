import * as type from "../type";
import "./style/workCheck.scss";

const WorkCheckHeader = ({
  onChageStartInput,
  onChageEndInput,
  onGetDateResultClick,
  onClickGetFile,
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

      <button className="getFileButton" onClick={onClickGetFile}>
        출근부 엑셀 파일 다운로드
      </button>
    </div>
  );
};
export default WorkCheckHeader;
