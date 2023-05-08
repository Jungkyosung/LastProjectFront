import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TriedWrite = () => {
    const navigate = useNavigate();     // useNavigate hook 사용

    const [triedTitle, setTriedTitle] = useState('');
    const [triedContent, setTriedContent] = useState('');
    const [categoryIdx, setCategoryIdx] = useState('');     //추가됨
    const [triedImg, setTriedImg] = useState('');
    const [triedIdx, setTriedIdx] = useState('');

    const handlerChangeTitle = e => setTriedTitle(e.target.value);
    const handlerChangeContent = e => setTriedContent(e.target.value);
    const handlerChangeCategory = e => setCategoryIdx(e.target.value);

    const handlerSubmit = e => {
        e.preventDefault();

        if (window.confirm('글을 등록하시겠습니까?')) {
            axios.post(
                `http://localhost:8080/api/tried/write`,
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                { triedTitle, triedContent, }        // 요청 본문 값 단축 속성명
            )
                .then(response => {
                    if (response.data.count === 1) {
                        alert('등록 완료');
                        console.log(response.data.categoryIdx);
                        setTriedIdx(response.data.triedIdx);
                        navigate(`/tried`);
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert(`등록 실패 (${error.message})`);
                    return;
                });
        }
    };

    return (
        <>
            <div className="write-container">
                <h2>글쓰기 페이지</h2>
                <form id="frm" name="frm" onSubmit={handlerSubmit}>
                    <div className="write-detail">
                        <div>
                            <div>제목</div>
                            <div>
                                <input type="text" id="title" name="title" value={triedTitle}
                                    onChange={handlerChangeTitle}
                                />
                            </div>
                            <div>
                                <select value={categoryIdx}
                                    onChange={handlerChangeCategory}>
                                    <option value="">카테고리 선택</option>
                                    <option value="1">음식</option>
                                    <option value="2">장소</option>
                                    <option value="3">문화</option>
                                </select>
                            </div>
                        </div>
                        <div> 사진 넣는 자리 </div>
                        <div>
                            <div colSpan="2">
                                <textarea id="content" name="content" value={triedContent}
                                    onChange={handlerChangeContent} />
                            </div>
                        </div>
                    </div>
                    <input type="submit" id="submit" value="완료" className="btn" />
                </form>
            </div>
        </>
    );
};

export default TriedWrite;