import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TiredEdit = () => {
    const { triedIdx } = useParams();
    const navigate = useNavigate();     // useNavigate hook 사용

    const [tried, setTried] = useState({});
    const [triedTitle, setTriedTitle] = useState('');
    const [triedContent, setTriedContent] = useState('');

    const handlerChangeTitle = e => setTriedTitle(e.target.value);
    const handlerChangeContent = e => setTriedContent(e.target.value);

    useEffect(() => {
        axios.get(
            `http://localhost:8080/api/tried/${triedIdx}`)
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            .then(response => {
                console.log(response.data);
                setTried(response.data);
                // setTriedTitle(response.data.riedTitle);
                // setTriedContent(response.data.riedContent);
            })
            .catch(error => 
                console.log(error)
            );
    }, []);

    // TriedList Page 이동
    const handlerClickList = () => {
        console.log(navigate);
        navigate('/tried');
    };

    // 수정
    const handlerClickEdit = () => {
        axios.put(`http://localhost:8080/api/tried/${triedIdx}`,
        // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            // 요청 URL
            { "title": triedTitle, "content": triedContent })       // 요청 본문을 통해 서버로 전달할 값
            .then(response => {                                     // 200번대 응답코드가 반환되는 경우
                console.log(response);
                if (response.data === 1) {                          // 수정 결과에 대한 메세지 처리
                    alert('수정 완료');
                    setIsClick(!isClick);
                } else {
                    alert('수정 실패');
                    setIsClick(!isClick);
                    return;
                }
            })
            .catch(error => {                                        // 200번대를 제외한 응답코드가 반환하는 경우
                console.log(error);
                alert(`수정 실패 : (${error.message})`);
                setIsClick(!isClick);
                return;
            });
    };

   
    
    const [isClick, setIsClick] = useState(false);

    return (
        <>
            <div className="triedDetail-container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <input type="hidden" name="triedIdx" />
                    <div className="tried-img">
                        <div>{tried.triedImg}</div>
                    </div>
                    <div className="tried-title">
                        <div>{tried.userId}</div>
                        <div>이미지 들어가는 자리</div>
                        <div>{tried.triedCreatedTime}</div>
                        {/* <div>{tried.triedCnt}</div> */}
                        <div>{tried.triedTitle}</div>
                    </div>
                    <div className="tried-content">
                        <div>{tried.triedContent}</div>
                    </div>
                    <div className="detail">
                        <div>{tried.triedRcmd}</div>
                    </div>

                </form>
                <input type="button" id="list" className="btn" value="목록"
                    onClick={handlerClickList} />
                <input type="button" id="edit" className="btn" value="수정"
                    onClick={handlerClickEdit } />              
            </div>
        </>
    );
};

export default TiredEdit;