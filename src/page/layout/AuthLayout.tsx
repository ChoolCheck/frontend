import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { LogoutApi } from "../../api/auth";
import { config } from "../../static/config";

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
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
