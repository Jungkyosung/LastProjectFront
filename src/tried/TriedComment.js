import './TriedComment.css';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import jwt_decode from 'jwt-decode';

const TriedComment = () => {

  let nickName = null;
  let userId = null;
  let jwtToken = null;
  if (sessionStorage.getItem('token') != null) {
      jwtToken = sessionStorage.getItem('token');
      userId = jwt_decode(jwtToken).sub;
      nickName = jwt_decode(jwtToken).nickname;
  }

  const header = {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
  };


  //댓글 작성

  //댓글 수정

  //댓글 삭제



  return (
    <>
      <div className='triedDetail-comnt-each'>
        <div className='triedDetail-comnt-userinfo'>
          <div className='triedDetail-comnt-userimg'>
              <img src="https://i.pinimg.com/564x/45/5c/59/455c59d56d9b6f18381af51faa7c8f51.jpg"/>
            </div>
          <div className='triedDetail-comnt-usernick'>닉네임</div>
        </div>
        <div className='triedDetail-comnt-etc'>
          <div className='triedDetail-comnt-cont'>내용이 너무 좋아요 !!! </div>
          <div className='triedDetail-comnt-time'>2023-05-06</div>
          {/* <div className='triedDetail-comnt-btns'>
            <EditNoteOutlinedIcon />
            <DeleteForeverRoundedIcon />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default TriedComment;