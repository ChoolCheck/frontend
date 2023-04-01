import React, { useCallback, useEffect, useState } from "react";
import * as type from "../type";
import EmployeeSelect from "../../../components/common/EmployeeSelect";

const UpdateScheduleView = ({
  onChangeEmployee,
  optionList,
  workTypeList,
  onChangeDate,
  onChangeWorkType,
  onChangeStartTime,
  onChangeEndTime,
  onClickCancelOnModal,
  onClickUpdate,

  defaultValueIndex,
  employeeId,
  date,
  hoursId,
  startTime,
  endTime,
}: type.updateScheduleViewProps) => {
  return (
    <div className="updateEmployeeView-container">
      <h3>스케줄 수정</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-employee">
          <span>직원</span>
          <EmployeeSelect
            defaultValueIndex={defaultValueIndex}
            optionList={optionList}
            onChangeEmployee={onChangeEmployee}
          ></EmployeeSelect>
        </p>
        <p className="modal-date">
          <span>날짜</span>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChangeDate}
          ></input>
        </p>
        <p className="modal-worktype">
          <span>근무형태</span>
          <div className="worktype-list">
            {workTypeList && workTypeList.length > 0 && (
              <div>
                <input
                  name="hoursId"
                  type="radio"
                  onChange={onChangeWorkType(-1, "00:00", "00:00")}
                />
                <label>선택안함</label>
              </div>
            )}
            {workTypeList && workTypeList.length > 0 ? (
              workTypeList.map((item) => (
                <div>
                  <input
                    name="hoursId"
                    type="radio"
                    id={item.id.toString()}
                    value={item.title}
                    defaultChecked={
                      item.id.toString() == hoursId ? true : false
                    }
                    onChange={onChangeWorkType(
                      item.id,
                      item.startTime,
                      item.endTime
                    )}
                  />
                  <label>{item.title}</label>
                </div>
              ))
            ) : (
              <label>근무 형태 없음</label>
            )}
          </div>
        </p>
        <p className="modal-time">
          <span>시간</span>
          <input
            className="modal-time-start"
            name="startTime"
            type="time"
            onChange={onChangeStartTime}
            value={startTime}
          ></input>
          {" ~ "}
          <input
            className="modal-time-end"
            name="endTime"
            type="time"
            onChange={onChangeEndTime}
            value={endTime}
          ></input>
        </p>
      </div>
      <div className="modal-write-button-container">
        <button
          className="modal-write-close-button"
          onClick={onClickCancelOnModal}
        >
          취소
        </button>
        <button onClick={onClickUpdate}>수정</button>
      </div>
    </div>
  );
};

export default UpdateScheduleView;
