import { Button } from "@mui/material";
import styles from './MainMenu.module.css';
import { Link } from "react-router-dom";

const DetailMenu2 = () => {
    return (
        <>
            <div>
                <ul className={styles.detail1}>
                    <li className={styles.detail1Li}><Link to="/weather">날씨</Link></li>
                    <li className={styles.detail1Li}><Link to="/course">여행코스</Link></li>
                </ul>
            </div>
        </>
    )
}

export default DetailMenu2;