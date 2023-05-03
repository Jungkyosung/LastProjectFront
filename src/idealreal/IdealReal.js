import { useEffect, useState } from "react";
import LNButton from "./LNButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Thumb from "./Thumb";

function Idealreal() {
    const [idealreal, setIdealreal] = useState("")
    const [data, setData] = useState([])
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
            border: '1px solid gray',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            width: 'auto',
            height: 'auto'
        },
        image: {
            width: 300,
            height: 400,
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
            marginLeft: '800px',
            width: '100px',
            height: '30px',
            fontSize: '16px',
            border: '1px solid gray',
            borderRadius: '10px',
            marginTop: '50px',
            textAlign: 'center',
            lineHeight: '30px',
            color: 'blue'
        }
    };

    const container = {
        display: 'flex',
        flexDirection: 'comlum',
        width: '1180px',
        margin: '0 auto',
        position: 'relative'
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
                    <div style={styles.wrapper}>
                        {data && data.map((idealreal => (
                            <tr key={idealreal.idealrealIdx}>
                                <td>{idealreal.idealrealIdx}</td>
                                <td className="idealrealTitle">
                                    {console.log(idealreal.idealrealIdealImg)}
                                    <Link to={`/listidealreal/detail/${idealreal.idealrealIdx}`}>{idealreal.idealrealTitle}</Link></td>
                                <img style={styles.image} src={`http://localhost:8080/api/getimage/${idealreal.idealrealIdealImg}`} />
                                <img style={styles.image} src={`http://localhost:8080/api/getimage/${idealreal.idealrealRealImg}`} />
                                <td>{idealreal.updatecnt}</td>
                                <td>{idealreal.idealrealCreatedTime}</td>

                            </tr>
                        )))}
                    </div>

                    <Thumb />

                </div>
            </div>




        </>
    )
}


export default Idealreal;