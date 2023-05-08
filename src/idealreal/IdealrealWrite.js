import React, { useEffect, useState, useRef, useNavigate } from 'react';
import axios from 'axios';

function IdealrealWrite({ onSubmit, history }) {
  const [data, setData] = useState([])
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [contents, setContents] = useState('')
  const [idealrealIdx, setIdealrealIdx] = useState([])
  const [real, setReal] = useState([])
  const [ideal, setIdeal] = useState([])
  const navigate = useNavigate();



  useEffect(() => {
    // if (!sessionStorage.getItem('token')) {
    //   alert("로그인 했어?")
    //   history.push("/login")
    //   return
    // }

    axios.get(`http://localhost:8080/api/listidealreal`)
      .then(response => {
        console.log(response.data)
        setData(response.date)
      })
      .catch(error => console.log(error))
  }, [])



  const handlerIdealreal = (e) => {
    setIdealrealIdx(e.target.value)
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeContents = (e) => {
    setContents(e.target.value);
  };

  const [idealrealTitle, setIdealrealTitle] = useState('')
  const [idealrealIdealImg, setIdealrealIdealImg] = useState([])
  const [idealrealRealImg, setIdealrealRealImg] = useState([])

  const [imageFiles, setImageFiles] = useState([])

  // FORM DATA를 저장할 상태 변수를 변수 이름: 값 형식으로 설정
  let datas = {
    idealrealTitle: name,
    idealrealContent: contents
  };

  // 서버로 전달할 폼 데이터를 작성
  const formData = new FormData();
  formData.append(
    'data',
    new Blob([JSON.stringify(datas)], { type: 'application/json' })
  );
  Object.values(imageFiles).forEach(
    file => Object.values(file.files).forEach(
      f => formData.append(file.name, f)));

  // multipart/form-data 형식으로 서버로 전달
  const handleSubmit = (e) => {
    console.log(datas);
    console.log(formData);
    e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:8080/upload`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
      // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
    })
      .then(response => {
        console.log("xxxxxxxxxxxxx")
        console.log(response)
        alert(`${response.data}\n글썻어?`)
        navigate('/listidealreal')
      })
      .catch(error => {
        console.log(error)
        alert(error.message)
      })




    console.log(`Name: ${name}, Comment: ${contents}`);
  };

  const container = {
    display: '',
    flexDirection: 'comlum',
    width: '1180px',
    margin: '0 auto',
    position: 'relative'
  }

  const changeImageFiles = (data, type) => {
    console.log(data, type);
    const newImageFiles = [...imageFiles];

    if (type === 'ideal')
      newImageFiles[0] = data;
    else
      newImageFiles[1] = data;

    setImageFiles(newImageFiles);
  };


  const inputFiles1 = useRef();
  const inputFiles2 = useRef();

  const handlerChangeFile = (e) => {
    const name = e.target.name;
    const files = e.target.files;

    // 이미지파일 올릴 갯수 지정
    if (e.target.name == 'idealrealIdealImg') {
      const imageArr = e.target.files;
      let imageURLs = [];
      let image;
      let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

      for (let i = 0; i < imagesLength; i++) {
        image = imageArr[i];

        // 이미지 미리보기 로직 FileReader라는 자체코드로 원리는 모르지만 알아서 짜줌
        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          imageURLs[i] = reader.result;
          setIdealrealIdealImg([...imageURLs]);
        };
        reader.readAsDataURL(image);
      }
    }

    if (e.target.name == 'idealrealRealImg') {
      const imageArr = e.target.files;
      let imageURLs = [];
      let image;
      let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

      for (let i = 0; i < imagesLength; i++) {
        image = imageArr[i];

        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          imageURLs[i] = reader.result;
          setIdealrealRealImg([...imageURLs]);
        };
        reader.readAsDataURL(image);
      }
    }

    const unchangedImageFiles = imageFiles.filter(file => file.name !== name)
    setImageFiles([...unchangedImageFiles, { name, files }]);
  };

  return (
    <form onSubmit={handleSubmit} style={container}>
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
      </div >
      <div style={{ display: 'flex' }} >
        {
          idealrealIdealImg.length !== 0
            ?
            <>
              {idealrealIdealImg.map((image, id) => (
                <div key={id}>
                  <img src={image} style={{ width: 300, height: 400 }} />
                </div>
              ))}
            </>
            :
            <>
              <input type='file'
                name='idealrealIdealImg'
                ref={inputFiles1}
                onChange={handlerChangeFile}
                style={{ width: 300, height: 300, background: 'red' }}
              />
            </>
        }

{
          idealrealRealImg.length !== 0
            ?
            <>
              {idealrealRealImg.map((image, id) => (
                <div key={id}>
                  <img src={image} style={{ width: 300, height: 400 }} />
                </div>
              ))}
            </>
            :
            <>
              <input type='file'
                name='idealrealRealImg'
                ref={inputFiles2}
                onChange={handlerChangeFile}
                style={{ width: 300, height: 300, background: 'aqua' }}
              />
            </>
        }
        
      </div>
      <div>
        <label htmlFor="contents">내용:</label>
        <input
          type="text"
          id="contents"
          name="contents"
          value={contents}
          onChange={handleChangeContents}
          style={{ width: '300px', height: '100px', padding: '12px' }}
        />
      </div>
      <button type="submit">작성 완료</button>
    </form>
  );
}

export default IdealrealWrite;