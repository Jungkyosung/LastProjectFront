import { useState, useEffect } from "react";
import axios from "axios";
import Thumb from "./Thumb";
import { useNavigate, useParams } from "react-router-dom";


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

        axios.get(`http://localhost:8080/api/listidealreal/detail/${idealrealIdx}`
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
    const hanlderClickList = () => navigate('/listidealreal')
    const handlerClickRetouch = () => navigate(`/idealrealretouch/${idealrealIdx}`)
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/listidealreal/${idealrealIdx}`,
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response)
                alert('헤어진 다음날 전화기를 켜보니')
                navigate('/listidealreal');
            })
            .catch(erorr => {
                console.log('안되나용')
                return
            })
    };
    // 이미지를 가져오는 주소를 설정
    const idealImg = `http://localhost:8080/api/getimage/${idealrealIdealImg}`;
    const realImg = `http://localhost:8080/api/getimage/${idealrealRealImg}`;

    const container = {
        display: 'flex',
        flexDirection: 'comlum',
        width: '1180px',
        margin: '0 auto',
        position: 'relative'
    }



    return (
        <>
            <div className="container" style={{
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <h2>이상과 현실</h2>
                <form action="" method="POST" id="frm" name="frm">

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
                </form>
                <div>
                    <input type="button" id="list" className="btn" value="목록으로" onClick={hanlderClickList} />
                    <input type="button" id="edit" className="btn" value="수정하기" onClick={handlerClickRetouch} />
                    <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />
                </div>
            </div>
        </>
    );
}

export default IdealrealDetail;