import React, { useCallback } from "react";
import * as type from "./type";

import { DeleteScheduleApi } from "../../api/schedule";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";

import ScheduleDetailView from "./view/ScheduleDetailView";
import WriteModal from "../../components/modal/WriteModal";
import UpdateSchedule from "./UpdateSchedule";

const ScheduleDetail = ({
  scheduleDetail,
  setTotalScheduleList,
  setWeekScheduleList,
  setScheduleToShow,
}: type.scheduleDetailProps) => {
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
  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("해당 스케줄을 정말로 삭제하시겠습니까?")) {
        DeleteScheduleApi({
          setReadModal,
          id,
          setTotalScheduleList,
          setWeekScheduleList,
          setScheduleToShow,
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
          <UpdateSchedule
            id={scheduleDetail ? scheduleDetail.id : 0}
            scheduleDetail={scheduleDetail}
            setWeekScheduleList={setWeekScheduleList}
            setTotalScheduleList={setTotalScheduleList}
          ></UpdateSchedule>
        </WriteModal>
      )}
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
