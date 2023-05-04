import Frame from "../main/Frame";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Notice = () => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/noticeList`)
            .then(response => {
                console.log(response.data)
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <Frame>
            <h2>공지사항</h2>
            <div>
                <ul>
                    {
                        datas.map((list, index) => (
                            <li key={index}>
                                <Link to=
                                    {`/notice/${list.noticeIdx}`}
                                >
                                    <em>공지</em><h3>{list.noticeTitle}</h3><span>{list.noticeCreatedTime}</span></Link></li>

                        ))
                    }
                </ul>
            </div>
        </Frame>
    )
}
export default Notice;