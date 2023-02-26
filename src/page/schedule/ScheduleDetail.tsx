import React, { useCallback, useState } from "react";
import * as type from "./type";

import { DeleteScheduleApi } from "../../api/schedule";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";

import ScheduleDetailView from "./ScheduleDetailView";
const ScheduleDetail = ({
  scheduleDetail,
  setTotalScheduleList,
  setWeekScheduleList,
}: type.scheduleDetailProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );

  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <ScheduleDetailView
        scheduleDetail={scheduleDetail}
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
        setTotalScheduleList={setTotalScheduleList}
        setWeekScheduleList={setWeekScheduleList}
      ></ScheduleDetailView>
    </div>
  );
};

export default ScheduleDetail;