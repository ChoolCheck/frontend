import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupView from "./SignupView";
import { SignupApi, CertificateEmailApi } from "../../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    storeName: "",
    code: "",
  });

  const { email, password, storeName, code } = form;

  //오류메시지 상태저장
  const [storeNameMessage, setStoreNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  // 유효성 검사
  const [isStoreName, setIsStoreName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const [emailCertificated, setEmailCertificated] = useState(false);

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  var spaceRegex = /\s/; // 공백체크

  const onChangeForm = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailMessage("이메일 형식이 틀렸습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCheckNow = e.target.value;
    if (password === passwordCheckNow) {
      setPasswordCheckMessage("동일한 비밀번호입니다.");
      setIsPasswordCheck(true);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordCheck(false);
    }
  };

  const onChangeStoreName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(e.target.name, e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setStoreNameMessage("공백없이 2글자 이상 20글자 미만으로 입력해주세요.");
      setIsStoreName(false);
    } else if (spaceRegex.exec(e.target.value)) {
      setStoreNameMessage("공백이 포함되어있습니다.");
      setIsStoreName(false);
    } else {
      setStoreNameMessage("올바른 이름 형식입니다.");
      setIsStoreName(true);
    }
  };

  const onCancleSignup = () => {
    if (window.confirm("회원가입을 취소하시겠습니까?")) {
      navigate("/login");
    }
  };

  const onEmailCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (email == "") window.alert("이메일을 입력해주세요");
    else if (isEmail == false) window.alert("이메일 형식을 확인해주세요");
    else {
      e.currentTarget.disabled = true;
      e.currentTarget.style.color = "darkgrey";
      CertificateEmailApi({
        email,
        setEmailCertificated,
        btn: e,
      });
    }
  };
  const onSubmitForm = () => {
    if (email == "") window.alert("이메일을 입력해주세요");
    else if (isEmail == false) window.alert("이메일 형식을 확인해주세요");
    else if (emailCertificated == false) window.alert("이메일 인증을 해주세요");
    else if (code == "") window.alert("이메일 인증 코드를 입력해주세요");
    else if (password == "") window.alert("비밀번호를 입력해주세요");
    else if (isPassword == false) window.alert("비밀번호 형식을 확인해주세요");
    else if (isPasswordCheck == false)
      window.alert("비밀번호가 일치하지 않습니다");
    else if (storeName == "") window.alert("가게명을 입력해주세요");
    else SignupApi({ email, password, storeName, code, navigate });
  };

  return (
    <SignupView
      storeNameMessage={storeNameMessage}
      emailMessage={emailMessage}
      passwordMessage={passwordMessage}
      passwordCheckMessage={passwordCheckMessage}
      isEmail={isEmail}
      isPassword={isPassword}
      isPasswordCheck={isPasswordCheck}
      isStoreName={isStoreName}
      emailCertificated={emailCertificated}
      onCancleSignup={onCancleSignup}
      onSubmitForm={onSubmitForm}
      onChangeEmail={onChangeEmail}
      onChangeCode={onChangeCode}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      onChangeStoreName={onChangeStoreName}
      onEmailCheck={onEmailCheck}
    ></SignupView>
  );
};
export default Signup;
