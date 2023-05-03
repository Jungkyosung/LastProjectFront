import { Button, TextField } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Frame from "../main/Frame";

const Notice = ()=> {
    return(
        <Frame>
            <h2>공지사항</h2>
                <div>
                    <ul>
                        <li>
                            <em>공지</em>
                            <h3>공지이이제목</h3>
                            <span>2023-05-01</span>
                        </li>
                        <li>
                            <em>공지</em>
                            <h3>공지이이제목</h3>
                            <span>2023-05-01</span>
                        </li>
                        <li>
                            <em>공지</em>
                            <h3>공지이이제목</h3>
                            <span>2023-05-01</span>
                        </li>
                    </ul>
                </div>      
        </Frame>
    )
}
export default Notice;