import * as type from "../type";

import { colorInfo } from "../../../static/color";
import { roleInfo } from "../../../static/role";

const CreateEmployeeView = ({
  onChangeName,
  onChangeRole,
  onClickColor,
  onClickCancelOnModal,
  onCreateClick,
  color,
}: type.createEmployeeViewProps) => {
  return (
    <div className="createEmplyeeView-container">
      <h3>직원 추가</h3>
      <div className="createEmplyeeView-content">
        <p className="modal-name">
          <span>이름</span>
          <input name="name" onChange={onChangeName}></input>
        </p>
        <p className="modal-employee">
          <span>직급</span>
          <select name="role" onChange={onChangeRole}>
            {roleInfo.map((item) => (
              <option value={item.roleName}>{item.roleValue}</option>
            ))}
          </select>
        </p>
        <p className="modal-color">
          <span>색상</span>
          <div className="color-button-container">
            {colorInfo.map((item) => (
              <button
                className={item.colorName == color ? "selected" : ""}
                name={item.colorName}
                onClick={onClickColor}
                style={{ backgroundColor: `#${item.colorCode}` }}
              >
                &nbsp;
              </button>
            ))}
          </div>
        </p>
      </div>
      <div className="modal-button-container">
        <button className="modal-close-button" onClick={onClickCancelOnModal}>
          취소
        </button>
        <button onClick={onCreateClick}>완료</button>
      </div>
    </div>
  );
};

export default CreateEmployeeView;
