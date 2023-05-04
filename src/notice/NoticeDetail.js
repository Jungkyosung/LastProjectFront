import axios from "axios"
import Frame from "../main/Frame"
import Button from '@mui/joy/Button';
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const NoticeDetail = () => {
    const navigate = useNavigate();

    const { noticeIdx } = useParams();

    const [notice, setNotice] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/notice/${noticeIdx}`)
            .then(response => {
                console.log(response.data)
                setNotice(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [noticeIdx])

    const handlerClickList = () => navigate('/noticeList');

    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/notice/${noticeIdx}`
            // ,{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response);

                alert('정상적으로 삭제되었습니다.');
                navigate('/noticeList');				// 정상적으로 삭제되면 목록으로 이동

            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };

    return (
        <Frame>
            <h2>공지사항</h2>
            <div>
                <em>공지</em>
                <h3>{notice.noticeTitle}</h3>
                <span>{notice.noticeCreatedTime}</span>
                <p>{notice.noticeContent}</p>
                <strong>첨부파일</strong>
                <div>첨부파일1</div>
                <div>첨부파일2</div>
            </div>
            <div>
                <Link to={`/notice/update/${noticeIdx}`}><Button>수정하기</Button></Link>
                <Button onClick={handlerClickList}>목록보기</Button>
                <Button onClick={handlerClickDelete}>삭제하기</Button>
            </div>
        </Frame>
    )
}

export default NoticeDetail;