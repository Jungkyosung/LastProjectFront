
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function MapDetail( ) {
    
    const navigate = useNavigate();
    const {travelcourseIdx} = useParams();

    const {course, setCourse} = useState({});
    const { travelcourseContents, setTravelcourseContents} = useState('');
    const { travelcourseTitle, setTravelcourseTitle } = useState('');
    
    const handlerChangeTitle = e => setTravelcourseTitle(e.target.value);
    const handlerChangeContents = e => setTravelcourseContents(e.target.value);


    useEffect(()=> {
        axios.get(`http://localhost:8080/api/course/${travelcourseIdx}`)
        .then(response => {
            console.log(response);
            setCourse(response.data);

            setTravelcourseTitle(response.data.travelcoursetitle);
            setTravelcourseContents(response.data.travelcoursecontents);
        })
        .catch(error=> console.log(error));
    },[]);

    const handlerClickList = () => {  
        navigate('/course');
    };

    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/course/${travelcourseIdx}`,
        { 'travelcoursetitle': travelcourseTitle, 'travelcoursecontents': travelcourseContents })
        .then(response => {
            console.log(response);
            if (response.data === 1) {
                alert('수정됨.');
            } else {
                alert('수정안됨.');
                return;
            }
        })
        .catch(error => { 
            console.log(error);
        alert(`수정에 실패. (${error.message})`);
        return;
    });
    };

    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/course/${travelcourseIdx}`)
        .then(response => {
            console.log(response);
            if (response.data === 1) {
                alert('삭제됨');
                navigate('/course');
                return;
            }
        })
        .catch(error => {
            console.log(error);
            alert('삭제실패. (${error.message})');
            return;
        });
    };

    return(
        <>
        <div className="container">
        <h1>여행코스 목록</h1>
        <form acion='' method="POST" id="frm" name="frm">
            <input type='hidden' name='travelcourseIdx'/>
            <table className="map_detail">
            <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                        <tr>
                                <th scope="row">글번호</th>
                                <td>{course.travelcourseIdx}</td>
                                <th scope="row">조회수</th>
                                <td>{course.travelcourseCnt}</td>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{course.userId}</td>
                                <th scope="row">작성일</th>
                                <td>{course.travelcourseCreatedtime}</td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <input type="text" id="title" name="title" value={travelcourseTitle} 
                                    onChange={handlerChangeTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="view_text">
                                    <textarea title="내용" id="contents" name="contents" value={travelcourseContents}
                                onChange={handlerChangeContents}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <input type="button" id="list"   className="btn" value="목록으로" onClick={handlerClickList} />
                <input type="button" id="edit"   className="btn" value="수정하기" onClick={handlerClickDelete}/>
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickUpdate}/>
         </div>
        
        </>
    );

}
export default MapDetail;