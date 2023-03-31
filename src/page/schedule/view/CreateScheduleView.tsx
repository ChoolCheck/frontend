import { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";

import * as type from "../type";
import * as enumType from "../../../commonType/enum";

const CreateScheduleView = ({
  employeeList,
  workTypeList,
  scheduleForm,

  onChangeEmployee,
  onChangeDate,
  onChangeWorkType,
  onChangeStartTime,
  onChangeEndTime,

  onClickCancelOnModal,
  onClickCreate,
}: type.createScheduleViewProps) => {
  const [colorsArray, setColorsArray] = useState<Array<type.optionObj>>([]);

  useEffect(() => {
    let list: Array<type.optionObj> = [];
    employeeList?.map((item, i) => {
      list.push({
        label: item.name,
        value: scheduleForm.employee,
        color: `#${
          enumType.enumColor[item.color as keyof typeof enumType.enumColor]
        }`,
      });
    });
    setColorsArray(list);
  }, [employeeList]);
  console.log(colorsArray);

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  const colorStyles: StylesConfig<type.optionObj> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        // backgroundColor: isDisabled
        //   ? undefined
        //   : isSelected
        //   ? data.color
        //   : isFocused
        //   ? color.alpha(0.1)
        //   : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.2).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  return (
    <div className="CreateSchedule-container">
      <h3>스케줄 추가</h3>
      <div className="CreateSchedule-content">
        <p className="modal-employee">
          <span>직원</span>

          {employeeList && (
            <Select
              defaultValue={colorsArray[0]}
              options={colorsArray}
              styles={colorStyles}
              onChange={onChangeEmployee}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          )}

          {/* <select name="employee" onChange={onChangeEmployee}>
            <option>직원 선택</option>
            {employeeList &&
              employeeList.map((item) => (
                <option
                  value={scheduleForm.employee}
                  className="employee-option"
                  style={{
                    color: `#${
                      enumType.enumColor[
                        item.color as keyof typeof enumType.enumColor
                      ]
                    }`,
                  }}
                >
                  {item.name}
                </option>
              ))}
          </select> */}
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
