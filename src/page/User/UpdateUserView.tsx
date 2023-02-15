import * as type from "./type";
import "./style/mypageView.scss";

const UpdateUserView = ({
  userInfo,
  storeName,
  onChangeName,
  onCancelClick,
  onUpdateClick,
}: type.updateUserProps) => {
  return (
    <div className="mypageview-top-container">
      <h3 className="mypageview-header">회원정보 수정</h3>
      <div className="mypageview-content">
        <p className="mypageview-email">
          <span className="email-title">이메일</span>
          <span className="email-content">{userInfo.email}</span>
        </p>
        <p className="mypageview-storename">
          <span className="storename-title">가게명</span>
          <input
            className="storename-content-input"
            value={storeName}
            onChange={onChangeName}
          ></input>
        </p>
        <p className="mypageview-joindate">
          <span className="joindate-title">가입일</span>
          <span className="joindate-content">{userInfo.createdDate}</span>
        </p>
      </div>
      <div className="button-container">
        <button onClick={onCancelClick}>취소</button>
        <button onClick={onUpdateClick}>수정</button>
      </div>
    </div>
  );
};

export default UpdateUserView;
