import { Button, TextField } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Frame from "../main/Frame";
import GoogleLoginButton from './GoogleLoginButton';

// const googleAuthUrl = 'https://oauth2.googleapis.com';
// const googleLoginUrl = 'https://accounts.google.com';
// const googleRedirectUrl = 'http://localhost:8080/google/login/redirect';
// const GOOGLECLIENTID = '248755996027-vfjb4igodn9qj0mjn5us426g2e9ma1o5.apps.googleusercontent.com';
// const GOOGLEAUTHPW = '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';


const LoginPage = ()=> {
    return(
        <Frame>
            <h2>로그인</h2>
            <div>
                <span>LOGO</span>
            </div>
            <div>
                <TextField label={'Email(ID)'} variant="standard"/>
                <TextField label={'Password'} variant="standard"/>
            </div>
            <Button variant="contained">LOGIN</Button>
            <div>
                <span>계정이 없으신가요?</span>
                <span>회원가입하기</span>
            </div>
            <div>
                <span>SNS 계정으로 로그인하기</span>
                <div>
                    <FcGoogle/><GoogleLoginButton/>
                    <BsApple/>
                    <SiNaver/>
                    <RiKakaoTalkFill/>
                </div>
            </div>
        </Frame>
    )
}
export default LoginPage;