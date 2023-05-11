import Button from '@mui/joy/Button';
import Frame from "../main/Frame";
import styles from "./QnaDetail.module.css";
import { Link } from "react-router-dom";
import Textarea from '@mui/joy/Textarea';
import Parser from "html-react-parser";


const QnaDetail = () => {
    return (
        <Frame>
            <div className={styles.contentsWrap}>
                <h2 className={styles.title}>QNA</h2>
                <div className={styles.content}>
                    <h3 className={styles.subTitle}>질문 제목</h3>
                    <span>질문작성 시간</span>
                    <div className={styles.line1}></div>
                    <div className={styles.editor}>
                        {"noticeContent" == null ? "" : Parser(`noticeContent`)}
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
                    <Button sx={{  color: "white", background:"#5E8FCA", ":hover": { background: "#2d6ebd"}}} style={{ marginLeft: "20px", marginRight: "20px" }}>목록보기</Button>
                </div>
            </div>
        </Frame>
    )
}

export default QnaDetail;