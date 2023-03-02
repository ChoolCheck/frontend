import React, { useCallback } from "react";
import * as type from "./type";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalWorkcheckList } from "../../Redux/Actions/handleTotalWorkcheckList";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import WorkCheckDetailView from "./WorkCheckDetailView";
import WriteModal from "../../components/modal/WriteModal";
import UpdateWorkCheck from "./UpdateWorkCheck";

import { DeleteWorkcheckApi } from "../../api/workcheck";

const WorkCheckDetail = ({
  workcheckDetail,
  setWorkcheckToShow,
}: type.workcheckDetailProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );

  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const setTotalWorkCheckList = useCallback(
    (totalWorkcheckList: type.workcheckObjProps[] | undefined) =>
      dispatch(setTotalWorkcheckList(totalWorkcheckList)),
    [dispatch]
  );

  const totalWorkCheckList = useSelector(
    (state: RootState) => state.totalWorkcheckListReducer
  );

  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteModal(true);
  };
  setWorkcheckToShow(totalWorkCheckList.totalWorkcheckList);

  const onDeleteClick = (id: number) => {
    const totalWorkcheckList = totalWorkCheckList.totalWorkcheckList;
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("해당 스케줄을 정말로 삭제하시겠습니까?")) {
        DeleteWorkcheckApi({
          setReadModal,
          id,
          setTotalWorkCheckList,
          setWorkcheckToShow,
          totalWorkcheckList,
        });
      } else {
        window.alert("스케줄 삭제가 취소되었습니다.");
      }
    };
  };

  return (
    <div className="employeeDetail-container">
      {writeModalState && (
        <WriteModal>
          <UpdateWorkCheck
            id={workcheckDetail ? workcheckDetail.id : 0}
            workcheckDetail={workcheckDetail}
          ></UpdateWorkCheck>
        </WriteModal>
      )}
      <WorkCheckDetailView
        id={workcheckDetail ? workcheckDetail.id : 0}
        workcheckDetail={workcheckDetail}
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
      ></WorkCheckDetailView>
    </div>
  );
};

export default WorkCheckDetail;
