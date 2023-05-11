import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Frame from "../main/Frame";


function IdealrealRetouch( ) {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [idealrealTitle, setIdealrealTitle] = useState('');
    const [idealrealContent, setIdealrealContent] = useState('');
    const [userId, setUserId] = useState('');
    const [idealrealCreatedTime, setIdealrealCreatedTime] = useState('');
    const [idealrealCnt, setIdealrealCnt] = useState('');
    const [idealrealIdealImg, setIdealrealIdealImg] = useState('');
    const [idealrealRealImg, setIdealrealRealImg] = useState('');

    const { idealrealIdx } = useParams();


    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_KTG_IP}:8080/api/listidealreal/detail/${idealrealIdx}`,
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            )
            .then(response => {
                setIdealrealTitle(response.data.idealrealTitle);
                setIdealrealContent(response.data.idealrealContent);
                setUserId(response.data.userId);
                setIdealrealCreatedTime(response.data.idealrealCreatedTime);
                setIdealrealCnt(response.data.idealrealCnt);
                setIdealrealIdealImg(response.data.idealrealIdealImg);
                setIdealrealRealImg(response.data.idealrealRealImg);


                if (response.data.idealrealDto.userId != response.data.selectIdealRealList.userId && response.data.idealrealDto.userId != "test") {
                    alert('잘못된 접근 입니다.');

                    navigate('/listidealreal');
                    return;
                }
                // const token = sessionStorage.getItem('token')
                // const decode = jwtDecode(token);

                // if (decode.sub != response.data.movieTitle.writerId || decode.sub != "test") {
                //   alert('잘못된 접근 입니다.');
                //   history.push('/')
                // }
            })
            .catch(error => console.log(error));
    }, []);


    const handlerClickUpdate = () => {
        axios.put(`http://${process.env.REACT_APP_KTG_IP}:8080/api/listidealreal/${idealrealIdx}`,  // 요청 URL
            { "idealrealTitle": idealrealTitle, "idealrealContent": idealrealContent },
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )           // 요청 본문을 통해서 서버로 전달할 값
            .then(response => {                                         // 200번대 응답코드가 반환되는 경우
                console.log(response);
                alert("오 수정")
                navigate('/listidealreal');
            })
            .catch(error => {                                           // 200번대를 제외한 응답코드가 반환되는 경우
                console.log(error);
                alert(`정수 오 (${error.response.data.message})`);
                return;
            });
    };
    const handlerChange = (e) => {
        setIdealrealTitle(e.target.value)
    }
    const handlercontents = (e) => {
        setIdealrealContent(e.target.value)
    }
    const sytles = {
        // display: 'felx',
        // flexDirection: 'row',
        // border: '1px solid aqua',
        // borderRadius: 16,
        // padding: 8,
        // margin: 8,
        // width: 1200,
        // height: 'auto',
        // textAlign: 'center'

        display: 'flex',
        flexDirection: 'comlum',
        width: '1200px',
        margin: '0 auto',
        position: 'relative',
        marginLeft: '5',
        border: '1px solid aqua',

        

    }


    return (
        <Frame>
            <div style={sytles}>
                {/* <h2>리뷰 상세</h2> */}
                <form action="" method="POST" id="frm" name="frm">

                    <table >
                        <colgroup>
                            <col width="15%" />
                            <col width="" />
                            <col width="15%" />
                            <col width="" />
                            <col width="15%" />
                            <col width="" />
                        </colgroup>
                        <tbody>
                            <tr >
                                <th colSpan="6">{idealrealTitle}</th>
                                
                            </tr>
                            <tr>
                                <td colSpan="6">
                                    <input type="text" value={idealrealTitle} onChange={handlerChange}></input>
                                </td>
                            </tr>

                            <tr>

                            </tr>
                            <tr>
                                <th >조회수</th>
                                <td>{idealrealCnt}</td>
                                <th >작성일</th>
                                <td>{idealrealCreatedTime}</td>
                                <th >작성자</th>
                                <td>{userId}</td>
                            </tr>

                            <tr>
                                <td colSpan="6">
                                    <textarea style={{ width: "1000px", height: "500px" }} onChange={handlercontents} value={idealrealContent}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <input type="button" id="edit" value="확인" onClick={handlerClickUpdate} />
                    </div>
                </form>


            </div>
        </Frame>
    )
}

export default IdealrealRetouch;