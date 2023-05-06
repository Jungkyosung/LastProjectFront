import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TriedDetail = () => {
    const { triedIdx } = useParams();
    const navigate = useNavigate();     // useNavigate hook 사용

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

    // TriedList Page 이동
    const handlerClickList = () => {
        console.log(navigate);
        navigate('/tried');
    };

    const handlerClickEdit = () => {
        console.log(navigate);
        navigate(`/tried/detail/${triedIdx}/edit`);
    };

    // 삭제
    const handlerClickDelete = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios.delete(`http://localhost:8080/api/tried/${triedIdx}`)
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                .then(response => {
                    console.log(response);
                    navigate('/tried/edit/${triedIdx}');
                })
                .catch(error => {
                    console.log(error);
                    alert('삭제 실패: (${error.message})');
                });
        }
    }

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
                    onClick={handlerClickEdit} />
                <input type="button" id="delete" className="btn" value="삭제"
                    onClick={handlerClickDelete} />
            </div>
        </>
    );
};

export default TriedDetail;