import * as type from "../type";

const UpdateScheduleView = ({
  onChangeEmployee,
  employeeList,
  onChangeDate,
  workTypeList,
  onChangeWorkType,
  onChangeStartTime,
  onChangeEndTime,
  onClickCancelOnModal,
  onClickUpdate,

  employeeId,
  date,
  hours_id,
  startTime,
  endTime,
}: type.updateScheduleViewProps) => {
  return (
    <div className="updateEmployeeView-container">
      <h3>스케줄 수정</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-employee">
          <span>직원</span>

          <select
            name="employee"
            value={employeeId}
            onChange={onChangeEmployee}
          >
            <option>직원 선택</option>
            {employeeList &&
              employeeList.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
          </select>
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
                  name="hours_id"
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
                    name="hours_id"
                    type="radio"
                    id={item.id.toString()}
                    value={item.title}
                    defaultChecked={
                      item.id.toString() == hours_id ? true : false
                    }
                    onChange={onChangeWorkType(
                      item.id,
                      item.startTime,
                      item.endTime
                    )}
                  />
                  <label>{item.title}</label>
                </div>
                // {console.log({
                //   itemId: item.id,
                //   string_itemId: item.id.toString(),
                //   hourId: hours_id,
                //   flag: item.id.toString() == hours_id ? true : false,
                // })}
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
