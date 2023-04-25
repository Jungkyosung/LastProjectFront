import Scroll from "../Scroll";
import { useEffect, useState } from "react";
import LNButton from "./LNButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Thumb from "./Thumb";

function Idealreal() {

    useEffect(() => { 
        axios.get(`http://localhost:8080/api/listRealShit`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }, [])

    const styles = {
        wrapper: {

            flexDirection: 'row',
            border: '1px solid gray',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            width: 450,
            height: 300
        },
        image: {
            width: 'auto',
            height: 'auto',
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





    return (

        <>


            <LNButton />
            <div style={styles.wrapper}>
                <div style={styles.contentContainer}>
                    {/* 작성한 사람의 이름과 댓글 내용 */}
                    <div style={styles.nameText}>작성자 이름</div>
                </div>
                <div>
                    <img style={styles.image} src="" />
                </div>

                <Thumb />

            </div>
                <Link to="/listRealShit/write">글쓰기</Link>
             



        </>
    )
}


export default Idealreal;