import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./IdealrealWrite.module.css";
import Frame from '../main/Frame';
import { Input } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@mui/joy";

function IdealrealWrite() {
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

    axios.get(`http://192.168.0.4:8080/api/listidealreal`)
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

  // const handleChangeContents = (e) => {
  //   setContents(e.target.value);
  // };

  const [idealrealTitle, setIdealrealTitle] = useState('')
  const [idealrealIdealImg, setIdealrealIdealImg] = useState([])
  const [idealrealRealImg, setIdealrealRealImg] = useState([])

  const [imageFiles, setImageFiles] = useState([])

  // FORM DATA를 저장할 상태 변수를 변수 이름: 값 형식으로 설정
  let datas = {
    idealrealIdx: idealrealIdx,
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
      url: `http://192.168.0.4:8080/upload`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
      // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
    })
      .then(response => {
        console.log("xxxxxxxxxxxxx")
        console.log(response)
        alert(`${response.data}\n글썻어?`)
        navigate('/idealreal')
      })
      .catch(error => {
        console.log(error)
        alert(error.message)
      })

    console.log(`Name: ${name}, Comment: ${contents}`);
  };

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
    <Frame>
      <div className={styles.contentsWrap}>
        <h2 className={styles.realTitle}>이상과 현실</h2>
        <h3 className={styles.subTitle}>제목</h3>
        {/* <form onSubmit={handleSubmit} className={styles.container}> */}
          <Input placeholder="제목을 적어주세요" id="name" name="name" value={name} onChange={handleChangeName} style={{ border: "none", borderBottom: "1px solid #5E8FCA", borderRadius: 0, width: "59%" }} />

          {/* <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              style={{ width: '100px', height: '20px', padding: '12px', margin: 40 }}
            /> */}

          <div className={styles.imgBox1} >
            {
            idealrealIdealImg.length !== 0
              ?
              <>
                {idealrealIdealImg.map((image, id) => (
                  <><div key={id} className={styles.imgWidth}>
                    <img src={image} className={styles.imgHi} />
                    <label htmlFor="fileSltLeft" className={styles.label}>Select File</label>
                    <input
                      id="fileSltLeft"
                      className={styles.input}
                      type='file'
                      name='idealrealIdealImg'
                      ref={inputFiles1}
                      onChange={handlerChangeFile}
                    />
                  </div></>
                ))}
              </>
              :
              <>
                <label htmlFor="fileSltLeft" className={styles.imgSelect} >Select File</label>
                  <input 
                    id="fileSltLeft"
                    type='file'
                    name='idealrealIdealImg'
                    ref={inputFiles1}
                    onChange={handlerChangeFile}
                    className={styles.input}
                    // className={`${styles.imgSelect}`}
                    // style={{ width: '40%', height: 300, background: 'rgba(94, 143, 202, 0.3)',boxSizing:"border-box", padding:"10px", borderRadius:"10px",cursor: "pointer" }}
                  />

                </>
            }

            {
              idealrealRealImg.length !== 0
                ?
                <>
                  {idealrealRealImg.map((image, id) => (
                    <><div key={id} className={styles.imgWidth}>
                      <img src={image} className={styles.imgHi} />
                      <label htmlFor="fileSltRight" className={styles.label}>Select File</label>
                      <input 
                        id="fileSltRight"
                        type='file'
                        name='idealrealRealImg'
                        ref={inputFiles2}
                        onChange={handlerChangeFile}
                        className={styles.input}
                      /></div></>
                  ))}
                </>
                :
                <>
                  <label htmlFor="fileSltRight" className={`${styles.imgSelect}`} >Select File</label>
                  <input 
                    id="fileSltRight"
                    type='file'
                    name='idealrealRealImg'
                    ref={inputFiles2}
                    onChange={handlerChangeFile}
                    className={styles.input}
                    // className={`${styles.imgSelect}`}
                    //style={{ width: '40%', height: 300, background: 'rgba(94, 143, 202, 0.3)', boxSizing:"border-box", padding:"10px", borderRadius:"10px", cursor: "pointer"}}
                  />
                </>
            }

          </div>
          {/* <div>
            <label htmlFor="contents">내용:</label>
            <input
              type="text"
              id="contents"
              name="contents"
              value={contents}
              onChange={handleChangeContents}
              style={{ width: '50%', height: '300px', padding: '12px', margin: 50 }}
            />
          </div> */}
          <h3 className={styles.subTitle}>내용</h3>
          <div className={styles.editor}>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            setContents(data);
                        }}
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                    />
                </div>
          {/* <button type="submit" onSubmit={handleSubmit}>작성 완료</button> */}
          <Button sx={{  color: "white", background:"#5E8FCA", ":hover": { background: "#2d6ebd"}}} onClick={handleSubmit} type="submit">작성 완료</Button>
        {/* </form> */}
      </div>
    </Frame>
  );
}

export default IdealrealWrite;