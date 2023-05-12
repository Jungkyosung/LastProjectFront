import './MapList.css';
import { useEffect, useState } from "react"
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Frame from "../main/Frame";
import MapEach from "./MapEach";
import Button from '@mui/material/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MapDetail from './MapDetail';


const MapList = () => {

    let nickName = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        nickName = jwt_decode(jwtToken).nickname;
    }

    const header = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };

    //배열로 변경해야 함.
    const [modal, setModal] = useState(false);

    const modalOpen = () => {
        setModal(true);
    }

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/course', { headers: header })
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
    }, []);

    return (
        <Frame>
            <div id="travelcourse-list-img">
                <img src="https://hearthookhome.com/wp-content/uploads/2018/08/How-to-make-a-travel-map-with-pins-1024x683.jpg" />
            </div>
            <div id='travelcourse-list-wrap'>
                <div id="travelcourse-list-title">여행코스</div>
                <div id="travelcourse-list-write">
                    <Link to="/course/mapwrite">
                        <Button variant="contained">WRITE</Button>
                    </Link>
                </div>
                <div id="travelcourse-list-lists">
                    <MapEach modalOpen={modalOpen} />
                    <MapEach />
                    <MapEach />
                    <MapEach />
                    <MapEach />
                    <MapEach />
                    <MapEach />
                </div>
                {modal &&
                    <MapDetail modal={modal} setModal={setModal} />
                }
                {
                    datas.length === 0 && (
                        <div>
                            <span>일치하는 지도가 없다.</span>
                        </div>
                    )
                }
                {
                    datas && datas.map(course => (
                        <div key={course.travelcourseIdx}>
                            <span>{course.travelcourseIdx}</span>
                            <span className="title">
                                <Link to={`/course/detail/${course.travelcourseIdx}`}>{course.travelcourseTitle}</Link></span>
                            <span>{course.travelcourseCnt}</span>
                            <span>{course.travelcourseCreatedtime}</span>
                        </div>
                    ))
                }


                <Link to="/course/mapwrite" className="btn">글쓰기</Link>
            </div>
        </Frame>
    );
};

export default MapList;