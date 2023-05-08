import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TriedHeader from "./TriedHeader";
import TriedCategory from "./TriedCategory";

const TriedList = () => {
    const [data, setData] = useState([]);
    const { categoryIdx } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/tried`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, [categoryIdx]);

    return (
        <>
            <TriedHeader />
            <div className="triedList-container">
                <div className="triedList-category">
                    <TriedCategory 
                    categoryIdx={categoryIdx}
                    data={data} />
                </div>
                <a href="/tried/write" className="btn">글쓰기</a>
                {data && data.map((tried) => (
                    <div key={tried.triedIdx}>
                        <div className="triedTitle">
                            <Link to={`/tried/detail/${tried.triedIdx}`}>
                                {tried.triedTitle}
                            </Link>
                            <div>글번호: {tried.triedIdx}</div>
                            <div>작성자: {tried.userId}</div>
                            <div>작성일: {tried.triedCreatedTime}</div>
                            <div>이미지: {tried.triedImg}</div>
                            <div>내용:   {tried.triedContent}</div>
                            <div>조회수: {tried.triedCnt}</div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    );
};

export default TriedList;