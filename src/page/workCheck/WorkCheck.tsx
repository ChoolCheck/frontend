import React, { useState, useEffect } from "react";
import WorkCheckView from "./WorkCheckView";
import "./style/workCheck.scss";
const WorkCheck = () => {
  const workCheckTotal = {
    totalList: [
      {
        day: "월",
        date: "01/02",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#ffd6a5",
      },
      {
        day: "월",
        date: "01/02",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "화",
        date: "01/03",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",

        backgroundColor: "#ffd6a5",
      },
      {
        day: "화",
        date: "01/03",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "수",
        date: "01/04",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#ffd6a5",
      },

      {
        day: "목",
        date: "01/05",
        name: "고구마",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#fdffb6",
      },
      {
        day: "목",
        date: "01/05",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "금",
        date: "01/06",
        name: "옥수수",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#a0c4ff",
      },
      {
        day: "금",
        date: "01/06",
        name: "감자밭",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#bdb2ff",
      },

      {
        day: "토",
        date: "01/07",
        name: "감자밭",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#a0c4ff",
      },
      {
        day: "토",
        date: "01/07",
        name: "고구마",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#fdffb6",
      },

      {
        day: "일",
        date: "01/08",
        name: "고구마",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#fdffb6",
      },
      {
        day: "일",
        date: "01/08",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },
    ],
    employee: [
      { name: "김어진", backgroundColor: "#ffd6a5" },
      { name: "이예빈", backgroundColor: "#ffadad" },
      { name: "감자밭", backgroundColor: "#bdb2ff" },
      { name: "고구마", backgroundColor: "#fdffb6" },
      { name: "옥수수", backgroundColor: "#a0c4ff" },
      { name: "김어진", backgroundColor: "#ffd6a5" },
      { name: "이예빈", backgroundColor: "#ffadad" },
      { name: "감자밭", backgroundColor: "#bdb2ff" },
      { name: "고구마", backgroundColor: "#fdffb6" },
      { name: "옥수수", backgroundColor: "#a0c4ff" },
    ],
  };

  const [workCheckTotalList, setWorkCheckTotalList] = useState(workCheckTotal);

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetResultClick = () => {
    //조회 로직 : startInput, endInput 서버에 넘겨주고 결과 list 받기
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    };
  };

  const filterTotalList = (name: string) => {
    if (name == "total") {
      setWorkCheckTotalList(workCheckTotal);
    } else {
      const filteredList = workCheckTotal.totalList.filter((item) => {
        if (item.name == name) {
          return true;
        }
      });
      setWorkCheckTotalList({ ...workCheckTotal, totalList: filteredList });
    }
  };

  // useEffect(() => {
  // }, []);

  const onShowNameButtonClick = (name: string) => {
    filterTotalList(name);
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    };
  };

  const onShowTotalButtonClick = () => {
    filterTotalList("total");
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    };
  };

  return (
    <div className="WorkCheck-top-container">
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
            className="WorkCheck-getResultButton"
            onClick={onGetResultClick}
          >
            조회
          </button>
        </form>

        <button className="getFileButton">출근부 엑셀 파일 다운로드</button>
      </div>

      <WorkCheckView
        workCheckTotalList={workCheckTotalList}
        onShowNameButtonClick={onShowNameButtonClick}
        onShowTotalButtonClick={onShowTotalButtonClick}
      ></WorkCheckView>
    </div>
  );
};
export default WorkCheck;
