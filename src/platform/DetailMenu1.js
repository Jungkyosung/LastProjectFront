import { Button } from "@mui/material";
import styles from './MainMenu.module.css';
import { Link } from "react-router-dom";

const DetailMenu1 = () => {
    return (
        <>
            <div >
                <ul className={styles.detail1}>
                    <li className={styles.detail1Li}><Link to="/">음식</Link></li>
                    <li className={styles.detail1Li}><Link to="/">패션</Link></li>
                    <li className={styles.detail1Li}><Link to="/">문화</Link></li>
                </ul>
            </div>
            {/* <div>
                <ul>
                    <li><Button variant="text">날씨</Button></li>
                    <li><Button variant="text">여행코스</Button></li>
                    <li><Button variant="text">카드뉴스</Button></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Button variant="text">글로벌채팅</Button></li>
                    <li><Button variant="text">웹만화</Button></li>
                    <li><Button variant="text">어디까지</Button></li>
                    <li><Button variant="text">여행친구</Button></li>
                    <li><Button variant="text">이상과현실</Button></li>
                    <li><Button variant="text">물가체험</Button></li>
                </ul>
            </div> */}
        </>
    )
}

export default DetailMenu1;