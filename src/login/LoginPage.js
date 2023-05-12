import { Button, TextField } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Frame from "../main/Frame";
import GoogleLoginButton from './GoogleLoginButton';
import './LoginPage.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import GoogleLoginWindow from "./GoogleLoginWindow";

// const googleAuthUrl = 'https://oauth2.googleapis.com';
// const googleLoginUrl = 'https://accounts.google.com';
// const googleRedirectUrl = 'http://localhost:8080/google/login/redirect';
// const GOOGLECLIENTID = '248755996027-vfjb4igodn9qj0mjn5us426g2e9ma1o5.apps.googleusercontent.com';
// const GOOGLEAUTHPW = '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';


const LoginPage = () => {

    const [googleLoginModal, setGoogleLoginModal] = useState(false);

    const handlerOpenGoogle = () => {
        setGoogleLoginModal(true);
    }


    return (
        <Frame>
            <div id="login-wrap">
                <h2 id="login-title">LOGIN</h2>
                <div id="logo-box">
                    <Link to="/"><span>LOGO</span></Link>
                </div>
                <div id="login-input" >
                    <TextField label={'Email(ID)'} variant="standard" />
                    <TextField label={'Password'} variant="standard" />
                    <span id="login-btn">
                        <Button variant="contained">LOGIN</Button>
                    </span>
                </div>

                <div>
                    <span>계정이 없으신가요?</span>
                </div>
                <div id="link-regist">
                    <Link to="/regist"> <span>회원가입하기</span></Link>
                </div>
                <div id="login-sns">
                    <span>SNS 계정으로 로그인하기</span>
                    <div id="login-google-logo">
                        <FcGoogle onClick={handlerOpenGoogle} />
                        {googleLoginModal &&
                            <GoogleLoginWindow googleLoginModal={googleLoginModal}
                                setGoogleLoginModal={setGoogleLoginModal} />}
                        {/* <BsApple />
                        <SiNaver />
                        <RiKakaoTalkFill /> */}
                    </div>
                </div>
            </div>
        </Frame>
    )
}
export default LoginPage;