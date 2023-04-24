import { Link } from "react-router-dom";

const MainMenu = () => {
    return (
        <>
            <div>
                <Link to="/">
                    <div>로고이미지</div>
                </Link>
                <div>
                    <ul>
                        <li>ABOUT US</li>
                        <li>지금 한국은</li>
                        <li>여행정보</li>
                        <li>커뮤니티</li>
                    </ul>
                </div>
                <div>
                    <span>지구본</span>
                    <span>검색</span>
                </div>
            </div>
        </>
    )
}

export default MainMenu;