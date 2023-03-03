import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setWriteModalOpen } from "../../Redux/Actions/handleWriteModal";
import { CreateMemoApi } from "../../api/memo";
import CreateMemoView from "./CreateMemoView";

const CreateMemo = () => {
  const dispatch = useDispatch();

  const setWriteModal = useCallback(
    (readModalState: boolean) => dispatch(setWriteModalOpen(readModalState)),
    [dispatch]
  );

  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const memoForm = { date, content };

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
    } else
      CreateMemoApi({
        date,
        content,
        setWriteModal,
      });
  };

  return (
    <div>
      <CreateMemoView
        onClickCancelOnModal={onClickCancelOnModal}
        memoForm={memoForm}
        onChangeDate={onChangeDate}
        onChangeContent={onChangeContent}
        onClickCreate={onClickCreate}
      ></CreateMemoView>
    </div>
  );
};

export default CreateMemo;
