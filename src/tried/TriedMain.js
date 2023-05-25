import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TriedCategory from "./TriedCategory";
import TriedList from "./TriedList";
import Frame from "../main/Frame";
import './TriedMain.css';
import { PagesSharp, PropaneSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const TriedMain = () => {

    const navigate = useNavigate();

    let jwtToken = null;
    if (sessionStorage.getItem("token") != null) {
        jwtToken = sessionStorage.getItem("token");
    }

    const header = {
        Authorization: `Bearer ${jwtToken}`
    };

    let totalPage = 0;

    const [data, setData] = useState([]);
    const [triedCategoryIdx, setTriedCategoryIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [year, setYear] = useState('2023')
    const [pages, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isAllPagesLoaded, setIsAllPagesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            console.log('총페이지', totalPage);

            if (pages >= totalPage) {
                setIsAllPagesLoaded(true);
                return
            } else {
                
                setPages(pages + 1);
                console.log('바뀐 페이지수',pages+1)
            }
        }
    };

    // 카테고리가 변경되면 axios를 1페이지로 초기값 날림
    useEffect(() => {

        axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`,
            { headers: header })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/totalpage/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`,
            { headers: header })
            .then((response) => {
                console.log(response.data);
                setTotalPages(response.data);
                totalPage = response.data;
            })
            .catch((error) => {
                console.error(error);
            })


        window.addEventListener("scroll", handlerScroll)

        return () => {
            window.removeEventListener("scroll", handlerScroll)
        };
    }, []);


    // 페이지 수 가져오는 axios 요청
    const totalPageRequest = async () => {
        try {
            const response = await
                axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/totalpage/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`, { headers: header });
            //console.log(response);
            //totalPages = response.data;
            setTotalPages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    //카테고리 변경되면 1페이지로 조회
    const fetchData = async () => {
        try {
            const response = await
                axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/1`, { headers: header });
            let updateData = [];
            for (let i = 0; i < response.data.length; i++) {
                updateData.push(response.data[i])
                //console.log(response.data[i])
            }
            setData(updateData);
            //setIsLoading(false);
        } catch (error) {
            console.error(error);
            setData([]);
            //setIsLoading(false);
        }
    };


    //페이지 변경되면 해당 카테고리의 페이지대로 조회
    const fetchDataByPage = async () => {
        try {
            const response = await
                axios.get(`http://${process.env.REACT_APP_CMJ_IP}:8080/api/tried/${triedCategoryIdx}/${order}/${year}-01-01/${year}-12-31/${pages}`, { headers: header });
            let updateData = [...data];
            for (let i = 0; i < response.data.length; i++) {
                updateData.push(response.data[i])
            }
            setData(updateData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setData([]);
            setIsLoading(false);
        }
    };


    //카테고리 변경시 데이터 조회
    useEffect(() => {

        if (triedCategoryIdx == triedCategoryIdx)

            fetchData();
        totalPageRequest();
        console.log("궁금 첫 렌더링에 작업이 되나?")
    }, [triedCategoryIdx, order, year]);


    //페이지 변경시 데이터 조회
    useEffect(() => {
        fetchDataByPage();
        totalPageRequest();
        console.log("넌 왜 렌더링 되지 않니?? 페이지가 증가했잖니??")
    }, [pages]);


const handlerWrite = () =>{
    navigate(`/tried/write`);
}

    return (
        <Frame>

            <div id="travelcourse-list-img">
                <img src="https://i.pinimg.com/564x/67/1b/ba/671bba36fccbc46d70f7e2631b781c61.jpg" />
            </div>
            <div id="tried-wrap">
                <TriedCategory
                    triedCategoryIdx={triedCategoryIdx}
                    setTriedCategoryIdx={setTriedCategoryIdx}
                    order={order} setOrder={setOrder}
                    year={year} setYear={setYear}
                />
                <Button type='button' variant="contained" onClick={handlerWrite}>글쓰기</Button>
                <div className="triedMain">
                    <TriedList
                        data={data}
                        triedCategoryIdx={triedCategoryIdx}
                        order={order} setOrder={setOrder}
                        year={year} setYear={setYear}
                    />
                </div>
                <div id="scroll" style={{ height: "1px" }}></div>
                {isAllPagesLoaded && data.length > 0 && <div>재미있으셨나요? 글이 바닥났어요 ㅠㅠ 글을 써보시는건 어떠신가요?</div>}
            </div>
        </Frame>
    );
};

export default TriedMain;