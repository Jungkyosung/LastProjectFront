import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Frame from '../main/Frame';

const NoticeWrite = () => {
    return(
        <Frame>
            <h2>공지사항</h2>
            <h3>공지사항 제목</h3>
            <Input placeholder="Type in here…" style={{ border: "none", borderBottom: "1px solid #5E8FCA", borderRadius:0, width:"1180px"}} />
            <h3>공지사항 내용</h3>
            <Textarea name="Plain" placeholder="Type in here…" variant="plain" style={{borderBottom:"1px solid rgba(94, 143, 202, 0.2)", borderTop:"1px solid #5E8FCA", borderRadius:0, width:"1180px", height:"363px"}} />
            <div style={{borderBottom: "1px solid #5e8fca"}}>
                <strong>첨부파일</strong>
                <Button>파일등록</Button>
            </div>
            <Button>등록하기</Button>
        </Frame>
    )
}

export default NoticeWrite;