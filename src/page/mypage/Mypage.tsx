import React, { useState, useEffect } from "react";
import axios from "axios";
import MypageView from "./MypageView";
import "./mypage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../static/config";
const Mypage = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage-top-container">
      <MypageView></MypageView>
    </div>
  );
};
export default Mypage;
