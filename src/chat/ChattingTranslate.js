import axios from "axios";
import { useEffect, useState } from "react";


const ChattingTranslate = (props) => {

  const message = props.message;
  const header = props.header;
  const translateState = props.translateState;
  const [translateText, setTranslateText] = useState('');
  
  let 번역문 = "";
  //{핸들러: 번역} //작업 필요 고민중!!!
  
  useEffect(()=>{
    console.log('켜지긴 하니?')
    // 번역문 = handlerTranslate(message);
    // setTranslateText(handlerTranslate(message));
    handlerTranslate(message);
  },[translateState])



  const handlerTranslate = (message) => {
    if(typeof message == "undefined"){
      return
    }
    axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/translate/${message}`,
      {
        headers: header
      })
      .then((response) => {
        console.log(response);
        // setTranslateText(response.data);
        setTranslateText(response.data);
        // let 번역문 = response.data;
        // return 번역문
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  return (
    <>
      <span>{ translateText }</span>
    </>
  )
}
export default ChattingTranslate;