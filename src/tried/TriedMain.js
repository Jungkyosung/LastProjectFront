import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useInfiniteScroll from "./useInfiniteScroll";
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

    // const [selectedCategoryItems, setSelectedCategoryItems] = useState('');

    // const address = `/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`;
    // console.log(address);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios
                    .get(`http://localhost:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`);
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
            {/* TriedCategory 컴포넌트에 'categories' 상태(state)를 전달 */}
            <TriedCategory
                setTriedCategoryIdx={setTriedCategoryIdx}
                order={order} setOrder={setOrder}
                year={year} setYear={setYear}
                setData={setData}
            />
            <a href="/tried/write" className="btn">글쓰기</a>
            {/* TriedList 컴포넌트에 'selectedCategoryItems' 상태(state)를 전달 */}
            <div className="triedMain">
                <TriedList
                    data={data}
                    triedCategoryIdx={triedCategoryIdx}
                    order={order}
                    year={year}
                     />
            </div>
        </>
    );
};

export default TriedMain;

    // 무한스크롤
    // const fetchMoreData = useCallback(async () => {
    //     const nextPage = pages + 1;
    //     const url = `/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${nextPage}`;
    //     const response = await axios
    //     .get(url);
    //     setData((prevData) => [...prevData, ...response.data]);
    //     setPages(nextPage);
    // }, [triedCategoryIdx, order, year, pages]);

    // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData);