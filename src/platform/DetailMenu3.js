import { Button } from "@mui/material";
import styles from './MainMenu.module.css';
import { Link } from "react-router-dom";

const DetailMenu3 = () => {
    return (
        <>
            <div>
                <ul className={styles.detail1}>
                    {/* <li className={styles.detail1Li}><Link to="/">글로벌채팅</Link></li> */}
                    <li className={styles.detail1Li}><Link to="/webcartoon">웹 만화</Link></li>
                    <li className={styles.detail1Li}><Link to="/tried">어디까지</Link></li>
                    <li className={styles.detail1Li}><Link to="/accompany">여행친구</Link></li>
                    <li className={styles.detail1Li}><Link to="/listidealreal">이상과현실</Link></li>
                    <li className={styles.detail1Li}><Link to="/">물가체험</Link></li>
                </ul>
            </div>
        </>
    )
}

export default DetailMenu3;