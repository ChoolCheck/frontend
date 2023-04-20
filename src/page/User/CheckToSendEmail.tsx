import "./style/checkToSendEmail.scss";
import "./style/mypage.scss";
import { useNavigate } from "react-router-dom";
import { SendEmailApi } from "../../api/mypage";

const CheckToSendEmail = () => {
  const navigate = useNavigate();

  const onClickGetEmail = () => {
    window.alert("메일이 전송되었습니다. 메일함을 확인해주세요.");
    navigate("/mypage");
    SendEmailApi();
  };

  return (
    <div className="checkToSendEmail-top-container">
      <div className="checkToSendEmail content">
        <div className="checkToSendEmail message">
          <p>
            아래 이메일받기를 선택하면
            <br /> 비밀번호 변경을 위한 이메일을 전송합니다.
          </p>
        </div>

        <button onClick={onClickGetEmail}>이메일 받기</button>
      </div>
    </div>
  );
};

export default CheckToSendEmail;
