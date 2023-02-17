import React, { useState, useEffect } from "react";
import MypageView from "./MypageView";
import "./style/mypage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import * as type from "./type";
import { GetUserInfoApi } from "../../api/mypage";

const Mypage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<type.userInfoProps>({
    email: "",
    storeName: "",
    createdDate: "",
  });

  useEffect(() => {
    GetUserInfoApi({ setUserInfo });
  }, []);

  return (
    <div className="mypage-top-container">
      <MypageView userInfo={userInfo}></MypageView>
    </div>
  );
};
export default Mypage;
