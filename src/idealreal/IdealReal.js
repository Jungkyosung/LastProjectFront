import { useEffect, useState } from "react";
import LNButton from "./LNButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Thumb from "./Thumb";

function Idealreal() {
    const [idealreal, setIdealreal] = useState("")
    const [data, setData] = useState([])
    const [idealrealCnt, setIdealrealCnt] = useState([])
    const [idealrealIdealImg, setIdealrealIdealImg] = useState([]);
    const [idealrealRealImg, setIdealrealRealImg] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/listidealreal`)
            .then(response => {
                setIdealrealIdealImg(response.data.idealrealIdealImg);
                setIdealrealRealImg(response.data.idealrealRealImg);
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

            flexDirection: 'row',
            border: '1px solid aqua',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            width: 1180,
            height: 'auto'
        },
        wrapper1: {

            flexDirection: 'row',
            border: '1px solid purple',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            width: '40%',
            height: 'auto'
        },
        image: {
            width: 200,
            height: 300,
            borderRadius: 10
        },
        contentContainer: {
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'column'
        },
        nameText: {
            color: 'pink',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,

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
        width: '1180px',
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
                    <div style={styles.contentContainer}>
                        {/* 작성한 사람의 이름과 내용 */}
                        <div style={styles.nameText}>이상과 현실</div>
                    </div>
                    <div >
                        {data &&
                            data.map((idealreal) => (
                                <div key={idealreal.idealrealIdx}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{idealreal.idealrealIdx}</td>
                                                <td className="idealrealTitle" style={styles.wrapper1}>
                                                    {console.log(idealreal.idealrealIdealImg)}
                                                    <Link
                                                        to={`/listidealreal/detail/${idealreal.idealrealIdx}`}
                                                    >
                                                        {idealreal.idealrealTitle}
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

                                                <td>{idealreal.idealrealCnt}</td>
                                                <td>{idealreal.idealrealCreatedTime}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Thumb />
                                </div>
                            ))}
                    </div>
                </div>
            </div>




        </>
    )
}


export default Idealreal;