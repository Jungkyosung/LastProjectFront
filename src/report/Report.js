import { useLocation } from "react-router-dom";
import Frame from "../main/Frame";


const Report = ()=>{

  const location = useLocation();
  //신고하기 기능 어케 하죠잉?


  return(
    <Frame>
      <div>
        신고하기 감싸기
        <div>
          신고하기 창
          <div>
            <div>
            신고자 아이디
            </div>
            <div>
            신고자 닉네임
            </div>
          </div>
          <div>
            신고사유 선택창
          </div>
          <div>
            신고 세부 입력, 텍스트 에리아
          </div>
          <div>
            신고하기 버튼
          </div>
        </div>
      </div>
    </Frame>
  )
}
export default Report;

