import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Frame from "../main/Frame";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';


const NoticeUpdate = () => {

    const { noticeIdx } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/notice/${noticeIdx}`)
    //         .then(response => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, [])

    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/notice/update/${noticeIdx}`,
            { "noticeTitle": title, "noticeContent": content })
                .then(response => {
                    console.log(response)
                    alert("정상처리 되었습니다");
                    navigate('/noticeList')
                })
                .catch(error => {
                    console.log(error);
                    alert(`요기서 에러 ${error.message}`);
                })

    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeConnent = (e) => {
        setContent(e.target.value);
    };

    return (
        <Frame>
            <h2>공지사항</h2>
            <h3>공지사항 제목</h3>
            <Input placeholder="제목을 적어주세요" id="title" name="title" value={title} onChange={handleChangeTitle} style={{ border: "none", borderBottom: "1px solid #5E8FCA", borderRadius: 0, width: "1180px" }} />
            <h3>공지사항 내용</h3>
            <Textarea id="content" name="content" value={content} placeholder="내용을 적어주세요" onChange={handleChangeConnent} variant="plain" style={{ borderBottom: "1px solid rgba(94, 143, 202, 0.2)", borderTop: "1px solid #5E8FCA", borderRadius: 0, width: "1180px", height: "363px" }} />
            <div style={{ borderBottom: "1px solid #5e8fca" }}>
                <strong>첨부파일</strong>
                <Button>파일등록</Button>
            </div>
            <Button type="button" onClick={handlerClickUpdate}>수정하기</Button>
        </Frame>
    )
}

export default NoticeUpdate;