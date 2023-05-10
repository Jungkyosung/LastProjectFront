import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { useState } from 'react';
import Frame from '../main/Frame';
import ProfileModifier from './ProfileModifier';
import NicknameModifier from './NicknameModifier';


const Mypage = () => {

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const modal1Open = () => {
        setModal1(true);
    }

    const modal2Open = () => {
        setModal2(true);
    }


    return (
        <Frame>
            <div id="profile-wrap">
                <div id="profile-title">
                    My Page
                </div>
                <div id="profile">
                    <img src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg"></img>
                    <span className="modifier" onClick={modal1Open}><FlipCameraIosIcon />프로필 사진 변경</span>
                    <p>nickName</p>
                    <span className="modifier" onClick={modal2Open}><EditNoteIcon />닉네임 변경</span>
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
            {modal1 && <ProfileModifier modal1={modal1} setModal1={setModal1} />}
            {modal2 && <NicknameModifier modal2={modal2} setModal2={setModal2} />}
        </Frame>
    )
}

export default Mypage;