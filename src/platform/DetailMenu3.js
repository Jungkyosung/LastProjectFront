import { Button } from "@mui/material";
import styles from './MainMenu.module.css';
import { Link } from "react-router-dom";

const DetailMenu3 = () => {
    return (
        <>
            {/* <div>
                <ul>
                    <li><Button variant="text">음식</Button></li>
                    <li><Button variant="text">패션</Button></li>
                    <li><Button variant="text">문화</Button></li>
                </ul>
            </div> 
            <div>
                <ul>
                    <li><Button variant="text">날씨</Button></li>
                    <li><Button variant="text">여행코스</Button></li>
                    <li><Button variant="text">카드뉴스</Button></li>
                </ul>
            </div> */}
            <div>
                <ul className={styles.detail1}>
                    <li className={styles.detail1Li}><Link to="/">글로벌채팅</Link></li>
                    <li className={styles.detail1Li}><Link to="/">웹 만화</Link></li>
                    <li className={styles.detail1Li}><Link to="/">어디까지</Link></li>
                    <li className={styles.detail1Li}><Link to="/">여행친구</Link></li>
                    <li className={styles.detail1Li}><Link to="/">이상과현실</Link></li>
                    <li className={styles.detail1Li}><Link to="/">물가체험</Link></li>
                </ul>
            </div>
        </>
    )
}

export default DetailMenu3;