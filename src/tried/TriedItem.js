import './TriedItem.css';
import { Link } from "react-router-dom";

const TriedItem = ({ tried, imageUrl }) => {

    return (
        <div className="tried-item-wrap">
            <div>글번호</div>
            <div>작성자</div>
            <div>작성일</div>
            <div>
                <img src="https://i.pinimg.com/564x/79/a0/5b/79a05b6900962812fc465a1191bddfc9.jpg"/>
            </div>
            <div>작성자</div>
            <div>제목</div>
            <div>조회수</div>
            <div>추천수</div>



            {/* <Link to={`/tried/detail/${tried.triedIdx}`}>
                {tried.triedTitle}
            </Link>
            <div>글번호: {tried.triedIdx}</div>
            <div>작성자: {tried.userId}</div>
            <div>작성일: {tried.triedCreatedTime}</div>
            <div>게시글 이미지: {imageUrl && <img src={imageUrl} style={{ width: "100px"}} />}</div>
            <div src={imageUrl}>이미지</div>
            <div>내용:   {tried.triedContent}</div>
            <div>조회수: {tried.triedCnt}</div>
            <div>추천수: {tried.triedRcmd}</div> */}
        </div>
    );
};

export default TriedItem;