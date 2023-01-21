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

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/workcheck" element={<WorkCheck />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/manage" element={<Manage />} />

          <Route
            path="/*"
            element={
              localStorage.getItem("token") == null &&
              localStorage.getItem("token") == undefined ? (
                <Navigate to="/login" replace={true} />
              ) : (
                <Navigate to="/calendar" replace={true} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRouter;
