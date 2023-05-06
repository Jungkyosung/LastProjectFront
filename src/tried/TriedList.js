import axios from "axios";
import { useEffect, useState } from "react";
import TriedHeader from "./TriedHeader";


const TriedList = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/tried`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <TriedHeader />
            <div className="triedList-container">
                <a href="/tried/write" className="btn">글쓰기</a>
                <div>
                    {data && data.map((tried) => (
                        <div key={tried.triedIdx}>
                            <div>글번호: {tried.triedIdx}</div>
                            <div>작성자: {tried.userId}</div>
                            <div>작성일: {tried.triedCreatedTime}</div>
                            <div>제목:   {tried.triedTitle}</div>
                            <div>이미지: {tried.triedImg}</div>
                            <div>내용:   {tried.triedContent}</div>
                            <div>조회수: {tried.triedCnt}</div>
                            <div>추천수: {tried.triedRcmd}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TriedList;