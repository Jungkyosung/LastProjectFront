import { Button } from "@mui/material";

const DetailMenu = () => {
    return (
        <>
            <div></div>
            <div>
                <ul>
                    <li><Button variant="text">음식</Button></li>
                    <li><Button variant="text">패션</Button></li>
                    <li><Button variant="text">문화</Button></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Button variant="text">날씨</Button></li>
                    <li><Button variant="text">여행코스</Button></li>
                    <li><Button variant="text">카드뉴스</Button></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Button variant="text">글로벌채팅</Button></li>
                    <li><Button variant="text">웹만화</Button></li>
                    <li><Button variant="text">어디까지</Button></li>
                    <li><Button variant="text">여행친구</Button></li>
                    <li><Button variant="text">이상과현실</Button></li>
                    <li><Button variant="text">물가체험</Button></li>
                </ul>
            </div>
        </>
    )
}

export default DetailMenu;