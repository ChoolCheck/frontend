import React, { useCallback } from "react";
import * as type from "./type";

import { DeleteScheduleApi } from "../../api/schedule";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";
import { setPaginationFocus } from "../../Redux/Actions/handlePaginationFocus";

import ScheduleDetailView from "./view/ScheduleDetailView";

const ScheduleDetail = ({
  scheduleDetail,
  setTotalScheduleList,
  setWeekScheduleList,
  setScheduleToShow,
  setSelectedModal,
}: type.scheduleDetailProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
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
    setSelectedModal("update");
    setWriteModal(true);
    setReadModal(false);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("해당 스케줄을 정말로 삭제하시겠습니까?")) {
        setPaginationfocus("total");
        DeleteScheduleApi({
          setReadModal,
          id,
          setTotalScheduleList,
          setWeekScheduleList,
          setScheduleToShow,
          setTotalElement,
          setTotalPage,
        });
      }
    };
  };

  return (
    <div className="employeeDetail-container">
      {scheduleDetail && (
        <ScheduleDetailView
          id={scheduleDetail.id}
          scheduleDetail={scheduleDetail}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        ></ScheduleDetailView>
      )}
    </div>
  );
};

export default ScheduleDetail;
