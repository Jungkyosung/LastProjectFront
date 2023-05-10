import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const TriedDetail = () => {
    const navigate = useNavigate();

    const { triedIdx } = useParams();

    const [tried, setTried] = useState({});

    useEffect(() => {
        axios.get(
            `http://localhost:8080/api/tried/${triedIdx}`)
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            .then(response => {
                console.log(response.data);
                setTried(response.data);
            })
            .catch(error =>
                console.log(error)
            );
    }, []);

    // Tried 페이지로 이동
    const handlerClickList = () => {
        console.log(navigate);
        navigate('/tried');
    };

    // Tried Detail 삭제
    const handlerClickDelete = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`http://localhost:8080/api/tried/${triedIdx}`)
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                .then(response => {
                    console.log(response);
                    navigate('/tried');
                })
                .catch(error => {
                    console.log(error);
                    alert(`삭제 실패: (${error.message})`);
                });
        }
    }
    
    return (
        <>
            <div className="triedDetail-container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <input type="hidden" name="triedIdx" />
                    <div className="tried-title">
                        <div>닉네임 : {tried.userId}</div>
                        <div>작성 시간 : {tried.triedCreatedTime}</div>
                        <div>제목 : {tried.triedTitle}</div>
                        <div className="detail">
                            <div>조회수 : {tried.triedCnt}</div>
                            <div>추천수: {tried.triedRcmd}</div>
                        </div>
                        <div className="tried-img">
                            <div>이미지 들어가는 자리</div>
                            <div>{tried.triedImg}</div>

                            <div className="tried-content">
                                <div>내용</div>
                                <div>{tried.triedContent}</div>
                            </div>
                        </div>
                    </div>
                </form>
                <button onClick={handlerClickList}>목록</button>
                <Link to={`/tried/detail/${triedIdx}/update`}>
                    <button>수정</button>
                </Link>
                <button onClick={handlerClickDelete}>삭제</button>
            </div>
        </>
    );
};

export default TriedDetail;