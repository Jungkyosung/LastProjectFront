import { Input } from "@mui/material";
import Frame from "../main/Frame";
import styles from "./QnaWrite.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";


const QnaWrite = () => {

    const navigate = useNavigate();

    //CKEditor
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

    // const handleChangeContent = (e) => {
    //     setContent(e.target.value);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/qna/write`,
            { "qnaTitle": title, "qnaContent": content },
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response)
                alert("정상처리 되었습니다");
                navigate('/qnalist')
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            })

    };

    return (
        <Frame>
            <div className={styles.contentsWrap}>
                <h2 className={styles.qnaTitle}>QNA 문의하기</h2>
                <h3 className={styles.subTitle}>문의 제목</h3>
                <Input placeholder="제목을 적어주세요" id="qnatitle" name="title" value={title} onChange={handleChangeTitle}  style={{ border: "none", borderBottom: "1px solid #5E8FCA", borderRadius: 0, width: "60%" }} />
                <h3 className={styles.subTitle}>문의 내용</h3>
                {/* <Textarea id="comment" name="comment" value={content} placeholder="내용을 적어주세요" onChange={handleChangeComment} variant="plain" style={{ borderBottom: "1px solid rgba(94, 143, 202, 0.2)", borderTop: "1px solid #5E8FCA", borderRadius: 0, width: "1180px", height: "363px" }} /> */}
                <div className={styles.editor}>
                    <CKEditor
                        editor={ClassicEditor}
                        data="</br></br></br></br></br></br></br></br></br></br></br></br>"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            setContent(data);
                        }}
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                    />
                </div>
                <Button onClick={handleSubmit} type="submit">등록하기</Button>
            </div>
        </Frame>
    )
}

export default QnaWrite;