import React, { useState } from "react";
import UpdateUserView from "./UpdateUserView";
import "./style/mypage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateUserInfoApi } from "../../api/mypage";

const UpdateUser = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const [storeName, setStorename] = useState(state.storeName);

  const onChangeStorename = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.currentTarget.value);
    setStorename(e.target.value);
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
        onChangeStorename={onChangeStorename}
        onCancelClick={onCancelClick}
        onUpdateClick={onUpdateClick}
      ></UpdateUserView>
    </div>
  );
};
export default UpdateUser;
