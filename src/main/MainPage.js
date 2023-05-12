import Frame from "./Frame";
import "./MainPage.css"


const MainPage = () => {

    return (
        <Frame>
            <div id="main-page">
                <div id="main-koreaissue">
                    <p>지금 한국은</p>
                    <ul id="main-koreaissue-ul">
                        <li className="main-koreaissue-li">1번박스</li>
                        <li className="main-koreaissue-li">2번박스</li>
                        <li className="main-koreaissue-li">3번박스</li>
                        <li className="main-koreaissue-li">4번박스</li>
                    </ul>
                </div>
                <div id="main-accompany">
                    <p>동행찾기</p>
                    <ul id="main-accompany-ul">
                        <li className="main-accompany-li">1번박스</li>
                        <li className="main-accompany-li">2번박스</li>
                        <li className="main-accompany-li">3번박스</li>
                        <li className="main-accompany-li">4번박스</li>
                    </ul>
                </div>
                <div id="main-notice">
                    <p>공지사항</p>
                    <ul id="main-notice-ul">
                        <li className="main-notice-li">1번박스</li>
                        <li className="main-notice-li">2번박스</li>
                    </ul>
                </div>
            </div>

        </Frame>
    )
}
export default MainPage;