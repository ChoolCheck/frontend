import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateUserView from "./UpdateUserView";
import "./mypage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../static/config";
const UpdateUser = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage-top-container">
      <UpdateUserView></UpdateUserView>
    </div>
  );
};
export default UpdateUser;
