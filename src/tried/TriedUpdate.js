import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TriedUpdate = () => {
    const navigate = useNavigate();     // useNavigate hook 사용

    const { triedIdx } = useParams();

    const [tried, setTried] = useState({});
    const [triedTitle, setTriedTitle] = useState('');
    const [triedContent, setTriedContent] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/tried/${triedIdx}`)
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            .then(response => {
                console.log(response.data);
                // 초기값 설정
                setTried(response.data);
                setUserId(response.data.userId);
                setTriedTitle(response.data.triedTitle);
                setTriedContent(response.data.triedContent);
            })
            .catch(error =>
                console.log(error));
    }, [triedIdx]);

    // 제목 수정
    const handlerTitleChange = (event) => {
        setTriedTitle(event.target.value);
    };

    // 내용 수정
    const handlerContentChange = (event) => {
        setTriedContent(event.target.value);
    };

    // 리스트 페이지로 이동
    const handlerClickList = () => {
        console.log(navigate);
        navigate('/tried');
    };

    // 수정
    const handlerClickUpdate = () => {
        if (window.confirm('수정하시겠습니까?')) {
            axios.put(`http://localhost:8080/api/tried/${triedIdx}`,
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                { "triedTitle": triedTitle, "triedContent": triedContent })
                .then(response => {
                    console.log(response);
                    if (response.data === 1) {
                        alert('수정 완료');
                        navigate(`/tried/detail/${triedIdx}`)
                    } else {
                        alert(`수정 실패 : (${response.message})`);
                        return;
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert(`수정 실패 : (${error.message})`);
                    return;
                });
        };
    };

    return (
        <>
            <div className="triedDetail-container">
                <h2>게시판 수정</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <div value={tried.userId}>작성자: </div>
                    <div> 제목 :
                        <input type="text" name="triedTitle" value={triedTitle || ''}
                            onChange={handlerTitleChange} />
                    </div>
                    <div className="update-img">이미지 자리: </div>

                    <div>
                        <input type="text" name="triedContent" value={triedContent || ''}
                            onChange={handlerContentChange} />
                    </div>
                </form>
                <input type="button" id="list" className="btn" value="목록"
                    onClick={handlerClickList} />
                <input type="button" id="update" className="btn" value="수정"
                    onClick={handlerClickUpdate} />
            </div>
        </>
    );
};

export default TriedUpdate;