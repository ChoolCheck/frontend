import EmployeeSelect from "../../../components/common/EmployeeSelect";
import * as type from "../type";

const CreateScheduleView = ({
  workTypeList,
  optionList,
  onChangeEmployee,
  onChangeDate,
  onChangeWorkType,
  onChangeStartTime,
  onChangeEndTime,

  onClickCancelOnModal,
  onClickCreate,
}: type.createScheduleViewProps) => {
  return (
    <div className="CreateSchedule-container">
      <h3>스케줄 추가</h3>
      <div className="CreateSchedule-content">
        <p className="modal-employee">
          <span>직원</span>
          <EmployeeSelect
            optionList={optionList}
            onChangeEmployee={onChangeEmployee}
          ></EmployeeSelect>
        </p>
        <p className="modal-date">
          <span>날짜</span>
          <input type="date" name="date" onChange={onChangeDate}></input>
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
          ></input>
          {" ~ "}
          <input
            className="modal-time-end"
            name="endTime"
            type="time"
            onChange={onChangeEndTime}
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
        <button onClick={onClickCreate}>완료</button>
      </div>
    </div>
  );
};

export default CreateScheduleView;
