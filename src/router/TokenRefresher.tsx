import { useEffect } from "react";
import axios from "axios";
import { config } from "../static/config";
import { useNavigate } from "react-router-dom";

export default function TokenRefresher() {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: `${config.api}`,
      headers: {
        "Content-type": "application/json",
      },
    });

    const interceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalConfig = error.config;
        if (error.response.status == 401) {
          if (error.response.data.message == "expired") {
            await axios({
              url: `${config.api}/user/reissue`,
              method: "Post",
              headers: {
                accesstoken: localStorage.getItem("token"),
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
              .then((res) => {
                localStorage.setItem("token", res.data.accessToken);

                originalConfig.headers["Authorization"] =
                  "Bearer " + res.data.accessToken;
                return refreshAPI(originalConfig);
              })
              .then((res) => {
                window.location.reload();
              })
              .catch((err) => {
                localStorage.clear();
                navigate("/login");
                window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");
              });
          } else if (error.response.data.message) {
            window.alert(error.response.data.message);
          } else {
            window.alert("요청 처리에 실패하였습니다.");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
  return <></>;
}