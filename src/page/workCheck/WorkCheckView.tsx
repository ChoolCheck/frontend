import "./style/workCheckView.scss";
import * as type from "./type";

const WorkCheckView = ({
  onShowNameButtonClick,
  onShowTotalButtonClick,
  workCheckTotalList,
}: type.workCheckProps) => {
  return (
    <div className="WorkCheckView-top-container">
      <div className="WorkCheckView-left-container">
        <h2>직원별로 보기</h2>
        <ul className="employee-list-ul">
          {workCheckTotalList.employee.map((item) => (
            <li className="employee-list-li">
              <span
                className="employee-list-li-color"
                style={{ backgroundColor: item.backgroundColor }}
              >
                &nbsp;&nbsp;&nbsp;
              </span>
              <button
                className="employee-list-li-name"
                onClick={() => onShowNameButtonClick(item.name)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <button className="employee-totalView" onClick={onShowTotalButtonClick}>
          전체보기
        </button>
      </div>
      <div className="WorkCheckView-right-container">
        <ul className="totalList-ul">
          {workCheckTotalList.totalList.map((item) => (
            <li className="totalList-li">
              <span className="totalList-li-date">
                {item.date}({item.day})
              </span>
              <span
                className="totalList-li-name"
                style={{ backgroundColor: item.backgroundColor }}
              >
                {item.name}
              </span>
              <span className="totalList-li-time">{item.time}</span>
              <span className="totalList-li-totalWorkTime">
                {item.totalWorkTime}시간
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default WorkCheckView;
