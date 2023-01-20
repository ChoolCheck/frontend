import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { redirect } from "react-router-dom";
import React, { useState } from "react";
import Login from "../page/login/Login";
import Signup from "../page/signup/Signup";
import Calendar from "../page/calendar/Calendar";
import Schedule from "../page/schedule/Schedule";
import WorkCheck from "../page/workCheck/WorkCheck";
import Statistics from "../page/statistics/Statistics";
import Manage from "../page/manage/Manage";
import Navigation from "../components/common/Navigation";
// import { IsTokenExpiredApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/workcheck" element={<WorkCheck />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/manage" element={<Manage />} />
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
