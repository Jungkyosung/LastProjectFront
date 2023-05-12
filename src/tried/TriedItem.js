import { Link } from "react-router-dom";

const TriedItem = ({ tried, imageUrl }) => {

    return (
        <div className="triedTitle">
            <Link to={`/tried/detail/${tried.triedIdx}`}>
                {tried.triedTitle}
            </Link>
            <div>글번호: {tried.triedIdx}</div>
            <div>작성자: {tried.userId}</div>
            <div>작성일: {tried.triedCreatedTime}</div>
            <div>게시글 이미지: {imageUrl && <img src={imageUrl} style={{ width: "100px"}} />}</div>
            <div src={imageUrl}>이미지</div>
            <div>내용:   {tried.triedContent}</div>
            <div>조회수: {tried.triedCnt}</div>
            <div>추천수: {tried.triedRcmd}</div>
        </div>
    );
};

export default TriedItem;