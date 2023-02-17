import { useNavigate } from "react-router-dom";
import "./style/mypageView.scss";
import * as type from "./type";

const MypageView = ({ userInfo }: type.mypageViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="mypageview-top-container">
      <h3 className="mypageview-header">회원 정보</h3>
      <div className="mypageview-content">
        <p className="mypageview-email">
          <span className="email-title">이메일</span>
          <span className="email-content">{userInfo.email}</span>
        </p>
        <p className="mypageview-storename">
          <span className="storename-title">가게명</span>
          <span className="storename-content">{userInfo.storeName}</span>
        </p>
        <p className="mypageview-joindate">
          <span className="joindate-title">가입일</span>
          <span className="joindate-content">{userInfo.createdDate}</span>
        </p>
      </div>
      <div className="button-container">
        <button onClick={() => navigate("/checkToSendEmail")}>
          비밀번호 변경
        </button>

        <button
          onClick={() => navigate("/updateUserInfo", { state: userInfo })}
        >
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default MypageView;
