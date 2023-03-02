import { useRef, useEffect } from "react";
import axios from "axios";
import { config } from "../static/config";
import { LogoutApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

export function useAxiosNavigation() {
  const navRef = useRef(useNavigate());

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: `${config.api}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const interceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalConfig = error.config;
        console.log("-- token is expired : " + error + " --");

        if (error.response && error.response.status == 401) {
          if (error.response.data.message == "expired") {
            console.log("-- token refresh post --");
            // token refresh 요청
            try {
              const res = await axios({
                url: `${config.api}/user/reissue`,
                method: "Post",
                headers: {
                  accesstoken: localStorage.getItem("token"),
                  refreshToken: localStorage.getItem("refreshToken"),
                },
              });
              if (res) {
                console.log("-- complete token refreshing --");
                console.log(res.data);
                localStorage.setItem("token", res.data.accessToken);
                return await refreshAPI.request(originalConfig);
              }
            } catch (err) {
              window.alert("토큰이 만료되어 자동으로 로그아웃 됩니다.");
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              return await navRef.current("/");
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
}

export default function AxiosNavigation() {
  useAxiosNavigation();
  return <></>;
}
