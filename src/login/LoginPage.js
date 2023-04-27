import { Button, TextField } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Frame from "../main/Frame";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handlerChangeUserId = e => {
        setUserId(e.target.value);
        console.log(e.target.value);
    }
    const handlerChangeUserPassword = e => {
        console.log(e.target.value);
        setUserPassword(e.target.value);
    }
    const handlerOnClick = e => {
        axios.post('http://localhost:8080/login', { userId, userPassword })
            .then(response => {
                console.log(response);
                if (response.data) {
                    sessionStorage.setItem("token", response.data);
                } else {
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                sessionStorage.clear();
            });
    };

    return (
        <Frame>
            <h2>로그인</h2>
            <div>
                <span>LOGO</span>
            </div>
            <div>
                <TextField label={'Email(ID)'} value={userId} onChange={(e)=> handlerChangeUserId(e)} variant="standard" />
                <TextField label={'Password'} value={userPassword} onChange={(e) => handlerChangeUserPassword(e)} variant="standard" />
            </div>
            <Button variant="contained" onClick={handlerOnClick}>LOGIN</Button>
            <div>
                <span>계정이 없으신가요?</span>
                <Link to="/regist"> 회원가입하기</Link>
            </div>
            <div>
                <span>SNS 계정으로 로그인하기</span>
                <div>
                    <FcGoogle />
                    <BsApple />
                    <SiNaver />
                    <RiKakaoTalkFill />
                </div>
            </div>
        </Frame>
    )
}
export default LoginPage;