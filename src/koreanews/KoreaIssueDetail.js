import { Link, useLocation } from 'react-router-dom';
import Frame from "../main/Frame";
import styles from "./KoreaIssueDtail.module.css";
import Button from '@mui/material/Button';

const KoreaIssueDetail = (props) => {
    const location = useLocation();
    // const title = location.state.title;
    // const content = location.state.content;
    // const index = location.state.index;
    // const thum_url = location.state.thum_url;
    // const broadcast_date = location.state.broadcast_date;
    const { title, content, thum_url, broadcast_date } = location.state;





    return (
        <Frame>
            <div className={styles.contentsWrap}>
                <h2>한국 이슈</h2>

                <h3>{title}</h3>
                <em>{broadcast_date}</em>
                <img src={thum_url}></img>
                <p>{content}</p>
                <Link to="/koreaissue/"><Button variant="contained">목록으로</Button></Link>
            </div>
        </Frame>
    );
}

export default KoreaIssueDetail;