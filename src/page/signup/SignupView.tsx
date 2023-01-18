import { useNavigate } from "react-router-dom";
import "./sign.css";
import * as type from "./type";

const SignupView = ({
  email,
  password,
  storeName,
  onCancleSignup,
  onChangeForm,
  onSubmitForm,
}: type.signupProps) => {
  const navigate = useNavigate();

  return (
    <div className="Signup--Top-Container">
      <div className="Signup-inputContainer">
        <h1 className="Signup-TopHeader">Choolcheck</h1>
        <h2 className="Signup-Header">회원가입</h2>
        <p>
          <span className="Signup-EmailHeader">이메일</span>
          <input
            className="Signup-inputEmail"
            placeholder="이메일 입력해주세요"
            onChange={onChangeForm}
            name="email"
            type="email"
          />
        </p>
        <p>
          <span className="Signup-PasswordHeader">비밀번호</span>
          <input
            className="Signup-inputPassword"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={onChangeForm}
            name="password"
            type="password"
          />
        </p>
        <p>
          <span className="Signup-StoreNameHeader">가게명</span>
          <input
            className="Signup-inputPassword"
            placeholder="가게명을 입력해주세요"
            onChange={onChangeForm}
            name="storeName"
            type="text"
          />
        </p>
        <button
          type="button"
          className="Signup-signupButton"
          onClick={onSubmitForm}
        >
          완료
        </button>
        <button
          type="button"
          className="Signup-cancleButton"
          onClick={onCancleSignup}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default SignupView;
