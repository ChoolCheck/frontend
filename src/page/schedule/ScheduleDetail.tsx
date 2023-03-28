import React, { useCallback } from "react";
import * as type from "./type";

import { DeleteScheduleApi } from "../../api/schedule";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import { setTotalElements } from "../../Redux/Actions/handleTotalElement";
import { setTotalPages } from "../../Redux/Actions/handleTotalPages";

import ScheduleDetailView from "./view/ScheduleDetailView";

const ScheduleDetail = ({
  scheduleDetail,
  setTotalScheduleList,
  setWeekScheduleList,
  setScheduleToShow,
  setSelectedModal,
  setPaginationFocus,
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

  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedModal("update");
    setWriteModal(true);
    setReadModal(false);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("해당 스케줄을 정말로 삭제하시겠습니까?")) {
        setPaginationFocus("total");
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
      <ScheduleDetailView
        id={scheduleDetail ? scheduleDetail.id : 0}
        scheduleDetail={scheduleDetail}
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
      ></ScheduleDetailView>
    </div>
  );
};

export default ScheduleDetail;
