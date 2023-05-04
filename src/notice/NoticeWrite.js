import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Frame from '../main/Frame';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NoticeWrite = () => {
    const navigate = useNavigate();

    // const {noticeIdx} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [noticeIdx, setNoticeIdx] = useState([]);
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/noticeList`)
    //         .then(response => {
    //             console.log(response.data)
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, [])

    // const handlerChangeNoticeIdx = (e) => {
    //     setNoticeIdx(e.target.value)
    // }
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeComment = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/notice/write`,
            { "noticeTitle": title, "noticeContent": content },
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response)
                alert("정상처리 되었습니다");
                navigate('/noticeList')
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            })

    };

    return (
        <Frame>
            <h2>공지사항</h2>
            <h3>공지사항 제목</h3>
            <Input placeholder="제목을 적어주세요" id="title" name="title" value={title} onChange={handleChangeTitle} style={{ border: "none", borderBottom: "1px solid #5E8FCA", borderRadius: 0, width: "1180px" }} />
            <h3>공지사항 내용</h3>
            <Textarea id="comment" name="comment" value={content} placeholder="내용을 적어주세요" onChange={handleChangeComment} variant="plain" style={{ borderBottom: "1px solid rgba(94, 143, 202, 0.2)", borderTop: "1px solid #5E8FCA", borderRadius: 0, width: "1180px", height: "363px" }} />
            <div style={{ borderBottom: "1px solid #5e8fca" }}>
                <strong>첨부파일</strong>
                <Button>파일등록</Button>
            </div>
            <Button onClick={handleSubmit} type="submit">등록하기</Button>
        </Frame>
    )
}

export default NoticeWrite;