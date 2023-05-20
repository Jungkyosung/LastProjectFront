import { Button, TextField, Autocomplete } from "@mui/material";
import Frame from "../main/Frame";
import './Regist.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import GoogleLoginWindow from "../login/GoogleLoginWindow";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";

const Regist = () => {


    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [nickName, setNickName] = useState('');
    const [nationIdx, setNationIdx] = useState(0);

    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://${process.env.REACT_APP_JKS_IP}:8080/api/regist`,
          {
            "userId": email,
            "userPw": pw,
            "userName": name,
            "userNickname": nickName,
            "countryIdx" : nationIdx
        })
        .then((response)=>{
          console.log(response);
          //회원가입 후 로그인 페이지로 리다이렉트
          navigate("/login");
        })
        .catch((error)=>{
          console.log(error);
        });
        console.log("버튼누름");
      }


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

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

                        <TextField label={'Name'} variant="standard" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <TextField label={'NickName'} variant="standard" value={nickName} onChange={(e)=>setNickName(e.target.value)}/>
                        <TextField label={'Email'} variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={pw} onChange={(e)=>setPw(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password Confirm</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={pwConfirm} onChange={(e)=>setPwConfirm(e.target.value)}
                            />
                        </FormControl>
                        <Autocomplete
                            disablePortal
                            options={nations}
                            
                            sx={{ width: 380 }}
                            onChange={(e, newValue)=>setNationIdx(newValue.id)}
                            renderInput={(params) => <TextField {...params} label='Country' 
                            />} />
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
    {label : 'Korea', id : 1},
    {label : 'USA', id : 2},
    {label : 'Japan', id : 3},
    {label : 'China', id : 4},
    {label : 'Canada', id : 5},
    {label : 'UK', id : 6},
    {label : 'Danmark', id : 7},
    {label : 'Iceland', id : 8},
    {label : 'Norway', id : 9},
    {label : 'Turkiye', id : 10},
    {label : 'Spain', id : 11},
    {label : 'Portugal', id : 12},
    {label : 'France', id : 13},
    {label : 'Ireland', id : 14},
    {label : 'Belgium', id : 15},
    {label : 'Germany', id : 16},
    {label : 'Greece', id : 17},
    {label : 'Sweden', id : 18},
    {label : 'Swiss', id : 19},
    {label : 'Austria', id : 20},
    {label : 'Netherlands', id : 21},
    {label : 'Luxembourg', id : 22},
    {label : 'Italy', id : 23},
    {label : 'Finland', id : 24},
    {label : 'Australia', id : 25},
    {label : 'New Zealand', id : 26},
    {label : 'Mexico', id : 27},
    {label : 'Czech Republic', id : 28},
    {label : 'Hungary', id : 29},
    {label : 'Poland', id : 30},
    {label : 'Slovakia', id : 31},
    {label : 'Chile', id : 32},
    {label : 'Slovenian', id : 33},
    {label : 'Israel', id : 34},
    {label : 'Estonia', id : 35},
    {label : 'Latvia', id : 36},
    {label : 'Lithuania', id : 37},
    {label : 'Columbia', id : 38},
    {label : 'Costa Rica', id : 39}

]