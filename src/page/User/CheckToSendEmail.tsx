import * as type from "./type";
import "./style/mypageView.scss";
import { useNavigate } from "react-router-dom";
import { SendEmailApi } from "../../api/mypage";

const CheckToSendEmail = () => {
  const navigate = useNavigate();

  const onClickGetEmail = () => {
    SendEmailApi({ navigate });
  };
  return (
    <div className="mypageview-top-container">
      <p className="checkToSendEmail-content">
        아래 이메일받기를 선택하면 비밀번호 변경을 위한 이메일을 전송합니다.
      </p>
      <div className="button-container">
        <button onClick={onClickGetEmail}>이메일 받기</button>
      </div>
    </div>
  );
};

export default CheckToSendEmail;
