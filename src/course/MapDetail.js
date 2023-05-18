import './MapDetail.css';
import CourseModal from "../modal/CourseModal";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

function MapDetail(props) {

    const modal = props.modal;
    const setModal = props.setModal;
    const title = props.title;
    const userNickname = props.userNickname;
    const startDate = props.startDate;
    const endDate = props.endDate;
    const days = props.days;

    const modalStateClose = props.modalStateClose;

    const navigate = useNavigate();
    const { travelcourseIdx } = 1;

    const { course, setCourse } = useState({});
    const { travelcourseContents, setTravelcourseContents } = useState('');
    const { travelcourseTitle, setTravelcourseTitle } = useState('');

    const handlerChangeTitle = e => setTravelcourseTitle(e.target.value);
    const handlerChangeContents = e => setTravelcourseContents(e.target.value);

    let day식별자 = [];

    const 객체배열담기 = (origin) => {
        const 원본배열 = origin;
        const 담을배열 = [];
        let 임시객체 = [];

        //고유키값설정
        day식별자 = removeDuplicates(원본배열, 'day');
        console.log(day식별자);

        for (let i = 0; i < day식별자.length; i++) {
            for (let j = 0; j < 원본배열.length; j++) {
                if (day식별자[i].day == 원본배열[j].day) {
                    임시객체 = [
                        ...임시객체, {
                            day: 원본배열[j].day,
                            dayDescription: 원본배열[j].dayDescription,
                            lat: 원본배열[j].lat,
                            lng: 원본배열[j].lat,
                            orders: 원본배열[j].orders,
                            placeName: 원본배열[j].placeName
                        }
                    ]
                }
            }
            if (임시객체 != 0) {
                담을배열.push(임시객체);
            }
            임시객체 = [];//초기화
        }
        return 담을배열;
    }

    //중복제거 함수
    const removeDuplicates = (array, key) => {
        const uniqueArray = [];
        const uniqueKeys = [];

        array.forEach((item) => {
            const value = item[key];
            if (!uniqueKeys.includes(value)) {
                uniqueKeys.push(value);
                uniqueArray.push(item);
            }
        });

        return uniqueArray;
    };

    //days를 사용해서 DAY별 객체로 담음. days는 day중복있는 데이터.
    const 필터day = 객체배열담기(days)
    console.log(필터day);




    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/course/${travelcourseIdx}`)
    //         .then(response => {
    //             console.log(response);
    //             setCourse(response.data);

    //             setTravelcourseTitle(response.data.travelcoursetitle);
    //             setTravelcourseContents(response.data.travelcoursecontents);
    //         })
    //         .catch(error => console.log(error));
    // }, []);

    // const handlerClickList = () => {
    //     navigate('/course');
    // };

    // const handlerClickUpdate = () => {
    //     axios.put(`http://localhost:8080/api/course/${travelcourseIdx}`,
    //         { 'travelcoursetitle': travelcourseTitle, 'travelcoursecontents': travelcourseContents })
    //         .then(response => {
    //             console.log(response);
    //             if (response.data === 1) {
    //                 alert('수정됨.');
    //             } else {
    //                 alert('수정안됨.');
    //                 return;
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert(`수정에 실패. (${error.message})`);
    //             return;
    //         });
    // };

    // const handlerClickDelete = () => {
    //     axios.delete(`http://localhost:8080/api/course/${travelcourseIdx}`)
    //         .then(response => {
    //             console.log(response);
    //             if (response.data === 1) {
    //                 alert('삭제됨');
    //                 navigate('/course');
    //                 return;
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert('삭제실패. (${error.message})');
    //             return;
    //         });
    // };

    let 코스명배열=[];
    
    const 코스명나열하기 = () =>{
        let array=[];
        let 코스명문자='';

        for ( let i = 0 ; i < 필터day.length; i++){
            for (let j = 0 ; j < 필터day[i].length; j ++){
                코스명문자 =  코스명문자 + 필터day[i][j].placeName + " - ";

            }
            코스명문자 = 코스명문자.slice(0,-3);
            array.push(코스명문자);
            코스명문자 = '';
        }
        
        return array;
    }

    코스명배열 = 코스명나열하기();
    console.log(코스명배열);

    return (
        <CourseModal modal={modal} setModal={setModal} modalStateClose={modalStateClose}>
            <div className="container">
                <div id="mapdetail-wrap">
                    <span id="mapdetail-title">{title}</span>
                    <span id="mapdetail-edit-btn"><EditNoteOutlinedIcon /></span>
                    <span id="mapdetail-delete-btn"><DeleteForeverOutlinedIcon /></span>
                    <div className="camera-black-line"></div>
                    {/* <div className="camera-blank-line"></div>
                    <div className="camera-black-line"></div> */}
                    <div id="camera-center-back">
                        <img id="mapdetail-userpic"
                            src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg" />
                        <span id="mapdetail-userid">{userNickname}</span>
                        <div id="mapdetail-img-list">
                            <img src="https://i.pinimg.com/564x/46/c3/3e/46c33e15ecd057f3e80cf55ad3651ae8.jpg" />
                        </div>
                        <span id="mapdetail-date">{startDate}~{endDate}</span>
                    </div>
                    {/* <div className="camera-black-line"></div>
                    <div className="camera-blank-line"></div> */}
                    <div className="camera-black-line"></div>
                    <div id="mapdetail-course-list-wrap">
                        <div id="mapdetail-map">
                            <img src="https://shareditassets.s3.ap-northeast-2.amazonaws.com/production/uploads/post/featured_image/936/%EB%A7%9B%EC%A7%91.JPG" />
                        </div>
                        <div id="mapdetail-course-list">

                            {/* day식별자로 중복제외한 day내용만 사용 */}
                            {day식별자 && day식별자.map((days, index) => (
                                <div>
                                    <div>
                                        <h2>DAY{days.day}</h2>
                                        <span>{days.dayDescription}</span>
                                    </div>
                                    <br />
                                    <p>{코스명배열[index]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </CourseModal >
    );

}
export default MapDetail;