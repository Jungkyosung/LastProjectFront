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
        </>
    )
}

export default DetailMenu1;