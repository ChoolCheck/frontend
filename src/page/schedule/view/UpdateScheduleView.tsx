import * as type from "../type";

const UpdateScheduleView = ({
  onChangeEmployee,
  employeeList,
  onChangeDate,
  workTypeList,
  onChangeWorkType,
  scheduleForm,
  onChangeStartTime,
  onChangeEndTime,
  onClickCancelOnModal,
  onClickUpdate,
}: type.updateScheduleViewProps) => {
  return (
    <div className="updateEmployeeView-container">
      <h3>스케줄 수정</h3>
      <div className="CreateWorkCheck-content">
        <p className="modal-employee">
          <span>직원</span>

          <select
            name="employee"
            value={scheduleForm.employee}
            onChange={onChangeEmployee}
          >
            <option>직원 선택</option>
            {employeeList &&
              employeeList.map((item) => (
                <option value={scheduleForm.employee}>{item.name}</option>
              ))}
          </select>
        </p>
        <p className="modal-date">
          <span>날짜</span>
          <input
            type="date"
            name="date"
            value={scheduleForm.date}
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
                    value={item.title}
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
            value={scheduleForm.startTime}
          ></input>
          {" ~ "}
          <input
            className="modal-time-end"
            name="endTime"
            type="time"
            onChange={onChangeEndTime}
            value={scheduleForm.endTime}
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
