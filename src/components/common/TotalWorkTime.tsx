interface totalworktimeProps {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}
export function getTotalWorkTime(
  startTime: string,
  endTime: string,
  startDate?: string,
  endDate?: string
) {
  const start = startDate ? startDate : "230101";
  const end = endDate ? endDate : "230101";

  const timeDifference =
    Math.round(
      ((new Date(start + "T" + endTime).getTime() -
        new Date(end + "T" + startTime).getTime()) /
        1000 /
        60 /
        60) *
        10
    ) / 10;
  return timeDifference < 0 ? timeDifference + 24 : timeDifference;
}

const TotalWorkTime = ({
  startTime,
  endTime,
  startDate,
  endDate,
}: totalworktimeProps) => {
  const timeDifference =
    Math.round(
      ((new Date(startDate + "T" + endTime).getTime() -
        new Date(endDate + "T" + startTime).getTime()) /
        1000 /
        60 /
        60) *
        10
    ) / 10;

  // 오늘부터 다음날 새벽까지 근무하는 경우 시작시간이 종료시간보다 길기 때문에
  // 계산 결과가 음수인 경우 24를 더한다.
  const totalWorkTime =
    timeDifference < 0 ? timeDifference + 24 : timeDifference;

  return <span>{totalWorkTime}시간</span>;
};

export default TotalWorkTime;
