import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRef, useState } from "react";
import SockJS from "sockjs-client";
import "./Chat.css";

//채팅룸
//채팅룸 창 내부에서 채팅방 누르면 해당 방의 방번호? 찾아서 연결해주면서 모달로 채팅 띄워줌.
//
//필요한 게 두 개임. 뭐냐?
//1. 동행에서 채팅 연결 누르면 방이 없다면, 방을 생성해서 들어가고, 있다면 있는 방으로 들어감.
// 프론트 -> 채팅연결 버튼 누르면 바로 Chatting컴포넌트 ON.
//           'JOIN' 요청 넣음,
//           onConnect로 연결할 때, 채팅방ID로 연결할 건데, onConnect 연결시,
//           (axios.get)으로 동행글Idx 가 있는 채팅방이 있다면 해당 채팅방 UUID 가져옴.
//           없다면, 하나 만들어 줌.
//           가져온 UUID를 넣어서 연결함.
// 백     ->  ws 연결 후 

//2. 글로벌 채팅메뉴 누르면 글로벌 채팅창으로 입장하기.
//          그냥 chat

//[ 할일 ]채팅방 연결하면 채팅_유저 테이블에 유저이름 없다면, 입력해 줌.
//          어떻게 해야 목록 가져올까? 채팅방ID로 유저 이름 검색, 


function Chatroom(props) {

    const userId = props.userId;
    const header = props.header;
    const chatHistory = props.chatHistory;
    const setChatHistory = props.setChatHistory;
    const onMessageReceived = props.onMessageReceived;
    const isChatroom = props.isChatroom;
    const setIsChatroom = props.setIsChatroom;


    const nickName = props.nickName;
    //상태변수 지정
    const [isJoin, setIsJoin] = useState(false);
    const [chatroomList, setChatroomList] = useState([]);


    //글로벌 채팅인지, 동행채팅인지
    const isGlobal = props.isGlobal;
    const isAccompany = props.isAccompany;
    const 동행글Idx = props.동행글Idx;

    //ref지정(요소 컨트롤)
    const refDialogDiv = useRef();


    //아이디 기준으로 채팅방 조회(조회성공)
    useEffect(() => {

        //userId 기준으로 등록된 채팅방들 조회
        axios.post(`http://${process.env.REACT_APP_JKS_IP}:8080/chatroombyuser`, { userId },
            { headers: header }
        )
            .then((response) => {
                console.log(response.data);

                //[할일] 퇴장 이후 채팅방에 쌓인 채팅메시지 개수(not 실시간, 새로고침 기준)





                setChatroomList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        //테스트(idx잘 가져와짐)
        if (isAccompany) {

            let 채팅방UUID = '';

            axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/chatroom/${동행글Idx}`, { headers: header })
                .then((response) => {
                    console.log(response.data);
                    채팅방UUID = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    const joinChatting = (e) => {
        e.preventDefault();

        //sender없으면 실행안함.
        if (!userId) {
            return;
        }
        console.log("채팅룸에서 global", isGlobal);
        console.log("채팅룸에서 accompany", isAccompany);
        //"/ws" 로 stomp(채팅방) 연결함.
        props.stompClient.current = Stomp.over(() => new SockJS(`http://${process.env.REACT_APP_JKS_IP}:8080/ws`));

        //stomp의 connect함수 인자는 3개면 아래와 같음, 
        //(headers{login,passcode}, connect콜백함수, error콜백함수) 
        props.stompClient.current.connect({}, onConnected, onError);
    };

    const onConnected = () => {

        //동행 채팅 연결시 axios.get 동행Idx있다면 해당 채팅방UUID가져옴. (select)
        //만약 없다면 채팅방UUID 새로 생성해줌.(insert)

        //글로벌 채팅이면 
        // axios 해줄 필요 없이 바로 chatting 드가면 됨.
        if (isGlobal) {
            //stomp의 subscribe함수는 인자 2개 받음,
            //("구독 목적지 주소", 콜백 함수)
            //콜백함수는 보통 function(message)로, message.body가 있다면 출력해주고 없으면 없다고 출력.
            props.stompClient.current.subscribe('/topic/chatting', onMessageReceived);
            //stomp의 send함수는 인자 3개 받음,
            //("요청 목적지 주소", {헤더내용들}, body로 "문자열")
            props.stompClient.current.send('/app/chat.addUser', {},
                JSON.stringify({ userId, type: 'JOIN' }));      //sender : sender, type : 'JOIN'
        }

        //동행 채팅이면
        //axios.get 해서 동행채팅idx 있는지 확인 필요, 없다면 채팅방 생성해줌, 있다면 채팅방UUID반환 
        if (isAccompany) {

            let 채팅방UUID = '';

            axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/chatroom/${동행글Idx}`, { headers: header })
                .then((response) => {
                    console.log(response.data);
                    채팅방UUID = response.data;

                    //채팅방 구독
                    props.stompClient.current.subscribe(`/topic/chatting/${채팅방UUID}`, onMessageReceived);

                    //채팅방 메시지 및 조인
                    props.stompClient.current.send(`/app/chat.addUser/${채팅방UUID}`, {},
                        JSON.stringify({ chatroomId: 채팅방UUID, userId, type: 'JOIN' }));

                })
                .catch((error) => {
                    console.log(error);
                })
        }

        setIsChatroom(false);
    };


    //{콜백함수: 연결 실패시}  오류 로그출력 
    const onError = useCallback((error) => {
        console.log('연결실패', error);
    }, []);

    // //{콜백함수: 구독 메시지 수신시}
    // const onMessageReceived = payload => {
    //     const message = JSON.parse(payload.body);

    //     //수신된 메시지가 type이 JOIN이면서, 메시지의 sender와 sender가 같다면
    //     //IsJoin을 true로 설정하고, 채팅내역을 반영해줌.
    //     //아니면 채팅내역만 반영해줌.
    //     if (message.type === 'JOIN' && message.userId === userId) {
    //         setIsJoin(true);
    //         message.history.map(msg => setChatHistory(chatHistory => [...chatHistory, msg]))

    //     } else {
    //         setChatHistory(chatHistory => [...chatHistory, message]);

    //     }
    // };

    const handlerLeaveChatroom = (chatroomId)=> {

        let tempUserId = userId.replace(".","-");

        axios.delete(`http://${process.env.REACT_APP_JKS_IP}:8080/chatroom/delete/${chatroomId}/${tempUserId}`, 
        { headers: header })
        .then((response)=>{
            console.log(response.data);
            const tempChatroomList = chatroomList.filter( prevList => 
                prevList.chatroomId !== response.data
             )
            setChatroomList(tempChatroomList);
        }).catch((error)=>{
            console.log(error);
        })

    }

    return (
        <>
            <div id="chat-wrap">
                <div id="chat">
                    <div id="chatroomlist">
                        <div className="chatroomList">글로벌 채팅방</div>
                        {chatroomList.map((chatroom, idx) => (
                            <div className="chatroomList">
                                <span key={idx}>{chatroom.chatroomId}</span>
                                <span > 안읽은 메시지 </span>
                                <button onClick={()=>handlerLeaveChatroom(chatroom.chatroomId)}>채팅방 퇴장</button><br></br>
                            </div>
                        ))}
                    </div>

                    <div id="divSender">
                        <input value={동행글Idx} onChange={(e) => props.handler동행글Idx(e)}></input>
                        <button type="button" value="참가" id="btnJoin" onClick={joinChatting}>
                            채팅참가버튼
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Chatroom;
