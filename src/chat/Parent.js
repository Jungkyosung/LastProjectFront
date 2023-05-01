import { useRef, useState } from "react";
import Chatroom from "./Chatroom";
import ChattingWindow from "./ChattingWindow";
import jwt_decode from 'jwt-decode';

function Parent(){

    let nickName = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        nickName = jwt_decode(jwtToken).nickname;
    }

    const header = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };


    //상위컴포넌트에 올려서 버튼 누르면 true로 바꿔줘야됨.
    const [isGlobal, setIsGlobal] = useState(true);          //글로벌 채팅이면 true
    const [isAccompany, setIsAccompany] = useState(false);     //동행 채팅이면 true

    const [ userId, setUserId ] = useState(jwt_decode(sessionStorage.getItem('token')).sub);

    const [동행글Idx, set동행글Idx] = useState(0);

    const stompClient = useRef(null);   //stomp를 바라보게 해둠. 하위컴포넌트로 props로 전달 함.

    //{핸들러: 글로벌채팅으로 ON}
    const handlerGlobalChat = ()=>{
        setIsGlobal(true);
        setIsAccompany(false);
        console.log("accompany",isAccompany);
        console.log("global",isGlobal);
    }

    //{핸들러: 동행채팅으로 ON}
    const handlerAccompanyChat = ()=>{
        setIsAccompany(true);
        setIsGlobal(false);
        console.log("accompany",isAccompany);
        console.log("global",isGlobal);
    }


    const handler동행글Idx = (e)=>{
        set동행글Idx(e.target.value);
        console.log(e.target.value);
    }

    return(
        <>
            <button type="button" onClick={handlerGlobalChat}>글로벌채팅방</button>
            <button type="button" onClick={handlerAccompanyChat}>동행채팅방</button>
            <Chatroom 
                stompClient={stompClient} 
                userId={userId} 
                isGlobal={isGlobal} 
                isAccompany={isAccompany}
                header={header}
                nickName={nickName}
                동행글Idx={동행글Idx}
                handler동행글Idx={handler동행글Idx}/>
            <ChattingWindow 
                stompClient={stompClient} 
                userId={userId}
                isGlobal={isGlobal} 
                isAccompany={isAccompany}
                header={header}
                nickName={nickName}
                동행글Idx={동행글Idx}
                handler동행글Idx={handler동행글Idx}/>
        </>
    )
}
export default Parent;