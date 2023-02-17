import React, { useState } from "react";
import UpdateUserView from "./UpdateUserView";
import "./style/mypage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateUserInfoApi } from "../../api/mypage";

const UpdateUser = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state);

  const [storeName, setStorename] = useState(state.storeName);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorename(e.currentTarget.value);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("회원정보 수정을 취소하시겠습니까?")) {
      navigate("/mypage");
    }
  };

  const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    UpdateUserInfoApi({ storeName, navigate });
  };

  return (
    <div className="mypage-top-container">
      <UpdateUserView
        userInfo={state}
        storeName={storeName}
        onChangeName={onChangeName}
        onCancelClick={onCancelClick}
        onUpdateClick={onUpdateClick}
      ></UpdateUserView>
    </div>
  );
};
export default UpdateUser;
