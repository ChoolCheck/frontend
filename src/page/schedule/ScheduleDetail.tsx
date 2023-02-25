import React, { useCallback, useState } from "react";
import * as type from "./type";

import { DeleteScheduleApi } from "../../api/schedule";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";

import ScheduleDetailView from "./ScheduleDetailView";

const ScheduleDetail = ({}: type.scheduleDetailProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const onUpdateClick = () => {
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("해당 스케줄을 정말로 삭제하시겠습니까?")) {
        // DeleteScheduleApi({
        //   setReadModal,
        //   employeeList,
        //   setEmployeeList,
        //   id,
        // });
      } else {
        window.alert("스케줄 삭제가 취소되었습니다.");
      }
    };
  };

  return (
    <div className="employeeDetail-container">
      <ScheduleDetailView></ScheduleDetailView>
    </div>
  );
};

export default ScheduleDetail;
