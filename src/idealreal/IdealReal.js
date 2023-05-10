import { useEffect, useState } from "react";
import LNButton from "./LNButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Thumb from "./Thumb";

function Idealreal() {
    const [idealreal, setIdealreal] = useState("")
    const [data, setData] = useState([])
    const [userId, setUserId] = useState('')
    const [rcmdIdx, setRcmdIdx] = useState('')
    const [idealrealIdealImg, setIdealrealIdealImg] = useState([]);
    const [idealrealRealImg, setIdealrealRealImg] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/listidealreal`)
            .then(response => {
                setIdealrealIdealImg(response.data.idealrealIdealImg);
                setIdealrealRealImg(response.data.idealrealRealImg);
                setUserId(response.data.userId)
                setRcmdIdx(response.data.rcmdIdx)
                console.log(response.data)
                setData(response.data)
                // setIdealreal(response.date.idealrealDto)
            })
            .catch(error => console.log(error))
    }, [])

    const idealImg = `http://localhost:8080/api/getimage/${idealrealIdealImg}`;
    const realImg = `http://localhost:8080/api/getimage/${idealrealRealImg}`;

    const styles = {
        wrapper: {
            display: "flex",
            flexDirection: "column",
            justifyContent : "center",
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
            width: "600px"
        },
        image: {
            width: 'auto',
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
        box1 : {
            width: '100%',
            overflow: 'hidden',
            
        },
        box2 : {
            // border: '1px solid pink',
            width: '50%',
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





    return (

        <>
            <div style={container} >
                <LNButton />
                <Link to="/listidealreal/write" style={a.buttonContainer} >글쓰기</Link>
            </div>
            <div style={container}>
                <div style={styles.wrapper}>
                    {/* <div style={styles.contentContainer}> */}
                        {/* 작성한 사람의 이름과 내용 */}
                        <div style={styles.nameText}>이상과 현실</div>
                    {/* </div> */}
                    <div style={styles.box1}>
                        {data &&
                            data.map((idealreal, rcmd) => (
                                <div key={idealreal.idealrealIdx} style={styles.box2}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="idealrealTitle" >
                                                    <td style={styles.wrapper1}>{idealreal.idealrealIdx}
                                                    {console.log(idealreal.idealrealIdealImg)}
                                                    <Link
                                                        to={`/listidealreal/detail/${idealreal.idealrealIdx}`}
                                                    >
                                                        {idealreal.idealrealTitle}{userId}
                                                <td>{rcmd.rcmdIdx}</td>
                                                <div><td></td></div>
                                                        <img
                                                            style={styles.image}
                                                            src={`http://localhost:8080/api/getimage/${idealreal.idealrealIdealImg}`}
                                                        />
                                                        <img
                                                            style={styles.image}
                                                            src={`http://localhost:8080/api/getimage/${idealreal.idealrealRealImg}`}
                                                        />
                                                    </Link>
                                                </td>
                                                </td>
                                                {/* <Thumb /> */}

                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
                            ))}
                    </div>
                </div>
            </div>




        </>
    )
}


export default Idealreal;