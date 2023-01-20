import React, { useEffect, useState } from "react";
import * as type from "./type";

// 직원 목록, 근무형태 목록,
const WriteModalView = ({
  title,
  name,
  employee,
  workType,
  date,
  time,
  memoContent,
  rank,
}: type.writeModalProps) => {
  return (
    <div className="WriteModal-top-container">
      <h1>{title}</h1>
      {employee}&&
      <p>
        직원<option></option>
      </p>
      {date}&&
      <p>
        날짜<input type="date"></input>
      </p>
      {workType}&&
      <p>
        근무형태<input type="checkbox"></input>
      </p>
      {time}&&
      <p>
        시간<input type="time"></input>
      </p>
      {memoContent}&&
      <p>
        메모내용<textarea></textarea>
      </p>
      {/* 직원추가, 수정 */}
      {name}&&<p>이름</p>
      {rank}&&<p>직급</p>
      <button>취소</button>
      <button>완료</button>
    </div>
  );
};

export default WriteModalView;
