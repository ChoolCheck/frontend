import { useRef, useEffect } from "react";
import axios from "axios";
import { config } from "../static/config";
import { useNavigate } from "react-router-dom";

export default function AxiosNavigation() {
  const navigate = useNavigate();

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
        if (error?.response?.status == 401) {
          if (error.response.data.message == "expired") {
            console.log("-- token is expired : " + error + " --");
            console.log(originalConfig);

            await axios({
              url: `${config.api}/user/reissue`,
              method: "Post",
              headers: {
                accesstoken: localStorage.getItem("token"),
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
              .then((res) => {
                console.log("-- complete token refreshing --");
                localStorage.setItem("token", res.data.accessToken);
                return refreshAPI.request(originalConfig);
              })

              .catch((err) => {
                if (localStorage.getItem("token")) {
                  return axios({
                    method: "Post",
                    url: `${config.api}/user/logout`,
                    headers: {
                      "Content-Type": `application/json`,
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                    .then((res) => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("refreshToken");

                      navigate("/login");
                    })
                    .then((res) => {
                      window.alert(
                        "토큰이 만료되어 자동으로 로그아웃 되었습니다."
                      );
                    })
                    .catch((err) => {
                      if (localStorage.getItem("token"))
                        window.alert("로그아웃에 실패했습니다.");
                      console.log(err);
                    });
                }
              });
          }
        } else if (error.response.data.message) {
          window.alert(error.response.data.message);
        } else {
          window.alert("요청 처리에 실패하였습니다.");
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
