import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Reducers/rootReducer";

import { useEffect, useState } from "react";
import { GetTotalWorkcheckApi } from "../../../api/workcheck";
import { setTotalWorkcheckList } from "../../../Redux/Actions/handleTotalWorkcheckList";

import "../style/workCheckView.scss";
import * as type from "../type";
import * as enumType from "../../../commonType/enum";

const WorkCheckView = ({
  onShowNameButtonClick,
  onShowTotalButtonClick,
  onItemClick,
  workcheckToShow,
  employeeList,
  totalPages,
  totalElements,
  page,
  setTotalPages,
  setTotalElements,
  onPaginationClick,
}: type.workCheckViewProps) => {
  const totalWorkCheckList = useSelector(
    (state: RootState) => state.totalWorkcheckListReducer
  );

  const totalList = workcheckToShow
    ? workcheckToShow
    : totalWorkCheckList.totalWorkcheckList;

  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const [pages, setPages] = useState<Array<number>>([]);

  useEffect(() => {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  }, []);

  return (
    <div className="WorkCheckView-top-container">
      <div className="WorkCheckView-left-container">
        <h2>직원별로 보기</h2>
        <ul className="employee-list-ul">
          {employeeList &&
            employeeList.map((item) => (
              <li className="employee-list-li">
                <span
                  className="employee-list-li-color"
                  style={{
                    backgroundColor: `#${
                      enumType.enumColor[
                        item.color as keyof typeof enumType.enumColor
                      ]
                    }`,
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                </span>
                <button
                  className="employee-list-li-name"
                  onClick={onShowNameButtonClick(item.id)}
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
          {totalList &&
            totalList.map((item, idx) => (
              <li className="totalList-li" onClick={onItemClick(item.id)}>
                <span className="totalList-li-date">
                  {item.date}({day[new Date(item.date).getDay()]})
                </span>
                <span
                  className="totalList-li-name"
                  style={{
                    backgroundColor: `#${
                      enumType.enumColor[
                        item.color as keyof typeof enumType.enumColor
                      ]
                    }`,
                  }}
                >
                  {item.name}
                </span>

                <span className="totalList-li-hours">
                  {item?.hours == null ? "없음" : item?.hours}
                </span>

                <span className="totalList-li-time">
                  {item.startTime.substring(0, 5)} -
                  {item.endTime.substring(0, 5)}
                </span>

                <span className="totalList-li-totalWorkTime">
                  {Math.round(
                    ((new Date(item.date + "T" + item.endTime).getTime() -
                      new Date(item.date + "T" + item.startTime).getTime()) /
                      1000 /
                      60 /
                      60) *
                      10
                  ) / 10}
                  시간
                </span>
              </li>
            ))}
        </ul>
        <div className="pagination workcheck">
          <p>
            {pages.map((item) => (
              <button onClick={() => onPaginationClick(item)}>
                {item + 1}
              </button>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
export default WorkCheckView;
