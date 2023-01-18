import axios from "axios";
import { config } from "../static/config";
import { useNavigate } from "react-router-dom";
import * as type from "./type";

export async function LoginApi({ email, password }: type.apiLoginProps) {
  const navigate = useNavigate();

  await axios({
    method: "POST",
    url: `${config.api}/login`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: { email: email, password: password },
  })
    .then((res) => {
      localStorage.setItem("access_token", res.data.token);
      navigate("/");
    })
    .catch((err) => {
      window.alert("로그인에 실패했습니다.");
      navigate("/auth");
    });
}

export async function SignupApi({
  email,
  password,
  storeName,
}: type.apiSignupProps) {
  const navigate = useNavigate();

  await axios({
    method: "POST",
    url: `${config.api}/signup`,
    headers: {
      "Content-Type": `application/json`,
    },
    data: { email: email, password: password, storeName },
  })
    .then((res) => {
      window.alert("회원가입이 완료되었습니다.");
      navigate("/login");
    })
    .catch((err) => {
      window.alert("회원가입에 실패했습니다.");
      console.log(err);
    });
}
