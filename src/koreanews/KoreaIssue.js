import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Frame from "../main/Frame";
import CircularProgress from '@mui/material/CircularProgress';
import './KoreaIssue.css';

// const URL = "/api/B551024/openArirangNewsApi/news";

const KoreaIssue = () => {


    // const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);

    const [loading, setLoading] = useState(true);
    // API 데이터 가지고 오기

    const loadItem = async (pageNo, numOfRows) => {
        try {

            await axios({
                method: 'get',
                url: `https://apis.data.go.kr/B551024/openArirangNewsApi/news?serviceKey=vm3aI2bB7NLgoK5kFerct8%2BZhgJnvvSJ%2FIR96WPVJpIvoOq3EI4%2FaxDBwPU6AVECGP2w3oYbhB9nwHiNwjM2nw%3D%3D&pageNo=${pageNo}&numOfRows=${numOfRows}`
            })
                .then(response => {
                    //응답데이터에서 index번호 추가
                    const issueItems = response.data.items;
                    let arrIssueItem = [];
                    for (let i = 0; i < issueItems.length; i++) {
                        arrIssueItem[i] = { ...issueItems[i], index: i }
                    }
                    console.log(arrIssueItem);
                    setResponseData(arrIssueItem);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }
    };

    // 컴포넌트 마운트 시 API 데이터 가지고 오기
    useEffect(() => {
        loadItem(1, 9);
    }, []);


    return (
        <Frame>
            <div id="contents-wrap">
                <h2 id="issue-title">한국 이슈</h2>
                {loading ? <CircularProgress color="secondary" /> : null}
                <ul id="issue-lists"> {
                    responseData.map((apiData, index) => (
                        <li className="issue-list" key={index}>
                            <Link to=
                                {`/koreaissue/${apiData.index}`}
                                state={
                                    {
                                        title: apiData.title,
                                        content: apiData.content,
                                        index: apiData.index,
                                        thum_url: apiData.thum_url,
                                        broadcast_date: apiData.broadcast_date
                                    }
                                }
                            >   <div className="issue-img">
                                    <img src={apiData.thum_url} />
                                </div>
                                <br />
                                <strong>{apiData.title}</strong>
                                <br />
                                <span className="issue-date">{apiData.broadcast_date.substr(0,10)}</span>
                            </Link></li>

                    ))
                }
                </ul>
            </div>
        </Frame>
    );
}

export default KoreaIssue;