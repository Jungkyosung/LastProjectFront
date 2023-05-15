import Frame from "../main/Frame";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import styles from "./QnaList.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const QnaList = () => {

    const [datas, setDatas] = useState([]);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const navigate = useNavigate();

    const lengthDifference = 10 - datas.length;

    // useEffect(() => {

    //     //1페이지 리스트 조회
    //     axios.get(`http://localhost:8080/api/qnalistbypage/${pages}`)
    //         .then(response => {
    //             console.log(response.data)
    //             setDatas(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })

    //     //1페이지 검색 리스트 조회
    //     // axios.get(`http://localhost:8080/api/qnalistbypage/${pages}/${search}`)
    //     //     .then(response => {
    //     //         console.log(response.data)
    //     //         setDatas(response.data);
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //     })

    //     //페이지수 조회
    //     axios.get(`http://localhost:8080/api/qnapagecount`)
    //         .then(response => {
    //             console.log(response.data)
    //             // let pageCount = response.data;
    //             // if( pageCount > 1){
    //             //     pageCount = 10;
    //             // }
    //             // setPageCount(pageCount);
    //             setPageCount(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, [])

    useEffect(() => {

        const params = {
            pages: pages,
            search: search
        }

        axios.get(`http://localhost:8080/api/qnalistbypage`, { params })
            .then(response => {
                console.log(response.data)
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        axios.get(`http://localhost:8080/api/qnapagecount`,{ params })
            .then(response => {
                console.log(response.data)
                // let pageCount = response.data;
                // if( pageCount > 1){
                //     pageCount = 10;
                // }
                // setPageCount(pageCount);
                setPageCount(response.data);
            })
            .catch(error => {
                console.log(error);
            })

    }, [pages])

    const handlerChange = (event, value) => {
        console.log(event, value);
        setPages(value);
    }

    const handlerChangeSearch = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setSearch(e.target.value);
    }

    const handlerSubmitSearch = async () => {
        console.log("클릭");
        const params = {
            pages: pages,
            search: search
        }
        try {
            const response = await axios.get( `http://localhost:8080/api/qnalistbypage`, { params });
            console.log(response.data);
            setDatas(response.data);
            // navigate( `${ pages}/${search}`);
            navigate( `/qnalist`);
        } catch (e) {
            console.log(e);
        }

        try {
            const response = await axios.get( `http://localhost:8080/api/qnapagecount`, { params });
            console.log(response.data);
            setPageCount(response.data);
            // navigate( `${ pages}/${search}`);
            navigate( `/qnalist`);
        } catch (e) {
            console.log(e);
        }
    }

        const handlerWrite = () => {
            navigate(`/qna/write`);
        }
        const handlerDetail = (qnaIdx) => {
            navigate(`/qna/${qnaIdx}`);
        }

        const addEmptyRows = () => {
            const result = [];
            for (let i = 0; i < lengthDifference; i++) {
                result.push(<tr style={{ borderTop: "1px solid rgba(94, 143, 202, 0.2)", height: "60px" }}><td colSpan="4"></td></tr>);
            }
            return result;
        }


        return (
            <Frame>
                <div className={styles.contentsWrap}>
                    <h2 className={styles.title}>QNA</h2>
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <Input placeholder="검색어를 입력해주세요." variant="outlined" color="primary" onChange={handlerChangeSearch} value={search} />
                            <Button style={{ marginLeft: "20px" }} onClick={handlerSubmitSearch}>검색</Button>
                        </div>
                        <div className={styles.table}>
                            <table>
                                <colgroup>
                                    <col width="15%" />
                                    <col width="*" />
                                    <col width="15%" />
                                    <col width="15%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">글번호</th>
                                        <th scope="col">제목</th>
                                        <th scope="col">작성일</th>
                                        <th scope="col">작성자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        datas.length === 0 && (
                                            <tr className={styles.noData}>
                                                <td colSpan="4">일치하는 데이터가 없습니다.</td>
                                            </tr>
                                        )
                                    }
                                    {
                                        datas && datas.sort((a, b) => (b.qnaIdx - a.qnaIdx))
                                            .map((n) => (
                                                <tr key={n.qnaIdx} className={styles.qnaData} onClick={() => handlerDetail(n.qnaIdx)} >
                                                    <td >{n.qnaIdx}</td>
                                                    <td >
                                                        <Link to={`/qna/${n.qnaIdx}`} style={{ color: "black" }}>{n.qnaTitle}</Link>
                                                    </td>
                                                    <td style={{ color: "black" }}>{n.qnaCreatedTime}</td>
                                                    <td style={{ color: "black" }}>{n.userId}</td>
                                                </tr>
                                            ))
                                    }
                                    {addEmptyRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination count={pageCount} color="primary" page={pages} onChange={handlerChange} />
                    <div className={styles.write}>
                        <Button onClick={handlerWrite}>글쓰기</Button>
                    </div>
                </div>
            </Frame>
        )
    }

    export default QnaList;