import { useEffect, useState, useCallback } from "react";
import WriteModal from "../../../components/modal/WriteModal";
import CreateWorkType from "../CreateWorkType";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../../Redux/Actions/handleWriteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Reducers/rootReducer";
import { GetWorktypeApi } from "../../../api/manage";
import { DeleteWorktypeApi } from "../../../api/manage";

import * as worktypeType from "../../../commonType/worktype";
import "../style/manage-work.scss";
import "../style/manageView.scss";

const ManageWorkView = () => {
  const [workTypeList, setWorkTypeList] = useState<
    worktypeType.worktypeProps[] | undefined
  >();

  useEffect(() => {
    GetWorktypeApi({ setWorkTypeList });
  }, []);

  const dispatch = useDispatch();

  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const onDeleteClick = (id: number) => {
    if (window.confirm("정말로 근무시간을 삭제하시겠습니까?")) {
      DeleteWorktypeApi({ id, workTypeList, setWorkTypeList });
    } else window.alert("근무시간 삭제가 취소되었습니다.");
  };

  return (
    <div className="ManageWorkView top-container">
      {writeModalState && (
        <WriteModal>
          <CreateWorkType setWorkTypeList={setWorkTypeList}></CreateWorkType>
        </WriteModal>
      )}

      {workTypeList && workTypeList.length > 0 ? (
        <div className="workTypeList-exist">
          <p className="workTypeList ul-col">
            <span className="workTypeList ul-col-workForm">근무형태</span>
            <span className="workTypeList ul-col-time">시간</span>
            <span className="workTypeList ul-col-delete"></span>
          </p>
          <ul className="workTypeList-ul">
            {workTypeList.map((item) => (
              <li className="workTypeList-li">
                <span className="workTypeList-li-workForm">{item.title}</span>
                <span className="workTypeList-li-time">
                  {item.startTime}-{item.endTime}
                </span>
                <span className="workTypeList-li-delete">
                  <button
                    className="delete-button"
                    onClick={() => onDeleteClick(item.id)}
                  >
                    삭제
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="workTypeList-notexist">
          <p className="workTypeList-notexist-content">
            설정한 근무시간이 아직 없습니다.
          </p>
          <button
            className="workTypeList-notexist-addButton"
            onClick={() => setWriteModal(true)}
          >
            근무 시간 추가하기
          </button>
        </div>
      )}
    </div>
  );
};
export default ManageWorkView;
