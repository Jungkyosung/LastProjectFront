import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TriedWrite = () => {
    const navigate = useNavigate();

    const [triedTitle, setTriedTitle] = useState('');
    const [triedContent, setTriedContent] = useState('');
    const [triedCategoryIdx, setTriedCategoryIdx] = useState('1');
    const [triedImg, setTriedImg] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    
    const handlerChangeTitle = e => setTriedTitle(e.target.value);
    const handlerChangeContent = e => setTriedContent(e.target.value);
    const handlerClick = e => {
        console.log('선택된 값:', e.target.value);
        setTriedCategoryIdx(e.target.value);
    };

    const inputFile = useRef();

    const handlerChangeFile = (e) => {
        const name = e.target.name;
        const files = e.target.files;

        if (e.target.name == 'triedImg') {
            const imageArr = e.target.files;
            let imageURLs = [];
            let image;
            let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

            for (let i = 0; i < imagesLength; i++) {
                image = imageArr[i];

                // 이미지 미리보기
                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    imageURLs[i] = reader.result;
                    setTriedImg([...imageURLs]);
                };
                reader.readAsDataURL(image);
            }
        }
        const unchangedImageFiles = imageFiles.filter(file => file.name !== name)
        setImageFiles([...unchangedImageFiles, { name, files }]);
    }

    // FORM DATA를 저장할 상태 변수를 변수 이름: 값 형식으로 설정
    let datas = {
        triedTitle: triedTitle,
        triedContent: triedContent,
        triedCategoryIdx: triedCategoryIdx
    };

    // 서버로 전달할 폼 데이터를 작성
    const formData = new FormData();
    formData.append(
        'data',
        new Blob([JSON.stringify(datas)], { type: 'application/json' })
    );
    Object.values(imageFiles).forEach(
        file => Object.values(file.files).forEach(
            f => formData.append(file.name, f)));

    // multipart/form-data 형식으로 서버로 전달
    const handlerSubmit = (e) => {
        console.log(datas);
        console.log(formData);
        e.preventDefault();
        if (window.confirm("글을 작성하시겠습니까?")) {
            axios.post(`http://${process.env.REACT_APP_CMJ_IP}:8080/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            })
                .then(response => {
                    console.log(response)
                    alert('글을 작성하셨습니다.')
                    navigate('/tried')
                })
                .catch(error => {
                    console.log(error)
                    alert(error.message)
                })
        };
    };

    return (
        <>
            <div className="write-container">
                <h2>글쓰기 페이지</h2>
                <form
                    id="frm" name="frm" onSubmit={handlerSubmit}>
                    <div className="write-detail">
                        <div>
                            <div>제목</div>
                            <div>
                                <input type="text" id="title" name="title"
                                    value={triedTitle}
                                    onChange={handlerChangeTitle}
                                />
                            </div>
                            <div>
                                <select
                                    value={triedCategoryIdx}
                                    onChange={handlerClick}>
                                    <option value="" >카테고리 선택</option>
                                    <option value="1" id="1">음식</option>
                                    <option value="2" id="2">장소</option>
                                    <option value="3" id="3">문화</option>
                                </select>
                            </div>
                            {
                                triedImg.length !== 0
                                    ?
                                    <>
                                        {triedImg.map((image, id) => (
                                            <div key={id}>
                                                <img src={image} style={{ width: '300px' }} />
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <>
                                        <input type='file' name='triedImg'
                                            ref={inputFile} onChange={handlerChangeFile}
                                            style={{ width: '50%', height: 300, background: 'red' }}
                                        />
                                    </>
                            }
                        </div>
                        <div>
                            <div colSpan="2">
                                <textarea
                                    id="content" name="content"
                                    value={triedContent} onChange={handlerChangeContent} />
                            </div>
                        </div>
                    </div>
                    <input
                        className="btn" type="submit" id="submit" value="완료"
                    />
                </form>
            </div>
        </>
    );
};

export default TriedWrite;