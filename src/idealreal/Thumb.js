import axios from "axios";
import { useEffect, useState } from "react";
import { FaOdnoklassniki } from "react-icons/fa";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function Thumb() {
  const [likeUpdate, setLikeUpdate] = useState(false)
  const [idealrealIdx, setIdealrealIdx] = useState(0)
  const [userId, setUserId] = useState('');
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    // const token = sessionStorage.getItem('token');
    // const decodedToken = jwt_decode(token);
    // console.log(decodedToken);
    // setUserNickname(decodedToken.userNickname);

    axios.get(`http://${process.env.REACT_APP_KTG_IP}:8080/api/${idealrealIdx}/getlike`)
      .then(response => {
        console.log(response);
        setIdealrealIdx(response.data.idealrealIdx);
      })
      .catch(error => console.log(error));
  }, []);

  const likeUpdateHandler = () => {
    setLikeUpdate(!likeUpdate)
  }

  const LikeCountHandler = () => {
    likeUpdateHandler()

    if (!likeUpdate) {
      setIdealrealIdx(prev => prev + 1)
      axios.post(`http://${process.env.REACT_APP_KTG_IP}:8080/api/${idealrealIdx}/like`,
        { idealrealIdx })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          return;
        });
    } else if (likeUpdate) {
      setIdealrealIdx(prev => prev - 1)
      axios.delete(`http://${process.env.REACT_APP_KTG_IP}:8080/api/${idealrealIdx}/unlike`,
        { idealrealIdx })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          return;
        });
    }
  }

  return (
    <>
      <div>
        <h3>Joasis{idealrealIdx} </h3>
        <br />
        {likeUpdate ?
          <FavoriteOutlinedIcon onClick={LikeCountHandler}/> :
          <FavoriteBorderOutlinedIcon onClick={LikeCountHandler}/>
        }
      </div>
    </>
  );
}

export default Thumb;