import { Icon } from "@iconify/react";
import { format } from "date-fns";
import * as type from "../type";

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  onCreateWorkcheckClick,
  onCreateMemoClick,
}: type.renderheaderProps) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <h2 className="text">
          {format(currentMonth, "yyyy")}년&nbsp;
          <span className="text month">{format(currentMonth, "M")}월</span>
        </h2>
      </div>

      <div className="col col-end">
        <button
          className="createWorkcheckButton"
          onClick={onCreateWorkcheckClick}
        >
          출근부 작성하기
        </button>
        <button className="createMemoButton" onClick={onCreateMemoClick}>
          메모 작성하기
        </button>
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

export default RenderHeader;
