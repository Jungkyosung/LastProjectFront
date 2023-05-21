import { Link } from "react-router-dom";
import './TriedItem.css';

const TriedItem = ({ tried, imageUrl }) => {

    //console.log(tried);
    return (
        <div className="triedTitle">
            <Link to={`/tried/detail/${tried.triedIdx}`}>
                <div className="img">{imageUrl && <img src={imageUrl} />}</div>

                {tried.triedTitle}
            </Link>
            <div>작성자: {tried.userId}</div>
            <div>작성일: {tried.triedCreatedTime}</div>
            <div>
                <div>조회수: {tried.triedCnt}</div>
                <div>추천수: {tried.triedRcmd}</div>
            </div>
        </div>
    );
};

export default TriedItem;