import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useInfiniteScroll from "./UseInfiniteScroll";
import TriedCategory from "./TriedCategory";
import TriedList from "./TriedList";

const TriedMain = () => {
    // 카테고리 변수
    const { categoryIdx } = useParams();

    const [data, setData] = useState([]);
    const [triedCategoryIdx, setTriedCategoryIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [year, setYear] = useState('2023')
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await
                    axios.get(`http://localhost:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`);
                setData(response.data);
            } catch (error) {
                console.error(error);
                setData([]);
            }
        };
        fetchData();
    }, [triedCategoryIdx, order, year, pages]);

    return (
        <>
            <TriedCategory
                setData={setData}
                setTriedCategoryIdx={setTriedCategoryIdx}
                order={order} setOrder={setOrder}
                year={year} setYear={setYear}
            />
            <a href="/tried/write" className="btn">글쓰기</a>
            <div className="triedMain">
                <TriedList
                    data={data}
                    triedCategoryIdx={triedCategoryIdx}
                    order={order} setOrder={setOrder}
                    year={year} setYear={setYear}
                />
            </div>
        </>
    );
};

export default TriedMain;