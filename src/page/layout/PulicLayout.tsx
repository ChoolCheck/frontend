import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./publiclayout.scss";

const PublicLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/calendar");
    }
  }, []);
  return (
    <div className="PublicLayout-container">
      <Outlet />
    </div>
  );
};
export default PublicLayout;
