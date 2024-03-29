import Pagination from "../../../components/common/Pagination";
import TotalWorkTime from "../../../components/common/TotalWorkTime";
import "../style/schedule-total.scss";
import * as type from "../type";
import * as enumType from "../../../commonType/enum";

const ScheduleTotalView = ({
  onShowNameButtonClick,
  onShowTotalButtonClick,
  onItemClick,
  onPaginationClick,
  scheduleToShow,
  employeeList,
  totalScheduleList,
  page,
}: type.scheduleTotalViewProps) => {
  const totalList = scheduleToShow ? scheduleToShow : totalScheduleList;
  const day = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="ScheduleTotalView-top-container">
      <div className="ScheduleTotalView-left-container">
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
      <div className="ScheduleTotalView-right-container">
        {totalList && totalList.length > 0 ? (
          <div>
            <ul className="totalList-ul">
              {totalList.map((item, idx) => (
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
                    {item.hours == null ? "없음" : item?.hours}
                  </span>
                  <span className="totalList-li-time">
                    {item.startTime.substring(0, 5)}-
                    {item.endTime.substring(0, 5)}
                  </span>
                  <span className="totalList-li-totalWorkTime">
                    <TotalWorkTime
                      startDate={item.date}
                      endDate={item.date}
                      startTime={item.startTime}
                      endTime={item.endTime}
                    ></TotalWorkTime>
                  </span>
                </li>
              ))}
            </ul>
            <Pagination
              onPaginationClick={onPaginationClick}
              page={page}
            ></Pagination>
          </div>
        ) : (
          <p className="noData"> 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default ScheduleTotalView;
