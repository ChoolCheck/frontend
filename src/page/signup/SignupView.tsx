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
      <div className="inputContainer">
        <h1 className="TopHeader">Choolcheck</h1>
        <h2 className="Header">회원가입</h2>
        <div className="Email">
          <p className="EmailHeader">이메일</p>
          <p className="email-input-container">
            <input
              className="inputEmail"
              placeholder="이메일 입력해주세요"
              onChange={onChangeEmail}
              name="email"
              type="email"
            />
            <button id="emailCheckBtn" onClick={onEmailCheck}>
              이메일인증
            </button>
          </p>

          <p className={`message-${isEmail ? "success" : "error"}`}>
            {emailMessage}
          </p>
        </div>
        {emailCertificated && (
          <div className="code">
            <p className="codeHeader">인증번호</p>
            <p>
              <input
                className="inputCode"
                placeholder="이메일 인증번호를 입력해주세요"
                onChange={onChangeCode}
                name="code"
                type="text"
              />
            </p>
          </div>
        )}
        <div className="Password">
          <p className="PasswordHeader">비밀번호</p>
          <input
            className="inputPassword"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={onChangePassword}
            name="password"
            type="password"
          />
          <p className={`message-${isPassword ? "success" : "error"}`}>
            {passwordMessage}
          </p>
        </div>
        <div className="PasswordCheck">
          <p className="PasswordCheckHeader">비밀번호 확인</p>
          <input
            className="inputPasswordCheck"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            name="password"
            type="password"
          />
          <p className={`message-${isPasswordCheck ? "success" : "error"}`}>
            {passwordCheckMessage}
          </p>
        </div>
        <div className="StoreName">
          <p className="StoreNameHeader">가게명</p>
          <input
            className="inputStoreName"
            placeholder="가게명을 입력해주세요"
            onChange={onChangeStoreName}
            name="storeName"
            type="text"
          />
          <p className={`message-${isStoreName ? "success" : "error"}`}>
            {storeNameMessage}
          </p>
        </div>

        <button type="button" className="signupButton" onClick={onSubmitForm}>
          완료
        </button>
        <button type="button" className="cancleButton" onClick={onCancleSignup}>
          취소
        </button>
      </div>
    </div>
  );
};

export default SignupView;
