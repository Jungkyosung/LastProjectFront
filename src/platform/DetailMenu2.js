import { Button } from "@mui/material";
import styles from './MainMenu.module.css';
import { Link } from "react-router-dom";

const DetailMenu2 = () => {
    return (
        <>
            {/* <div>
                <ul>
                    <li><Button variant="text">음식</Button></li>
                    <li><Button variant="text">패션</Button></li>
                    <li><Button variant="text">문화</Button></li>
                </ul>
            </div> */}
            <div>
                <ul className={styles.detail1}>
                    <li className={styles.detail1Li}><Link to="/">날씨</Link></li>
                    <li className={styles.detail1Li}><Link to="/">여행코스</Link></li>
                    <li className={styles.detail1Li}><Link to="/">카드뉴스</Link></li>
                </ul>
            </div>
            {/* <div>
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

export default DetailMenu2;