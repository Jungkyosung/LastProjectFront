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

    const navigate = useNavigate();
    const { travelcourseIdx } = 1;

    const { course, setCourse } = useState({});
    const { travelcourseContents, setTravelcourseContents } = useState('');
    const { travelcourseTitle, setTravelcourseTitle } = useState('');

    const handlerChangeTitle = e => setTravelcourseTitle(e.target.value);
    const handlerChangeContents = e => setTravelcourseContents(e.target.value);


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

    return (
        <CourseModal modal={modal} setModal={setModal}>
            <div className="container">
                <div id="mapdetail-wrap">
                    <span id="mapdetail-title">여행코스 제목이닷</span>
                    <span id="mapdetail-edit-btn"><EditNoteOutlinedIcon /></span>
                    <span id="mapdetail-delete-btn"><DeleteForeverOutlinedIcon /></span>
                    <div className="camera-black-line"></div>
                    {/* <div className="camera-blank-line"></div>
                    <div className="camera-black-line"></div> */}
                    <div id="camera-center-back">
                        <img id="mapdetail-userpic"
                            src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg" />
                        <span id="mapdetail-userid">작성자닉네임</span>
                        <div id="mapdetail-img-list">
                            <img src="https://i.pinimg.com/564x/46/c3/3e/46c33e15ecd057f3e80cf55ad3651ae8.jpg" />
                        </div>
                        <span id="mapdetail-date">2023.05.26~2023.05.30</span>
                    </div>
                    {/* <div className="camera-black-line"></div>
                    <div className="camera-blank-line"></div> */}
                    <div className="camera-black-line"></div>
                    <div id="mapdetail-course-list-wrap">
                        <div id="mapdetail-map">
                            <img src="https://shareditassets.s3.ap-northeast-2.amazonaws.com/production/uploads/post/featured_image/936/%EB%A7%9B%EC%A7%91.JPG" />
                        </div>
                        <div id="mapdetail-course-list">
                            <div>
                                <div>
                                    <h2>DAY1</h2>
                                    <span>코스소개 줄줄이 코스 줄줄이 여기 가야하는 이유가 뭐야</span>
                                </div>
                                <br />
                                <p>청계천-광화문-종각-인사동-종로3가-동대문</p>
                            </div>
                            <div>
                                <div>
                                    <h2>DAY2</h2>
                                    <span>코스소개 줄줄이 코스 줄줄이 여기 가야하는 이유가 뭐야</span>
                                </div>
                                <br />
                                <p>청계천-광화문-종각-인사동-종로3가-동대문</p>
                            </div>
                            <div>
                                <div>
                                    <h2>DAY3</h2>
                                    <span>코스소개 줄줄이 코스 줄줄이 여기 가야하는 이유가 뭐야</span>
                                </div>
                                <br />
                                <p>청계천-광화문-종각-인사동-종로3가-동대문</p>
                            </div>
                            <div>
                                <div>
                                    <h2>DAY4</h2>
                                    <span>코스소개 줄줄이 코스 줄줄이 여기 가야하는 이유가 뭐야</span>
                                </div>
                                <br />
                                <p>청계천-광화문-종각-인사동-종로3가-동대문</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </CourseModal >
    );

}
export default MapDetail;