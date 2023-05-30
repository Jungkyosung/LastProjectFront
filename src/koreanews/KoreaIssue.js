import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Frame from "../main/Frame";
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./KoreaIssue.module.css";


// const URL = "/api/B551024/openArirangNewsApi/news";

const KoreaIssue = () => {


    // const [loading, setLoading] = useState(false);
    const [koreaIssueData, setKoreaIssueData] = useState([]);
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
                    setKoreaIssueData(arrIssueItem);
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
        loadItem(2, 9);
    }, []);


    return (
        <Frame>
            <div className={styles.contentsWrap}>
                <h2 className={styles.title}>한국 이슈</h2>
                {loading ? <CircularProgress color="secondary" /> : null}
                <ul className={styles.issueLists}> {
                    koreaIssueData.map((apiData, index) => (
                        <li key={index}>
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
                            >
                                <div className="issueImg">
                                <img src={apiData.thum_url} />
                                </div><strong>{apiData.title}</strong><span className="issueDate">{apiData.broadcast_date}</span></Link></li>

                    ))
                }
                </ul>
            </div>
        </Frame>
    );
}

export default KoreaIssue;