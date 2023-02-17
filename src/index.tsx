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
      if (error.response.data.message === "expired") {
        const refreshToken = localStorage.getItem("refreshToken");

        // token refresh 요청
        try {
          const res = await axios({
            url: `${config.api}/user/reissue`,
            method: "Post",
            headers: {
              Authorization: refreshToken,
            },
          });
          if (res) {
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            return await refreshAPI.request(originalRequest);
          }
        } catch (err) {
          console.log("토큰 갱신 에러");
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
