import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { redirect } from "react-router-dom";
import React, { useState } from "react";
import Login from "./page/login/Login";
import Signup from "./page/signup/Signup";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Login />} />
          {/* 
            <Route
              path="/"
              element={
                localStorage.getItem("access_token") != null &&
                localStorage.getItem("access_token") != undefined ? (
                  <Navigate to="/" replace={true} />
                ) : (
                  <Navigate to="/auth" replace={true} />
                )
              }
            /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRouter;
