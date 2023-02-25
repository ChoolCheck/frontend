import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux/Reducers/rootReducer";
import axios from "axios";
import { config } from "./static/config";
import { LogoutApi } from "./api/auth";

import { useNavigate } from "react-router-dom";

const refreshAPI = axios.create({
  baseURL: `${config.api}`,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }, // data type
});

refreshAPI.interceptors.request.use(
  function (config) {
    if (!config.headers["authorization"]) {
      console.log(`Bearer ${localStorage.getItem("token")}`);
      // config.headers["authorization"] = `Bearer ${localStorage.getItem(
      //   "token"
      // )}`;
    }
    return config;
  },
  function (error) {
    // 오류 요청 가공
    return Promise.reject(error);
  }
);

refreshAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const navigate = useNavigate();
    const originalConfig = error.config;
    console.log(error);

    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "expired") {
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
            localStorage.setItem("token", res.data.accessToken);
            return await refreshAPI.request(originalConfig);
          }
        } catch (err) {
          window.alert("토큰이 만료되어 자동으로 로그아웃 됩니다.");
          return await LogoutApi({ navigate });
        }
      }
    }
    console.log("response error", error);
    return Promise.reject(error);
  }
);
const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root")!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
