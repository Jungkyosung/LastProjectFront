import Button from '@mui/joy/Button';
import Frame from "../main/Frame";
import styles from "./QnaDetail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Textarea from '@mui/joy/Textarea';
import Parser from "html-react-parser";
import { useState, useEffect } from 'react';
import axios from 'axios';

const QnaDetail = () => {

    const navigate = useNavigate();

    const { qnaIdx } = useParams();

    const [qna, setQna] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/qna/${qnaIdx}`)
            .then(response => {
                console.log(response.data)
                setQna(response.data);
                let str = response.data.qnaContent;
                console.log(typeof str);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const handlerClickList = () => navigate('/qnalist');

    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/qna/${qnaIdx}`
            // ,{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                alert('정상적으로 삭제되었습니다.');
                navigate('/qnalist');				// 정상적으로 삭제되면 목록으로 이동

            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };

    return (
        <Frame>
            <div className={styles.contentsWrap}>
                <h2 className={styles.title}>QNA</h2>
                <div className={styles.content}>
                    <h3 className={styles.subTitle}>{qna.qnaTitle}</h3>
                    <span>{qna.qnaCreatedTime}</span>
                    <div className={styles.line1}></div>
                    <div className={styles.editor}>
                        {qna.qnaContent == null ? "" : Parser(qna.qnaContent)}
                    </div>
                    <div className={styles.line2}></div>
                </div>
                <div className={styles.comment}>
                    <Textarea
                        style={{borderRadius: "10px 0 0 10px", width:"90%"}}
                        sx={{ color:"#333",}}
                        color="primary"
                        placeholder="Type in here…"
                        minRows={3}
                        // maxRows={4}
                    />
                    <Button  sx={{  color: "white", background:"#5E8FCA",":hover": { background: "#2d6ebd" }}} style={{borderRadius: "0 10px 10px 0", width:"10%"}}>등록</Button>
                </div>
                <div className={styles.commentList}>
                    <div className={styles.name}>
                        <strong>Admin</strong>
                        <span>2022.04.11.17:51</span>
                    </div>
                    {/* <div className={styles.read}> */}
                        <p>이번에도 멀리멀리 날아가시나요</p>
                    {/* </div> */}
                </div>
                <div className={styles.buttonWrap}>
                    <Link to={`/qna/update/${qnaIdx}`}><Button sx={{  color: "white", background:"#5E8FCA", ":hover": { background: "#2d6ebd"}}}>수정하기</Button></Link>
                    <Button sx={{  color: "white", background:"#5E8FCA", ":hover": { background: "#2d6ebd"}}} style={{ marginLeft: "20px", marginRight: "20px" }} onClick={handlerClickList}>목록보기</Button>
                    <Button sx={{  color: "white", background:"#5E8FCA", ":hover": { background: "#2d6ebd"}}} onClick={handlerClickDelete}>삭제하기</Button>
                </div>
            </div>
        </Frame>
    )
}

export default QnaDetail;