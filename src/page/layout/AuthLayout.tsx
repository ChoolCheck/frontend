import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./authlayout.scss";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") == null
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="AuthLayout-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
