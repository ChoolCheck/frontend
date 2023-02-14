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

const refreshAPI = axios.create({
  baseURL: `${config.api}`,
  // headers: { "Content-type": "application/json" }, // data type
});

refreshAPI.interceptors.response.use(
  function (response) {
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);

    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "만료된 JWT 토큰입니다.") {
        const refreshToken = localStorage.getItem("refreshToken");

        // token refresh 요청
        const { data } = await axios.post(
          `${config.api}/user/reissue`, // token refresh api
          {},
          { headers: { authorization: `Bearer ${refreshToken}` } }
        );

        // 새로운 토큰 저장
        // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        await localStorage.multiSet([
          ["token", newAccessToken],
          ["refreshToken", newRefreshToken],
        ]);
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
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
