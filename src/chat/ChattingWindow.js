import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRef, useState } from "react";
import './Chat.css';
import ChatMessageBox from "./ChatroomBox";

function ChattingWindow(props) {

    //글로벌 채팅인지, 동행채팅인지
    const isGlobal = props.isGlobal;
    const isAccompany = props.isAccompany;
    const 동행글Idx = props.동행글Idx;

    const userId = props.userId;
    const header = props.header;
    const nickName = props.nickName;
    const chatHistory = props.chatHistory;
    const setChatHistory = props.setChatHistory;
    const onMessageReceived = props.onMessageReceived;
    const isChatroom = props.isChatroom;
    const setIsChatroom = props.setIsChatroom;

    //상태변수 지정
    const [isJoin, setIsJoin] = useState(false);  //참가여부는 여기선 의미 없음.
    const [message, setMessage] = useState('');
    const [translateText, setTranslateText] = useState([{}]);




    //ref지정(요소 컨트롤)
    const refDialogDiv = useRef();
    const refSenderInput = useRef();    //닉넴 토큰에서 가져와서 필요없음.
    const refMessageInput = useRef();

    //{핸들러: 메시지 전송}
    //stomp의 send함수는 3개 인자 받고, JOIN(connect)과 달리 type을 CHAT으로 하고 message 내용도 담음.
    const sendMessage = useCallback(e => {
        e.preventDefault();

        if (isGlobal) {
            if (props.stompClient) {
                props.stompClient.current.send('/app/chat.sendMessage', {},
                    JSON.stringify({ userId, message, type: 'CHAT' }));  //sender : sender, message : message, type : 'CHAT'       
            }

            //메시지 보냈으면 초기화 해주고, 다시 인풋 태그 가리킴.
            setMessage('');
            refMessageInput.current.focus();
        }

        if (isAccompany) {
            let 채팅방UUID = '';

            axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/chatroom/${동행글Idx}`, { headers: header })
                .then((response) => {
                    // console.log(response.data);
                    채팅방UUID = response.data;
                    // console.log("sender" + sender);
                    if (props.stompClient) {
                        props.stompClient.current.send(`/app/chat.sendMessage/${채팅방UUID}`, {},
                            JSON.stringify({ chatroomId: 채팅방UUID, userId, message, type: 'CHAT' }));  //sender : sender, message : message, type : 'CHAT'       
                    }

                    //메시지 보냈으면 초기화 해주고, 다시 인풋 태그 가리킴.
                    setMessage('');
                    refMessageInput.current.focus();

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [message]);

    //{핸들러: 연결끊기}
    const handlerDisconnect = () => {
        props.stompClient.current.disconnect(function () {
            alert("see you");
            setIsChatroom(true);
        });
    }

    //{핸들러: 번역}
    const handlerTranslate = (msg, idx) => {
        //텍스트 div를 누르면 채팅 내역의 idx 번호를 기준으로 
        chatHistory.map((msg, idx) => { })
        setTranslateText()
        const token = sessionStorage.getItem('token');
        axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/translate/${msg}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                console.log(response);
                setTranslateText[idx](response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    //채팅 내역이 바뀌면, 스크롤을 내려줌.
    useEffect(() => {
        refDialogDiv.current.scroll({
            top: refDialogDiv.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [chatHistory])

    return (
        <>
            <div id="chat-wrap">
                <div id="chat">
                    <div id="dialog" ref={refDialogDiv}>
                        <div className="dialog-board">
                            {chatHistory ?
                                chatHistory.map((item, idx) => (
                                    <>
                                        <div key={idx} className={item.userId === userId ? "dialog-me" : "dialog-other"}>
                                            <div id="dialog-box">
                                                <img id="dialog-profile-img" src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg" />
                                                <div id="dialog-message-box">
                                                    <span id="dialog-profile-nickname">닉네임</span>
                                                    {/* <span><b>{item.userId}</b></span> */}
                                                    <div id="dialog-message">{item.message}</div>
                                                    {/* 번역되면 메시지 아래에 번역문 보이도록 */}
                                                    <div id="dialog-message-translate"></div>

                                                </div>
                                            </div>
                                            <span className="dialog-date">{item.createdDt}</span>
                                            {/* {
                                        translateText[idx] != null ?
                                            <p key={idx}>{translateText[idx]}</p>
                                            :
                                            ""
                                    } */}
                                        </div>
                                    </>
                                )) : ""}

                        </div>
                    </div>

                    <div id="divMessage">
                        <label>메시지</label>

                        <textarea id="messageInput" value={message} ref={refMessageInput}
                            // 값이 바뀌면 메시지 상태변수 수정해주고, 엔터 누르면 메시지 전송 함수 실행
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") { sendMessage(e); } }}>
                        </textarea>

                        <button type="button" value="Send" id="btnSend" onClick={sendMessage}>전송</button>
                        <button type="button" onClick={handlerDisconnect}>나가기</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChattingWindow;