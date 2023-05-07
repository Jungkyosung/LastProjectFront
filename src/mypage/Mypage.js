import './MobileMypage.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { useState } from 'react';
import Frame from '../main/Frame';


const Mypage = () => {

    const navigate = useNavigate();


    const handlerLogout = () => {

        Swal.fire({
            title: "log out",
            text: "Are you sure you want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            })


    }

    return (
        <Frame>
            <div id="nav">
            </div>
            <div id="profile">
                <img src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg"></img>
                <span className="modifier" ><FlipCameraIosIcon />프로필 사진 변경</span>
                <p>nickName</p>
                <span className="modifier" ><EditNoteIcon />닉네임 변경</span>
            </div>
        </Frame>
    )
}

export default Mypage;