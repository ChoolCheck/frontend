import * as type from "./type";

import WriteModal from "../../components/modal/WriteModal";
import UpdateSchedule from "./UpdateSchedule";

import * as enumType from "../../commonType/enum";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

const ScheduleDetailView = ({}: type.scheduleDetailViewProps) => {
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  return (
    <div className="employeeDetailView-container">
      {writeModalState && (
        <WriteModal>
          <UpdateSchedule></UpdateSchedule>
        </WriteModal>
      )}
      <h3>직원 정보</h3>
      {/* <div className="detail-info">
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
      </div> */}
      <div className="modal-read-button-container">
        <button className="update-button">직원 수정</button>
        <button className="delete-button">직원 삭제</button>
      </div>
    </div>
  );
};

export default ScheduleDetailView;
