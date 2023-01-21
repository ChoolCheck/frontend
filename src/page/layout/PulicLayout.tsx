import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/calendar");
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default PublicLayout;
