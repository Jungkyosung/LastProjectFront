import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { useState } from 'react';
import Frame from '../main/Frame';


const Mypage = () => {


    return (
        <Frame>
            <div id="profile-wrap">
                <div id="profile-title">
                    My Page
                </div>
                <div id="profile">
                    <img src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg"></img>
                    <span className="modifier" ><FlipCameraIosIcon />프로필 사진 변경</span>
                    <p>nickName</p>
                    <span className="modifier" ><EditNoteIcon />닉네임 변경</span>
                </div>
                <div>
                <div>현재 작성한 글이 없습니다.</div>
                <div>1번 글 어쩌구 저쩌구</div>
                <div>2번 글 어쩌구 저쩌구</div>
                <div>3번 글 어쩌구 저쩌구</div>
                <div>4번 글 어쩌구 저쩌구</div>
            </div>
            <div>
                <div>현재 작성한 글이 없습니다.</div>
                <div>1번 글 어쩌구 저쩌구</div>
                <div>2번 글 어쩌구 저쩌구</div>
                <div>3번 글 어쩌구 저쩌구</div>
                <div>4번 글 어쩌구 저쩌구</div>
            </div>
            <div>
                <div>현재 작성한 글이 없습니다.</div>
                <div>1번 글 어쩌구 저쩌구</div>
                <div>2번 글 어쩌구 저쩌구</div>
                <div>3번 글 어쩌구 저쩌구</div>
                <div>4번 글 어쩌구 저쩌구</div>
            </div>
            </div>
            
        </Frame>
    )
}

export default Mypage;