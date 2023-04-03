import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../page/login/Login";
import Signup from "../page/signup/Signup";
import Main from "../page/main/Main";
import Schedule from "../page/schedule/Schedule";
import WorkCheck from "../page/workCheck/WorkCheck";
import Statistics from "../page/statistics/Statistics";
import Manage from "../page/manage/Manage";
import Navigation from "../components/navigation/Navigation";
import AuthLayout from "../page/layout/AuthLayout";
import PublicLayout from "../page/layout/PulicLayout";
import Mypage from "../page/User/Mypage";
import UpdateUser from "../page/User/UpdateUser";
import UpdatePassword from "../page/User/UpdatePassword";
import CheckToSendEmail from "../page/User/CheckToSendEmail";
import AxiosNavigation from "./AxiosNavigation";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <AxiosNavigation />
        <Navigation />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/updatePassword" element={<UpdatePassword />} />

          <Route element={<AuthLayout />}>
            <Route path="/calendar" element={<Main />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/workcheck" element={<WorkCheck />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/updateUserInfo" element={<UpdateUser />} />
            <Route path="/checkToSendEmail" element={<CheckToSendEmail />} />
          </Route>

          <Route
            path="/*"
            element={
              localStorage.getItem("token") == null &&
              localStorage.getItem("token") == undefined ? (
                <Navigate to="/login" replace={false} />
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
