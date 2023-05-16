import { useEffect, useState } from "react";
import LNButton from "./LNButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Thumb from "./Thumb";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Frame from "../main/Frame";


function Idealreal() {
    const [idealreal, setIdealreal] = useState("")
    const [data, setData] = useState([])
    const [userId, setUserId] = useState('')
    const [rcmdIdx, setRcmdIdx] = useState('')
    const [idealrealIdealImg, setIdealrealIdealImg] = useState([]);
    const [idealrealRealImg, setIdealrealRealImg] = useState([]);
    const { idealrealIdx } = useParams();
    const [likeCount, setLikeCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const lengthDifference = 10 - data.length;

    useEffect(() => {
        //1페이지 리스트 조회
        axios.get(`http://localhost:8080/api/listidealreal/${page}`)
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        //페이지수 조회
        axios.get(`http://localhost:8080/api/listidealrealpagecount`)
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
    }, [])



    useEffect(() => {
        //1페이지 리스트 조회
        axios.get(`http://localhost:8080/api/listidealreal/${page}`)
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        //페이지수 조회
        axios.get(`http://localhost:8080/api/listidealrealpagecount`)
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
    }, [page])


    // 원본이 없어도 사진 보이고 싶었는데 잘 안됩니다
    const idealImg = `http://localhost:8080/api/getimage/${idealrealIdealImg}`;
    const realImg = `http://localhost:8080/api/getimage/${idealrealRealImg}`;

    const styles = {
        wrapper: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: '1px solid aqua',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            width: 1200,
            height: 'auto',
        },
        wrapper1: {
            border: '1px solid purple',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            width: "550px",
            height: 300
        },
        image: {
            width: '50%',
            height: 300,
            borderRadius: 10
        },

        nameText: {

            color: 'pink',
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 5,
            textAlign: 'center'

        },
        box1: {
            width: '100%',
            overflow: 'hidden',

        },
        box2: {
            // border: '1px solid pink',
            width: 'auto',
            float: 'left',
            textAlign: 'center',
        }
    };

    const a = {
        buttonContainer: {
            marginLeft: '900px',
            width: '100px',
            height: '30px',
            background: '#8f86bb',
            color: 'snow',
            fontSize: '17px',
            borderRadius: '10px',
            marginTop: '50px',
            textAlign: 'center',
            lineHeight: '30px'
        }
    };

    const container = {
        display: 'flex',
        flexDirection: 'comlum',
        width: '1200px',
        margin: '0 auto',
        position: 'relative',
        marginLeft: '5',

    }

    // 페이징
    const handlerChange = (event, value) => {
        console.log(event, value);
        setPage(value);
    }

    const addEmptyRows = () =>{
        const result = [];
        if( !lengthDifference == 8 ){
        
            for (let i = 0 ; i < lengthDifference ; i ++ ){
                result.push(<tr style={{borderTop:"1px solid rgba(94, 143, 202, 0.2)", height:"60px"}}><td colSpan="4"></td></tr>);
            }    
        }

        return result;
    }




    return (
        <Frame>

        <>
            <div style={container} >
                <LNButton setData={setData}/>
                <Link to="/listidealreal/write" style={a.buttonContainer} >글쓰기</Link>
            </div>
            <div style={container}>
                <div style={styles.wrapper}>
                    {/* <div style={styles.contentContainer}> */}
                    {/* 작성한 사람의 이름과 내용 */}
                    <div style={styles.nameText}>이상과 현실</div>
                    {/* </div> */}
                    <br/>
                    <br/>
                    <br/>
                    <div style={styles.box1}>
                        {data &&
                            data.map((idealreal, rcmd) => (
                                <div key={idealreal.idealrealIdx} style={styles.box2}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <Link
                                                    to={`/listidealreal/detail/${idealreal.idealrealIdx}`}
                                                >
                                                    <td className="idealrealTitle" >
                                                        <td style={styles.wrapper1}>{idealreal.idealrealIdx}
                                                            {console.log(idealreal.idealrealIdealImg)}
                                                            {idealreal.idealrealTitle}
                                                            {idealreal.likeCount}
                                                            <div><br/></div>
                                                            <img
                                                                style={styles.image}
                                                                src={`http://localhost:8080/api/getimage/${idealreal.idealrealIdealImg}`}
                                                            />
                                                            <img
                                                                style={styles.image}
                                                                src={`http://localhost:8080/api/getimage/${idealreal.idealrealRealImg}`}
                                                            />
                                                        </td>
                                                    </td>
                                                </Link>
                                                {/* <Thumb /> */}

                                            </tr>
                                            { addEmptyRows() }
                                        </tbody>
                                    </table>

                                </div>
                            ))}
                    </div>
                            <Pagination count={pageCount} color="primary" page={page} onChange={handlerChange} />
                </div>
            </div>
        </>
            </Frame>
    )
}


export default Idealreal;