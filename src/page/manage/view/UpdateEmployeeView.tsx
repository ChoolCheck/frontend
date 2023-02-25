import * as type from "../type";

import { colorInfo } from "../../../static/color";
import { roleInfo } from "../../../static/role";

const UpdateEmployeeView = ({
  onChangeName,
  onChangeRole,
  onUpdateClick,
  onClickColor,
  onClickCancelOnModal,
  name,
  role,
  color,
}: type.updateEmployeeViewProps) => {
  return (
    <div className="updateEmployeeView-container">
      <h3>직원 수정</h3>
      <div className="updateEmployeeView-content">
        <p className="modal-name">
          <span>이름</span>
          <input name="name" value={name} onChange={onChangeName}></input>
        </p>
        <p className="modal-employee">
          <span>직급</span>
          <select name="role" onChange={onChangeRole} value={role}>
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
      <div className="modal-read-button-container">
        <button className="modal-close-button" onClick={onClickCancelOnModal}>
          취소
        </button>
        <button onClick={onUpdateClick}>완료</button>
      </div>
    </div>
  );
};

export default UpdateEmployeeView;
