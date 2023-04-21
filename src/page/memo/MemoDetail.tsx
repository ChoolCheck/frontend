import React, { useCallback } from "react";
import * as type from "./type";

import { DeleteMemoApi } from "../../api/memo";
import { useDispatch, useSelector } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { setReadModalOpen } from "../../Redux/Actions/handleReadModal";
import { RootState } from "../../Redux/Reducers/rootReducer";

import WriteModal from "../../components/modal/WriteModal";
import MemoDetailView from "./view/MemoDetailView";
import UpdateMemo from "./UpdateMemo";

const MemoDetail = ({
  memoDetail,
  setMemoDetail,
  setSelectedModal,
  selectedModal,
}: type.memoDetailProps) => {
  const dispatch = useDispatch();
  const writeModalState = useSelector(
    (state: RootState) => state.WriteModalReducer.writeModalState
  );
  const setWriteModal = useCallback(
    (writeModalState: boolean) => dispatch(setWriteModalOpen(writeModalState)),
    [dispatch]
  );
  const setReadModal = useCallback(
    (readModalState: boolean) => dispatch(setReadModalOpen(readModalState)),
    [dispatch]
  );

  const onUpdateClick = () => {
    setSelectedModal("updatememo");
    setWriteModal(true);
  };

  const onDeleteClick = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("메모를 정말로 삭제하시겠습니까?")) {
        DeleteMemoApi({
          setReadModal,
          id,
        });
      } else {
        window.alert("메모 삭제가 취소되었습니다.");
      }
    };
  };

  return (
    <div className="employeeDetail-container">
      {writeModalState && (
        <WriteModal>
          {selectedModal == "updatememo" && (
            <UpdateMemo
              memoForm={memoDetail}
              setMemoDetail={setMemoDetail}
            ></UpdateMemo>
          )}
        </WriteModal>
      )}
      <MemoDetailView
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
        memoDetail={memoDetail}
      ></MemoDetailView>
    </div>
  );
};

export default MemoDetail;
