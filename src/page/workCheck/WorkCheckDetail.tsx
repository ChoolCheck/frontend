import React, { useCallback } from "react";
import * as type from "./type";

import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { setTotalWorkcheckList } from "../../Redux/Actions/handleTotalWorkcheckList";
import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";
import { setPaginationFocus } from "../../Redux/Actions/handlePaginationFocus";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import WorkCheckDetailView from "./view/WorkCheckDetailView";
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
  const setTotalElement = useCallback(
    (totalElementState: number) =>
      dispatch(setTotalElements(totalElementState)),
    [dispatch]
  );

  const setTotalPage = useCallback(
    (totalPageState: number) => dispatch(setTotalPages(totalPageState)),
    [dispatch]
  );
  const setPaginationfocus = useCallback(
    (paginationFocus: string) => dispatch(setPaginationFocus(paginationFocus)),
    [dispatch]
  );
  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("해당 스케줄을 정말로 삭제하시겠습니까?")) {
        setPaginationfocus("total");
        DeleteWorkcheckApi({
          setReadModal,
          id,
          setTotalWorkCheckList,
          setWorkcheckToShow,
          setTotalPage,
          setTotalElement,
        });
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
            setWorkcheckToShow={setWorkcheckToShow}
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
