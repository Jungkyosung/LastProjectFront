import axios from "axios";
import { useEffect, useState } from "react";
import { FaOdnoklassniki } from "react-icons/fa";


function Thumb() {
  const [likeUpdate, setLikeUpdate] = useState(false)
  const [idealrealRcmd, setIdealrealRcmd] = useState(0) 
  const [userId, setUserId] = useState('');

  useEffect(() => {
      // const token = sessionStorage.getItem('token');
      // const decodedToken = jwt_decode(token);
      // console.log(decodedToken);
      // setUserNickname(decodedToken.userNickname);

      axios.get(`http://localhost:8080/api/listidealreal/${idealrealIdx}/getlike`)
          .then(response => {
              console.log(response);
              setIdealrealRcmd(response.data.idealrealRcmd);
          })
          .catch(error => console.log(error));
  }, []);

  const likeUpdateHandler = () => {
      setLikeUpdate(!likeUpdate)
    }

  const LikeCountHandler = () => {
      likeUpdateHandler()
      
  if (!likeUpdate) {
      setIdealrealRcmd(idealrealRcmd +1)
      axios.put(`http://localhost:8080/api/listidealreal/${idealrealIdx}/like`, 
      {idealrealIdx})
      .then(response => {                           
          console.log(response);
      })
      .catch(error => {
          console.log(error);
          return;
      });
  } else if (likeUpdate) {
      setIdealrealRcmd(idealrealRcmd -1)
      axios.put(`http://localhost:8080/api/listidealreal/{rcmdIdx}/unlike`, 
      {idealrealIdx})
      .then(response => {                           
          console.log(response);
      })
      .catch(error => {
          console.log(error);
          return;
      });
  }} 

  return(
      <>
      <div>
       <h1> Likes  {idealrealRcmd} </h1>
       <br/>
      {likeUpdate ?
        <button onClick={LikeCountHandler}></button>:
        <button onClick={LikeCountHandler}></button>
      }
      </div>
      </>
  );
}
  
    export default Thumb;