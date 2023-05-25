import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Frame from "../main/Frame";
import './TriedDetail.css';
import { Button } from "@mui/material";
import TriedThumb from "./TriedThumb";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TriedComment from "./TriedComment";
import styles from "../qna/QnaDetail.module.css";
import Textarea from '@mui/joy/Textarea';


const TriedDetail = () => {

    let jwtToken = null;
    if (sessionStorage.getItem("token") != null) {
        jwtToken = sessionStorage.getItem("token");
    }

    const header = {
        Authorization: `Bearer ${jwtToken}`
    };

    const navigate = useNavigate();

    const { triedIdx } = useParams();

    const [imageUrl, setImageUrl] = useState('');
    const [filename, setFilename] = useState('');
    const [triedImg, setTriedImg] = useState([]);
    const [tried, setTried] = useState({});

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/detail/${triedIdx}`,
            { headers: header })
            .then(response => {
                setFilename(response.data.triedImg);
                setTried(response.data);
            })
            .catch(error =>
                console.log(error)
            );
        //마지막 글 여부 확인하기 만약 마지막 글이라면 다음글 버튼이 안보이도록 처리


    }, []);

    // 이미지 가져오기
    useEffect(() => {
        if (filename) {
            const imageUrl = `http://${process.env.REACT_APP_CMJ_IP}:8080/api/getimage/${filename}`;
            axios.get(imageUrl, { responseType: 'arraybuffer' })
                .then(response => {
                    const imageBlob = new Blob([response.data], { type: response.headers['content-type'] })
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImageUrl(imageUrl);
                    console.log(imageUrl);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [filename, triedImg]);

    // 버튼 => 목록
    const handlerClickList = () => {
        navigate('/tried');
    };

    // 버튼 => 수정
    const handlerClickUpdate = (imgUrl) => {
        navigate(`/tried/update/${triedIdx}`, { state: { imgUrl: imgUrl } });
    };

    // 버튼 => 삭제
    const handlerClickDelete = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/${triedIdx}`)
                // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                .then(response => {
                    console.log(response);
                    alert('삭제 완료')
                    navigate('/tried');
                })
                .catch(error => {
                    console.log(error);
                    alert('삭제 실패');
                });
        }
    };

    const handlerMoveToBeforeCont = () => {
        let beforeContIdx = triedIdx - 1;
        navigate(`/tried/detail/${beforeContIdx}`);
        window.location.reload();
    }

    const handlerMoveToAfterCont = () => {
        let afterContIdx = parseInt(triedIdx) + 1;
        navigate(`/tried/detail/${afterContIdx}`);
        window.location.reload();
    }

    return (
        <Frame>
            <div id="travelcourse-list-img">
                <img src="https://i.pinimg.com/564x/67/1b/ba/671bba36fccbc46d70f7e2631b781c61.jpg" />
            </div>
            <div className="triedDetail-container">
                <form action="" method="POST" id="frm" name="frm">
                    <input type="hidden" name="triedIdx" />
                    <div className="tried-title">

                        <div className="triedDetail-title">{tried.triedTitle}</div>
                        <div className="triedDetail-writer">{tried.userId}</div>

                        <div className="triedDetail-etc">
                            <div>{tried.triedCreatedTime}</div>
                            <div>조회수 {tried.triedCnt}</div>
                            <div>추천수 {tried.triedRcmd}</div>
                        </div>
                        <div className="triedDetail-img">
                            <img src={imageUrl} />
                            <TriedThumb />
                        </div>
                        <div className="triedDetail-content">
                            <div>{tried.triedContent}</div>
                        </div>
                    </div>
                    <div className="triedDetail-comnt-wrap">
                        댓글

                        <TriedComment />
                        <TriedComment />
                        <TriedComment />
                        <TriedComment />
                        <div className="triedDetail-comnt-write">
                            <div className={styles.comment}>
                                <Textarea
                                    style={{ borderRadius: "10px 0 0 10px", width: "90%" }}
                                    sx={{ color: "#333", }}
                                    color="primary"
                                    placeholder="Type in here…"
                                    minRows={3}
                                    // maxRows={4}
                                    //value={contents}
                                    //onChange={handlerChangeContents}
                                />
                                <Button sx={{ color: "white", background: "#5E8FCA", ":hover": { background: "#2d6ebd" } }} style={{ borderRadius: "0 10px 10px 0", width: "10%" }}  >등록</Button>
                            </div>
                        </div>
                    </div>
                </form>


                <div className="triedDetail-btns">
                    {triedIdx == 1 ? <div className="triedDetail-nextCont-btn"></div> :
                        <div onClick={handlerMoveToBeforeCont}><ArrowBackIcon />이전글</div>
                    }
                    <div>
                        <Button type='button' variant="contained" onClick={handlerClickList}>목록</Button>
                        <Button type='button' variant="contained" onClick={() => handlerClickUpdate(imageUrl)}>수정</Button>
                        <Button type='button' variant="contained" onClick={handlerClickDelete}>삭제</Button>
                    </div>
                    <div onClick={handlerMoveToAfterCont}>다음글<ArrowForwardIcon /></div>
                </div>


                {/* <input type="button" id="list" className="btn" value="목록" onClick={handlerClickList} />
                <input type="button" id="edit" className="btn" value="수정" onClick={() => handlerClickUpdate(imageUrl)} />
                <input type="button" id="delete" className="btn" value="삭제" onClick={handlerClickDelete} /> */}
            </div>
        </Frame>
    );
};

export default TriedDetail;