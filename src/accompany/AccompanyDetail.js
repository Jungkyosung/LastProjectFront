import Frame from "../main/Frame";
import Button from '@mui/material/Button';
import './AccompanyDetail.css';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MessageIcon from '@mui/icons-material/Message';
import { Link, useNavigate } from "react-router-dom";

const 임시내용 = "4월 26일(수)~28(금) 2박3일간 부산(해운대)여행에 함께 하실 30~40대 여성분을 찾습니다.\
제가 40대 남자여서 부산여행을 같이 하실 분도 40대 여성이면 더 편할것 같은데, 나이는 크게 중요하지 않습니다.^^ (50대도 신청 가능)\
일단 KTX 왕복으로 2매씩 예매는 해놓았고(모집 성공시 동행인에게 KTX 티켓 좌석 전달), 같이 동행하실 분이 원하신다면 제 차로 운전하면서 드라이브겸 여행도 가능합니다.\
제 출발지는 충청권인데, 동행하실 분이 경기도내 남부권이면 제가 차로 픽업도 가능할것 같습니다.\
동행하실 분이 충청권 보다도 남부지역일 경우에도 원하시면 제 차로 픽업후 부산여행을 함께 하셔도 되겠네요.\
2주안에 모집에 성공 못하더라도 저 혼자 부산(해운대)여행을 꼭 갈건데, 이왕이면 동행인과 함께 맛집과 핫플레이스도 다녀오고 싶네요.\
관심있으신 분의 참여를 부탁드립니다.메세지 주세요.^^ ";

const AccompanyDetail = () => {

    const [userId, setUserId] = useState("");
    let jwtToken = null;
    const writer = "jksin1992@gmail.com";

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            jwtToken = sessionStorage.getItem('token');
            setUserId(jwt_decode(jwtToken).sub);
        }
    }, []);

    const handlerToList = () => {
        navigate(`/accompany`);
    };


    return (
        <Frame>
            <div id="accompany-main-detail-img">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/1280px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg" />
            </div>
            <div id="accompany-detail-wrap">
                <div id="accompany-detail-img">
                    <img src="https://cdn.traveltimes.co.kr/news/photo/202212/403574_25364_1916.jpg" />
                </div>
                <div id="accompany-detail-duration">
                    여행기간 : 2023.04.15 ~ 2023.05.16
                </div>
                <div id="accompany-detail-title">
                    테스트 동행 디테일 제목 입니다 이곳은 동행 디테일 제목 위치 입니다.
                </div>
                <div id="accompany-detail-date-cnt">
                    <span>
                        작성시간: 2023.04.26 14:14
                    </span>
                    <span>
                        조회수: 15
                    </span>
                </div>
                <div id="accompany-detail-content">
                    내용
                    {임시내용}
                </div>
                <div id="accomapny-detail-btn">
                    <Button variant="contained" onClick={handlerToList}><ListIcon /><span>LIST</span></Button>
                    {!(writer == userId) ?
                        <Button variant="contained"><MessageIcon /><span>채팅연결</span></Button>
                        :
                        <>
                            <Button variant="contained"><EditIcon /><span>수정하기</span></Button>
                            <Button variant="contained"><DeleteForeverIcon /><span>삭제하기</span></Button>
                        </>
                    }
                </div>
            </div>
        </Frame>
    )
}
export default AccompanyDetail;