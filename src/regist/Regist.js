import { Button, TextField, Autocomplete } from "@mui/material";
import Frame from "../main/Frame";
import './Regist.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import GoogleLoginWindow from "../login/GoogleLoginWindow";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";

const Regist = () => {
    const name = '';
    const email = '';

    const country = '';
    const nickName = '';

    const handlerSubmit = () => {

    }

    const [googleLoginModal, setGoogleLoginModal] = useState(false);

    const handlerOpenGoogle = () => {
        setGoogleLoginModal(true);
    }

    return (
        <Frame>
            <div id="regist-wrap">
                <h2 id="regist-title">REGIST</h2>
                <div id="logo-box">
                    <Link to="/"><span>LOGO</span></Link>
                </div>
                <div id="regist-input">
                    <form onSubmit={handlerSubmit}>

                        <TextField label={'Name'} variant="standard" />
                        <TextField label={'NickName'} variant="standard" />
                        <TextField label={'Email'} variant="standard" />
                        <TextField label={'Password'} variant="standard" />
                        <TextField label={'Password Confirm'} variant="standard" />
                        <Autocomplete
                            disablePortal
                            options={nations}
                            sx={{ width: 380 }}
                            renderInput={(params) => <TextField {...params} label='Country' />} />
                        <span id="regist-btn">
                            <Button type="submit" variant="contained">REGIST</Button>
                        </span>
                    </form>
                </div>
                <div id="regist-login-sns">
                    <span>SNS 계정으로 로그인하기</span>
                    <div id="regist-google-logo">
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

export default Regist;

const nations = [
    "korea"
]