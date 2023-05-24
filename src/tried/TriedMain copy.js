import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TriedCategory from "./TriedCategory";
import TriedList from "./TriedList";

const TriedMain = () => {
    const [data, setData] = useState([]);
    const [triedCategoryIdx, setTriedCategoryIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [year, setYear] = useState('2023')
    const [pages, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    // 카테고리가 변경되면 axios를 1페이지로 초기값 날림
    useEffect(() => {
        axios.get(`http://localhost:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // 페이지 수 가져오는 axios 요청
    const totalPageRequest = async () => {
        try {
            const response = await
                axios.get(`http://localhost:8080/api/tried/totalpage/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`);
            console.log(response);
            setTotalPages(response.data); //총 페이지 수? <<요청도 안했음>>
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {

            const response = await
                axios.get(`http://localhost:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/1`);
            
            let updateData = [];
            console.log(response.data)
            console.log(response.data.length)
            for ( let i = 0 ; i < response.data.length ; i++){
                updateData.push(response.data[i])
                console.log(response.data[i])
            }

            setData(updateData);
            console.log("왜 리셋 되지?",updateData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setData([]);
            setIsLoading(false);
        }
    };


    const fetchDataByPage = async () => {
        try {
            
            const response = await
                axios.get(`http://localhost:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`);
            
            let updateData = [...data];
            console.log(response.data)
            console.log(response.data.length)
            for ( let i = 0 ; i < response.data.length ; i++){
                updateData.push(response.data[i])
                // console.log(response.data[i])
            }
            setData(updateData);
            // console.log("왜 리셋 되지?",updateData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setData([]);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
        totalPageRequest();
    }, [triedCategoryIdx, order, year]);

    useEffect(() => {
        fetchDataByPage();
        totalPageRequest();
    }, [pages]);

    const handlerScroll = () => {

        //현재 스크롤 높이
        const scrolledHeight =
            window.innerHeight + document.documentElement.scrollTop;
        //현재 스크린 풀 높이
        const fullHeight = document.documentElement.offsetHeight;
        //비율
        const scrollThreshold = 0.8;

        //풀화면 높이 보다 스크롤한 높이가 더 크다면 페이지를 +1 씩 증가시켜라
        if (scrolledHeight >= fullHeight * scrollThreshold && !isLoading) {
            //페이지 1씩 증가
            console.log('현재페이지', pages);
            console.log('총페이지', totalPages);

            if (pages >= totalPages) {
                setIsAllPagesLoaded(true);
                return
            } else {
                let prevPage = pages;
                prevPage = prevPage + 1;
                setPages(prevPage);
            }
        }
    };

    window.addEventListener("scroll", handlerScroll);

    return (
        <>
            <TriedCategory
                triedCategoryIdx={triedCategoryIdx}
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
            <div id="scroll" style={{ height: "1px" }}></div>
            {isAllPagesLoaded && data.length > 0 && <div>NoMoreData</div>}
        </>
    );
};

export default TriedMain;