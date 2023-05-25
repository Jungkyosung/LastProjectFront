import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Frame from "../main/Frame";
import './TriedDetail.css';

const TriedDetail = () => {

    let jwtToken = null;
    if (sessionStorage.getItem("token") != null) {
        jwtToken = sessionStorage.getItem("token");
    }

    const header = {
        Authorization: `Bearer ${jwtToken}`
    };

    const navigate = useNavigate();

    const { triedIdx } = useParams();

    const [imageUrl, setImageUrl] = useState('');
    const [filename, setFilename] = useState('');
    const [triedImg, setTriedImg] = useState([]);
    const [tried, setTried] = useState({});

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/detail/${triedIdx}`,
            { headers: header })
            .then(response => {
                setFilename(response.data.triedImg);
                setTried(response.data);
            })
            .catch(error =>
                console.log(error)
            );
    }, []);

    // 이미지 가져오기
    useEffect(() => {
        if (filename) {
            const imageUrl = `http://${process.env.REACT_APP_CMJ_IP}:8080/api/getImage/${filename}`;
            axios.get(imageUrl, { responseType: 'arraybuffer' })
                .then(response => {
                    const imageBlob = new Blob([response.data], { type: response.headers['content-type'] })
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImageUrl(imageUrl);
                    console.log(imageUrl);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [filename, triedImg]);

    // 버튼 => 목록
    const handlerClickList = () => {
        navigate('/tried');
    };

    // 버튼 => 수정
    const handlerClickUpdate = (imgUrl) => {
        navigate(`/tried/update/${triedIdx}`, { state: { imgUrl: imgUrl } });
    };

    // 버튼 => 삭제
    const handlerClickDelete = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/${triedIdx}`)
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                .then(response => {
                    console.log(response);
                    alert('삭제 완료')
                    navigate('/tried');
                })
                .catch(error => {
                    console.log(error);
                    alert('삭제 실패');
                });
        }
    };

    return (
        <Frame>
            <div id="travelcourse-list-img">
                <img src="https://i.pinimg.com/564x/67/1b/ba/671bba36fccbc46d70f7e2631b781c61.jpg" />
            </div>
            <div className="triedDetail-container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <input type="hidden" name="triedIdx" />
                    <div className="tried-title">
                        <div>닉네임 : {tried.userId}</div>
                        <div>작성 시간 : {tried.triedCreatedTime}</div>
                        <div>글 번호 : {tried.triedIdx}</div>
                        <div>제목 : {tried.triedTitle}</div>
                        <div className="detail">
                            <div>조회수 : {tried.triedCnt}</div>
                            <div>추천수: {tried.triedRcmd}</div>
                        </div>
                        <div className="tried-img">
                            <div>이미지</div>
                            <img
                                src={imageUrl} style={{ width: '500px' }}
                            />
                            <div className="tried-content">
                                <div>내용</div>
                                <div>{tried.triedContent}</div>
                            </div>
                        </div>
                    </div>
                </form>
                <input type="button" id="list" className="btn" value="목록" onClick={handlerClickList} />
                <input type="button" id="edit" className="btn" value="수정" onClick={() => handlerClickUpdate(imageUrl)} />
                <input type="button" id="delete" className="btn" value="삭제" onClick={handlerClickDelete} />
            </div>
        </Frame>
    );
};

export default TriedDetail;