import { Button } from "@mui/material";
import styles from './MainMenu.module.css';
import { Link } from "react-router-dom";

const DetailMenu1 = () => {
    return (
        <>
            <div >
                <ul className={styles.detail1}>
                    <li className={styles.detail1Li}><Link to="/koreaissue">카드뉴스</Link></li>
                    <li className={styles.detail1Li}><Link to="/koreaprice">물가체험</Link></li>
                </ul>
            </div>
        </>
    )
}

export default DetailMenu1;