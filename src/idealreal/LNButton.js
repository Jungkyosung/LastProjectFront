// import { useState } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function LNButton(props) {

    const setData = props.setData;
    const [idealreal, setIdealreal] = useState([]);
    const [ likeCount, setLikeCount ] = useState(0);
    const { idealrealIdx } = useParams();

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/listidealreal`)
    //         .then((response) => {
    //             setLikeCount(response.date.likeCount)
    //             setDate(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    const handleLikeChange = (e) => {
        axios.get(`http://localhost:8080/api/listidealrealwithlike`)
            .then(response => {
                setData(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }

    const handleListChange = (e) => {
        axios.get(`http://localhost:8080/api/listidealreal`)
            .then(response => {
                setData(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }

    const buttonContainer = {
        marginLeft: 'auto',
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



    return (

        <>
            <button style={buttonContainer} onClick={handleLikeChange}>인기</button>
            <button style={buttonContainer} onClick={handleListChange}>최신</button>
        </>
    )
}





export default LNButton;