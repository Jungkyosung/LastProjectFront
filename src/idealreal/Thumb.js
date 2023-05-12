import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



function Thumb(props) {


  const [idealrealIdx, setIdealrealIdx] = useState(props.idealrealIdx);
  const [userId, setUserId] = useState(props.userId);
  const [likeCount, setLikeCount] = useState(0)
  const [likeCheck, setLikeCheck] = useState(0);

  useEffect(() => {
      // const token = sessionStorage.getItem('token');
      // const decodedToken = jwt_decode(token);
      // console.log(decodedToken);
      // setUserNickname(decodedToken.userNickname);


      //해당 글 좋아요 수 조회
      axios.get(`http://localhost:8080/api/listidealreal/detail/getlike/${idealrealIdx}`)
          .then(response => {
              console.log(response);
              setLikeCount(response.data);
          })
          .catch(error => console.log(error));

      //이 사람이 좋아요를 눌른 놈인지 아닌지
      //추후 로그인 토큰 값으로 변경 필요!!!
      let loginId = 'jks@jks.com';

      axios.get(`http://localhost:8080/api/listidealreal/detail/likecheck/${idealrealIdx}/${loginId}`)
          .then(response => {
              console.log(response);
              setLikeCheck(response.data);
          })
          .catch(error => console.log(error));


  }, []);


  //좋아요 수 업데이트(추가/삭제) 
  const LikeCountHandler = () => {
  
    //추후 로그인 토큰 값으로 변경 필요!!!
    let loginId = 'jks@jks.com';

    let data = {
      userId : loginId,
      idealrealIdx : idealrealIdx
    }

    let headers = {
      'Content-Type' : 'application/json'
    };

  if (likeCheck == 0) {
    
    setLikeCount(prev => prev + 1)
      axios.post(`http://localhost:8080/api/${idealrealIdx}/like`, 
      data, headers)
      .then(response => {                           
          console.log(response);
          setLikeCheck(1);
      })
      .catch(error => {
          console.log(error);
          return;
      });
  } else if (likeCheck == 1) {
    setLikeCount(prev => prev - 1)
      axios.delete(`http://localhost:8080/api/${idealrealIdx}/unlike`, 
      {data})
      .then(response => {                           
          console.log(response);
          setLikeCheck(0);
      })
      .catch(error => {
          console.log(error);
          return;
      });
  }}

  return(
      <>
      <div>
       <h3>Joasis{likeCount} </h3>
       <br/>
      {likeCheck == 0 ?
        <FavoriteBorderIcon onClick={LikeCountHandler}/>:
        <FavoriteIcon onClick={LikeCountHandler}/>
      }
      </div>
      </>
  );
}
  
    export default Thumb;