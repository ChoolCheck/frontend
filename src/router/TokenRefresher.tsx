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
        const msg = error.response.data.message;
        const status = error.response.status;
        if (status == 401) {
          if (msg == "access token expired") {
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
          } else if (msg == "refresh token expired") {
            localStorage.clear();
            navigate("/login");
            window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");
          } else if (msg == "mail token expired") {
            window.alert(
              "비밀번호 변경 시간이 만료되었습니다. 다시 요청해주세요."
            );
          } else if (msg == "비밀번호가 일치하지 않습니다.") {
            window.alert(msg);
          }
        } else if (status == 400 || status == 404 || status == 409) {
          window.alert(msg);
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
