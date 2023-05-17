import { useState, useEffect } from "react";
import axios from "axios";
import Thumb from "./Thumb";
import { useNavigate, useParams } from "react-router-dom";
import Frame from "../main/Frame";
import styles from "./IdealrealDetail.module.css";
import Parser from "html-react-parser";
import Button from '@mui/joy/Button';


function IdealrealDetail() {
    const [data, setData] = useState([]);
    const [idealrealTitle, setIdealrealTitle] = useState('');
    const [idealrealContent, setIdealrealContent] = useState('');
    const [userId, setUserId] = useState('');
    const [idealrealCreatedTime, setIdealrealCreatedTime] = useState('');
    const [idealrealCnt, setIdealrealCnt] = useState('');
    const [idealrealIdealImg, setIdealrealIdealImg] = useState([]);
    const [idealrealRealImg, setIdealrealRealImg] = useState([]);
    const [idealrealRcmd, setIdealrealRcmd] = useState('');

    const handlerChangeTitle = e => setIdealrealTitle(e.target.value)
    const handlerChangeContent = e => setIdealrealContent(e.target.value)

    const { idealrealIdx } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        // if (!sessionStorage.getItem('token')) {
        //     alert("로그인 했어?")
        //     history.push("/login")
        //     return
        // }

        axios.get(`http://192.168.0.4:8080/api/listidealreal/detail/${idealrealIdx}`
            // ,{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response);
                setIdealrealTitle(response.data.idealrealTitle);
                setIdealrealContent(response.data.idealrealContent);
                setUserId(response.data.userId);
                setIdealrealCreatedTime(response.data.idealrealCreatedTime);
                setIdealrealCnt(response.data.idealrealCnt);
                setIdealrealIdealImg(response.data.idealrealIdealImg);
                setIdealrealRealImg(response.data.idealrealRealImg);
                setIdealrealRcmd(response.data.idealrealRcmd);
            })
            .catch(error => console.log(error));
    }, []);

    //목록 수정 삭제 버튼 클릭시 이동
    const hanlderClickList = () => navigate('/idealreal')
    const handlerClickRetouch = () => navigate(`/idealrealretouch/${idealrealIdx}`)
    const handlerClickDelete = () => {
        axios.delete(`http://192.168.0.4:8080/api/listidealreal/${idealrealIdx}`,
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response)
                alert('헤어진 다음날 전화기를 켜보니')
                navigate('/idealreal');
            })
            .catch(erorr => {
                console.log('안되나용')
                return
            })
    };
    // 이미지를 가져오는 주소를 설정
    const idealImg = `http://192.168.0.4:8080/api/getimage/${idealrealIdealImg}`;
    const realImg = `http://192.168.0.4:8080/api/getimage/${idealrealRealImg}`;

    // const container = {
    //     display: 'flex',
    //     flexDirection: 'comlum',
    //     width: '1180px',
    //     margin: '0 auto',
    //     position: 'relative'
    // }



    return (
        <Frame>
            <div className={styles.containerWrap}>
                <h2 className={styles.realTitle}>이상과 현실</h2>
                <div className={styles.content}>
                    <h3 className={styles.subTitle}>{idealrealTitle}</h3>
                    <span className={styles.userId}>{userId}</span>
                    <div className={styles.timeCnt}>
                        <span style={{marginLeft:"51%"}}>{idealrealCreatedTime}</span>
                        <span>조회수 {idealrealCnt}</span>
                    </div>
                    <div className={styles.contentBox}>
                        <div className={styles.imgBox}>
                            <img src={realImg} className={styles.img} />
                            <img src={idealImg} className={styles.img} />
                        </div>
                        <div className={styles.lineBox}>
                            <div className={styles.line1}></div>
                            <div className={styles.editor}>
                                {idealrealContent == null ? "" : Parser(idealrealContent)}
                            </div>
                            <div className={styles.line2}></div>
                        </div>
                    </div>
                        <div style={{margin:"20px 0"}}><Thumb idealrealIdx={idealrealIdx}/></div>
                </div>
                {/* <form action="" method="POST" id="frm" name="frm">

                    <input type="hidden" name="idealrealIdx" />

                    <table className="idealreal_detail" style={{
                        width: '800px',
                        margin: '0 auto',
                        border: '1px solid yellow',
                        borderCollapse: 'collapse'
                    }}>
                        <colgroup>
                            <col width="15px" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                            <tr style={{ width: '100%' }}>
                                <th scope="row">글번호</th>
                                <td>{idealrealIdx}</td>
                                <th scope="row">조회수</th>
                                <td>{idealrealCnt}</td>
                                <th scope="row"><Thumb idealrealIdx={idealrealIdx}/> </th>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{userId}</td>
                                <th scope="row">작성일</th>
                                <td>{idealrealCreatedTime}</td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                            
                                <td colSpan="4">
                                    <h2>{idealrealTitle}</h2>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row"></th>
                                <td>
                                    <div style={{
                                        display: 'flex', flexDirection: 'row', alignContent: 'center',
                                        height: '300px', border: '1px solid yellow'
                                    }} >
                                        <img src={idealImg} style={{ width: 'auto' }} />
                                        <img src={realImg} style={{ width: 'auto' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="view_text" style={{
                                    width: 'calc(100% - 6px)',
                                    height: '200px', border: '1px solid purple'
                                }}>
                                    {idealrealContent}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form> */}
                <div className={styles.buttonWrap}>
                    <Button sx={{ color: "white", background: "#5E8FCA", ":hover": { background: "#2d6ebd" } }} id="edit" value="수정하기" onClick={handlerClickRetouch}>수정하기</Button>
                    <Button sx={{ color: "white", background: "#5E8FCA", ":hover": { background: "#2d6ebd" } }} style={{ marginLeft: "20px", marginRight: "20px" }} id="list" value="목록으로" onClick={hanlderClickList}>목록보기</Button>
                    <Button sx={{ color: "white", background: "#5E8FCA", ":hover": { background: "#2d6ebd" } }} id="delete" value="삭제하기" onClick={handlerClickDelete} >삭제하기</Button>
                </div>
                {/* <div>
                    <input type="button" id="list" className="btn" value="목록으로" onClick={hanlderClickList} />
                    <input type="button" id="edit" className="btn" value="수정하기" onClick={handlerClickRetouch} />
                    <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />
                </div> */}
            </div>
        </Frame>
    );
}

export default IdealrealDetail;