import React, { useState, useEffect } from "react";
import "./statistics.scss";
import StatisticsView from "./StatisticsView";
const Statistics = () => {
  const statisticsList = [
    { name: "감자밭", totalWorkTime: "20", backgroundColor: "#bdb2ff" },
    { name: "고구마", totalWorkTime: "15", backgroundColor: "#fdffb6" },
    { name: "김어진", totalWorkTime: "9", backgroundColor: "#ffd6a5" },
    { name: "붕어빵", totalWorkTime: "52", backgroundColor: "#caffbf" },
    { name: "옥수수", totalWorkTime: "13", backgroundColor: "#a0c4ff" },
    { name: "조랭이떡", totalWorkTime: "10", backgroundColor: "#ffadad" },
    { name: "초키초키", totalWorkTime: "5", backgroundColor: "#9bf6ff" },
    { name: "호떡", totalWorkTime: "31", backgroundColor: "#ffc6ff" },
  ];

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const date = new Date();
  const [yearToShow, setYearToShow] = useState(date.getFullYear());
  const [monthToShow, setMonthToShow] = useState(date.getMonth() + 1);

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetResultClick = () => {
    //조회 로직 : startInput, endInput 서버에 넘겨주고 결과 list 받기
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
    };
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //해당 날짜 데이터 요청 api
    if (monthToShow == 1) {
      setYearToShow(yearToShow - 1);
      setMonthToShow(12);
    } else {
      setMonthToShow(monthToShow - 1);
    }
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //해당 날짜 데이터 요청 api
    if (monthToShow == 12) {
      setYearToShow(yearToShow + 1);
      setMonthToShow(1);
    } else {
      setMonthToShow(monthToShow + 1);
    }
  };

  // useEffect(() => {
  // }, []);

  return (
    <div className="Statistics-top-container">
      <h2 className="Statistics-top-Header">
        <button className="prevButton" onClick={onPrevClick}>
          ◁
        </button>
        <span className="dateToShow">
          {yearToShow}년 {monthToShow}월
        </span>
        <button className="nextButton" onClick={onNextClick}>
          ▷
        </button>
        <span>근무 통계</span>
      </h2>
      <div className="Statistics-mid-Header">
        <div className="Statistics-LeftHeader-container">
          <span className="Statistics-LeftHeader">기간 내 조회</span>
          <form>
            <input
              className="Statistics-startInput"
              onChange={onChageStartInput}
              type="date"
              required
              aria-required="true"
            ></input>
            -
            <input
              className="Statistics-endInput"
              onChange={onChageEndInput}
              type="date"
              required
              aria-required="true"
            ></input>
            <button
              className="Statistics-getResultButton"
              onClick={onGetResultClick}
            >
              조회
            </button>
          </form>
        </div>
        <div className="Statistics-RightHeader-container">
          <button className="get-thismonth-statistics">
            이번달 근무 통계 조회
          </button>
        </div>
      </div>
      <StatisticsView statisticsList={statisticsList}></StatisticsView>
    </div>
  );
};

export default Statistics;
