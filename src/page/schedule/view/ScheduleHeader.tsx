import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../../Redux/Actions/handleWriteModal";
import ToggleButton from "../../../components/button/ToggleButton";

import * as type from "../type";

const ScheduleHeader = ({
  setSelectedModal,
  leftOrRight,
  setLeftOrRight,
}: type.scheduleHeaderProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  return (
    <div className="Schedule-Header-container">
      <div className="Schedule-Header-left">
        <ToggleButton
          leftButtonTitle="이번주스케줄"
          rightButtonTitle="전체스케줄"
          leftOrRight={leftOrRight}
          setLeftOrRight={setLeftOrRight}
        ></ToggleButton>
      </div>
      <div className="Schedule-Header-right">
        <button
          className="add-Schedule-button page-header-button"
          onClick={() => {
            setWriteModal(true);
            setSelectedModal("create");
          }}
        >
          스케줄추가
        </button>
      </div>
    </div>
  );
};
export default ScheduleHeader;
