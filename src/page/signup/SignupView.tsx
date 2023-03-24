import "./signView.scss";
import * as type from "./type";

const SignupView = ({
  emailMessage,
  passwordMessage,
  passwordCheckMessage,
  storeNameMessage,
  isEmail,
  isPassword,
  isPasswordCheck,
  isStoreName,
  emailCertificated,
  onCancleSignup,
  onSubmitForm,
  onChangeEmail,
  onChangeCode,
  onChangePassword,
  onChangePasswordCheck,
  onChangeStoreName,
  onEmailCheck,
}: type.signupProps) => {
  return (
    <div className="Signup-Top-Container">
      <div className="Signup-inputContainer">
        <h1 className="Signup-TopHeader">Choolcheck</h1>
        <h2 className="Signup-Header">회원가입</h2>
        <div className="Signup-Email">
          <p className="Signup-EmailHeader">이메일</p>
          <p className="email-input-container">
            <input
              className="Signup-inputEmail"
              placeholder="이메일 입력해주세요"
              onChange={onChangeEmail}
              name="email"
              type="email"
            />
            <span onClick={onEmailCheck}>이메일인증</span>
          </p>

          <p className={`message-${isEmail ? "success" : "error"}`}>
            {emailMessage}
          </p>
        </div>
        {emailCertificated && (
          <div className="Signup-code">
            <p className="Signup-codeHeader">인증번호</p>
            <p>
              <input
                className="Signup-inputCode"
                placeholder="이메일 인증번호를 입력해주세요"
                onChange={onChangeCode}
                name="code"
                type="number"
              />
            </p>
          </div>
        )}
        <div className="Signup-Password">
          <p className="Signup-PasswordHeader">비밀번호</p>
          <input
            className="Signup-inputPassword"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={onChangePassword}
            name="password"
            type="password"
          />
          <p className={`message-${isPassword ? "success" : "error"}`}>
            {passwordMessage}
          </p>
        </div>
        <div className="Signup-PasswordCheck">
          <p className="Signup-PasswordCheckHeader">비밀번호 확인</p>
          <input
            className="Signup-inputPasswordCheck"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            name="password"
            type="password"
          />
          <p className={`message-${isPasswordCheck ? "success" : "error"}`}>
            {passwordCheckMessage}
          </p>
        </div>
        <div className="Signup-StoreName">
          <p className="Signup-StoreNameHeader">가게명</p>
          <input
            className="Signup-inputStoreName"
            placeholder="가게명을 입력해주세요"
            onChange={onChangeStoreName}
            name="storeName"
            type="text"
          />
          <p className={`message-${isStoreName ? "success" : "error"}`}>
            {storeNameMessage}
          </p>
        </div>
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
