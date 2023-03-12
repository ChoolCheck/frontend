import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { UpdateMemoApi } from "../../api/memo";
import UpdateMemoView from "./view/UpdateMemoView";
import * as type from "./type";

const UpdateMemo = ({ memoForm, setMemoDetail }: type.updateMemoProps) => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const [date, setDate] = useState(memoForm ? memoForm.date : "");
  const [content, setContent] = useState(memoForm ? memoForm.content : "");

  const onClickCancelOnModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말로 작성을 취소하시겠습니까?")) {
      setWriteModal(false);
      window.alert("작성이 취소되었습니다.");
    } else return;
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (date == "") {
      window.alert("날짜를 선택해주세요.");
    } else if (content == "") {
      window.alert("내용을 입력해주세요.");
    } else if (content.length > 35) {
      window.alert("내용을 35자 이하로 입력해주세요");
    } else {
      const id = memoForm ? memoForm.id : 0;
      UpdateMemoApi({
        id,
        date,
        content,
        setWriteModal,
        setMemoDetail,
      });
    }
  };

  return (
    <UpdateMemoView
      onClickCancelOnModal={onClickCancelOnModal}
      onChangeDate={onChangeDate}
      onChangeContent={onChangeContent}
      onClickCreate={onClickCreate}
      date={date}
      content={content}
    ></UpdateMemoView>
  );
};

export default UpdateMemo;
