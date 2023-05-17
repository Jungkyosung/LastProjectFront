// import { useState } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./LNButton.module.css";

function LNButton(props) {

    const setData = props.setData;
    const [idealreal, setIdealreal] = useState([]);
    const [ likeCount, setLikeCount ] = useState(0);
    const { idealrealIdx } = useParams();

    // useEffect(() => {
    //     axios.get(`http://192.168.0.4/api/listidealreal`)
    //         .then((response) => {
    //             setLikeCount(response.date.likeCount)
    //             setDate(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    const handleLikeChange = (e) => {
        axios.get(`http://192.168.0.4:8080/api/listidealrealwithlike`)
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
        axios.get(`http://192.168.0.4:8080/api/listidealreal`)
            .then(response => {
                setData(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    return (

        <ul className={styles.buttonBox}>
            <li className={styles.buttonContainer} onClick={handleLikeChange}>인기순</li>
            <li className={styles.buttonContainer} onClick={handleListChange}>최신순</li>
        </ul>
        // <div style={buttonBox}>
        //     <button style={buttonContainer} onClick={handleLikeChange}>인기순</button>
        //     <button style={buttonContainer} onClick={handleListChange}>최신순</button>
        // </div>
    )
}





export default LNButton;