import { useNavigate } from "react-router-dom";
import "./login.scss";
import * as type from "./type";

const LoginView = ({
  email,
  password,
  onChangeForm,
  onSubmitForm,
}: type.loginProps) => {
  const navigate = useNavigate();
  return (
    <div className="Login-Top-Container">
      <div className="login inputContainer">
        <h1 className="Login-Header">Choolcheck</h1>
        <p>
          <span className="login EmailHeader">🧑🏻‍💻</span>
          <input
            name="email"
            className="login inputEmail"
            placeholder="이메일 입력해주세요"
            onChange={onChangeForm}
          />
        </p>
        <p>
          <span className="login PasswordHeader">🔒</span>
          <input
            name="password"
            className="login inputPassword"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={onChangeForm}
            type="password"
          />
        </p>
        <button type="button" className="loginButton" onClick={onSubmitForm}>
          로그인
        </button>
        <button
          type="button"
          className="signupButton"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginView;
