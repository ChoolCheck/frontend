import * as type from "../type";

import * as enumType from "../../../commonType/enum";

const EmployeeDetailView = ({
  onUpdateClick,
  onDeleteClick,
  employeeDetail,
}: type.employeeDetailViewProps) => {
  return (
    <div className="employeeDetailView-container">
      <h3>직원 정보</h3>
      <div className="detail-info">
        <p className="modal-name">
          <span className="detail-title">이름</span>
          <span className="detail-content detail-name">
            {employeeDetail?.name}
          </span>
        </p>
        <p className="modal-role">
          <span className="detail-title">직급</span>
          <span className="detail-content detail-role">
            {
              enumType.enumRole[
                employeeDetail?.role as keyof typeof enumType.enumRole
              ]
            }
          </span>
        </p>
        <p className="modal-color">
          <span className="detail-title">색상</span>
          <span className="detail-content">
            <div
              className="detail-color"
              style={{
                backgroundColor: `#${
                  enumType.enumColor[
                    employeeDetail?.color as keyof typeof enumType.enumColor
                  ]
                }`,
              }}
            >
              &nbsp;
            </div>
          </span>
        </p>
      </div>
      <div className="modal-read-button-container">
        <button className="update-button" onClick={onUpdateClick}>
          직원 수정
        </button>
        <button
          className="delete-button"
          onClick={onDeleteClick(employeeDetail ? employeeDetail.id : 0)}
        >
          직원 삭제
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
