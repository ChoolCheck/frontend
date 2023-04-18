import threeDots from "../../static/icon/three-dots.png";

const SideMenu = () => {
  return (
    <div>
      <img className="seeMore-button" src={threeDots} onClick={() => {}}></img>
      <ul>
        <li>수정</li>
        <li>삭제</li>
      </ul>
    </div>
  );
};

export default SideMenu;
