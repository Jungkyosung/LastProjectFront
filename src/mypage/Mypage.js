import "./Mypage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import { useEffect, useState } from "react";
import Frame from "../main/Frame";
import axios from "axios";

const Mypage = () => {
  let jwtToken = null;

  if (sessionStorage.getItem("token") != null) {
    jwtToken = sessionStorage.getItem("token");
  }

  const header = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    const userId = "jksin1992@gmail.com";
    let tempUserId = userId.replace(".", "-");
    axios
      .get(`http://localhost:8080/api/mypage/${tempUserId}`, {
        headers: header,
      })
      .then((response) => {
        setTravelcourse(response.data.travelcourse);
        setAccompany(response.data.accompany);
        setIdealreal(response.data.idealreal);
        setQna(response.data.qna);
        setTried(response.data.tried);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [travelcourse, setTravelcourse] = useState([]);
  const [travelcourseTitle, setTravelcourseTitle] = useState([]);

  const [accompany, setAccompany] = useState([]);
  const [accompanyTitle, setAccompanyTitle] = useState([]);

  const [idealreal, setIdealreal] = useState([]);
  const [idealrealTitle, setIdealrealTitle] = useState([]);

  const [qna, setQna] = useState([]);
  const [qnaTitle, setQnaTitle] = useState([]);

  const [tried, setTried] = useState([]);
  const [triedTitle, setTriedTitle] = useState([]);

  return (
    <Frame>
      <div id="profile-wrap">
        <div id="profile-title">My Page</div>
        <div id="profile">
          <img src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg"></img>
          <span className="modifier">
            <FlipCameraIosIcon />
            프로필 사진 변경
          </span>
          <p>nickName</p>
          <span className="modifier">
            <EditNoteIcon />
            닉네임 변경
          </span>
        </div>

        <div>
          {travelcourse.map((t) => (
            <div key={t.travelcourseIdx}>
              <p>{t.travelcourseIdx}</p>
              <p>{t.travelcourseTitle}</p>
            </div>
          ))}
        </div>

        <div>
          {accompany.map((a) => (
            <div key={a.accompanyIdx}>
              <p>{a.accompanyIdx}</p>
              <p>{a.accompanyTitle}</p>
            </div>
          ))}
        </div>

        {/* 빈 배열만 들어옴 */}
        {/* <div>
          {idealreal.map((i) => (
            <div key={i.idealrealIdx}>
              <p>{i.idealrealIdx}</p>
              <p>{i.idealrealTitle}</p>
            </div>
          ))}
        </div>

        <div>
          {qna.map((q) => (
            <div key={q.qnaIndex}>
              <p>{q.qnaIdx}</p>
              <p>{q.qnaTitle}</p>
            </div>
          ))}
        </div>

        <div>
          {tried.map((t) => (
            <div key={t.triedIndex}>
              <p>{t.triedIdx}</p>
              <p>{t.triedTitle}</p>
            </div>
          ))}
        </div> */}

        {/* <div>
          <div>현재 작성한 글이 없습니다.</div>
          <div>1번 글 어쩌구 저쩌구</div>
          <div>2번 글 어쩌구 저쩌구</div>
          <div>3번 글 어쩌구 저쩌구</div>
          <div>4번 글 어쩌구 저쩌구</div>
        </div> */}
      </div>
    </Frame>
  );
};

export default Mypage;
