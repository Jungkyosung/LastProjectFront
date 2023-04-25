import React, { useEffect, useState } from 'react';
import IdealButton from './IdealButton';
import RealButton from './RealButton';
import axios from 'axios';

function Write({ onSubmit, history }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [ contents, setContents ] = useState('')
  const [ idealrealIdx, setIdealrealIdx ] = useState([])
  
  
  useEffect(() => {
    axios.get(`http://localhost:8080/api/listRealShit`)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }, [])

  const handlerIdealreal = (e) => {
    setIdealrealIdx(e.target.value)
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeComment = (e) => {
    setContents(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post(`http://localhost:8080/api/listRealShit/write`,
      {"title":name, "contents":contents,"idealrealIdx":idealrealIdx},
      {headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}}
      )
      .then(response =>{
        console.log(response)
        alert("글썻어?")
        history.push('/listRealShit')
      })
      .catch(error => {console.log(error)
      alert(error.message)})

    console.log(`Name: ${name}, Comment: ${comment}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">제목:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeName}
          style={{ width: '100px', height: '20px', padding: '12px' }}
        />
      </div>
      <IdealButton /> <RealButton /> 
      <div>
        <label htmlFor="comment">내용:</label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={handleChangeComment}
          style={{ width: '300px', height: '100px', padding: '12px' }}
        />
      </div>
      <button type="submit">작성 완료</button>
    </form>
  );
}

export default Write;