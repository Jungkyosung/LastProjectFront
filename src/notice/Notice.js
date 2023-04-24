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
                <span>LOGO</span>
            </div>
            <div>
                <div></div>
            </div>
            <Button variant="contained">LOGIN</Button>
            <div>
                <span>계정이 없으신가요?</span>
                <span>회원가입하기</span>
            </div>
            <div>
                <span>SNS 계정으로 로그인하기</span>
                <div>
                    <FcGoogle/>
                    <BsApple/>
                    <SiNaver/>
                    <RiKakaoTalkFill/>
                </div>
            </div>
        
        </Frame>
    )
}
export default Notice;