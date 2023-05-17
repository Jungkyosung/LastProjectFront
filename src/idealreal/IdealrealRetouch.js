import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Frame from "../main/Frame";
import styles from "./IdealrealRetouch.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from '@mui/joy/Button';
import { Input } from "@mui/material";

function IdealrealRetouch() {

    const [data, setData] = useState([]);
    const [idealrealTitle, setIdealrealTitle] = useState('');
    const [idealrealContent, setIdealrealContent] = useState('');
    const [userId, setUserId] = useState('');
    const [idealrealCreatedTime, setIdealrealCreatedTime] = useState('');
    const [idealrealCnt, setIdealrealCnt] = useState('');
    const [idealrealIdealImg, setIdealrealIdealImg] = useState([])
    const [idealrealRealImg, setIdealrealRealImg] = useState([])
    const [contents, setContents] = useState('')
    const [name, setName] = useState('');

    const { idealrealIdx } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://192.168.0.4:8080/api/listidealreal/detail/${idealrealIdx}`,
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response);
                setIdealrealTitle(response.data.idealrealTitle);
                setIdealrealContent(response.data.idealrealContent);
                setUserId(response.data.userId);
                setIdealrealCreatedTime(response.data.idealrealCreatedTime);
                setIdealrealCnt(response.data.idealrealCnt);
                // setIdealrealIdealImg(response.data.idealrealIdealImg);
                // setIdealrealRealImg(response.data.idealrealRealImg);


                // if (response.data.idealrealDto.userId != response.data.selectIdealRealList.userId && response.data.idealrealDto.userId != "test") {
                //     alert('잘못된 접근 입니다.');
                //     navigate('/listidealreal')
                //     return;
                // }
                // const token = sessionStorage.getItem('token')
                // const decode = jwtDecode(token);

                // if (decode.sub != response.data.movieTitle.writerId || decode.sub != "test") {
                //   alert('잘못된 접근 입니다.');
                //   navigate('/')
                // }
            })
            .catch(error => console.log(error));
    }, []);


    const handlerClickUpdate = () => {
        axios.put(`http://192.168.0.4:8080/api/listidealreal/${idealrealIdx}`,  // 요청 URL
            { "idealrealTitle": idealrealTitle, "idealrealContent": idealrealContent },
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )           // 요청 본문을 통해서 서버로 전달할 값
            .then(response => {                                         // 200번대 응답코드가 반환되는 경우
                console.log(response);
                alert("오 수정")
                navigate('/idealreal')
            })
            .catch(error => {                                           // 200번대를 제외한 응답코드가 반환되는 경우
                console.log(error);
                alert(`정수 오 (${error.response.data.message})`);
                return;
            });
    };
    const handlerChange = (e) => {
        setIdealrealTitle(e.target.value);
    }
    const handlercontents = (e) => {
        setIdealrealContent(e.target.value)
    }
    // const sytles = {
    //     display: 'flex',
    //     flexDirection: 'comlum',
    //     width: '1200px',
    //     margin: '0 auto',
    //     position: 'relative',
    //     marginLeft: '5',
    //     border: '1px solid aqua',
    // }



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
            method: 'PUT',
            url: `http://192.168.0.4:8080/reupload/${idealrealIdx}`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        })
            .then(response => {
                console.log("xxxxxxxxxxxxx")
                console.log(response)
                alert(`${response.data}\n오 수정`)
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

    const idealImg = `http://192.168.0.4:8080/api/getimage/${idealrealIdealImg}`;
    const realImg = `http://192.168.0.4:8080/api/getimage/${idealrealRealImg}`;


    return (
        <Frame>
            <div className={styles.containerWrap}>
                <h2 className={styles.realTitle}>이상과 현실</h2>
                <div className={styles.content}>
                    {/* <h3 className={styles.subTitle}>{idealrealTitle}</h3> */}
                    <Input placeholder="제목을 적어주세요" id="idealrealTitle" name="idealrealTitle" value={idealrealTitle} onChange={handlerChange} className={styles.titleInput}  />
                    <span className={styles.userId}>{userId}</span>
                    <div className={styles.timeCnt}>
                        <span className={styles.time}>{idealrealCreatedTime}</span>
                        <span>조회수 {idealrealCnt}</span>
                    </div>
                    <div className={styles.contentBox}>
                        <div className={styles.imgBox}>
                            <div className={styles.imgBox1} >
                                {
                                    idealrealRealImg.length !== 0
                                        ?
                                        <>
                                            {idealrealRealImg.map((image, id) => (
                                                <><div key={id} className={styles.imgWidth}>
                                                    <img src={image} style={{ width: "100%", height: 250, objectFit: "scale-down" }} />
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

                                {
                                    idealrealIdealImg.length !== 0
                                        ?
                                        <>
                                            {idealrealIdealImg.map((image, id) => (
                                                <><div key={id} className={styles.imgWidth}>
                                                    <img src={image} style={{ width: "100%", height: 250, objectFit: "scale-down" }} />
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

                            </div>
                        </div>
                        <div className={styles.lineBox}>
                            <div className={styles.line1}></div>
                            <div className={styles.editor}>
                                <CKEditor
                                    value={idealrealContent}
                                    editor={ClassicEditor}
                                    data={idealrealContent}
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
                            {/* <div className={styles.editor}>
                                {idealrealContent == null ? "" : Parser(idealrealContent)}
                            </div> */}
                            <div className={styles.line2}></div>
                        </div>
                    </div>
                    {/* <div style={{margin:"20px 0"}}><Thumb idealrealIdx={idealrealIdx}/></div> */}
                </div>
                {/* <div style={sytles}>

                <form onSubmit={handleSubmit} action="" method="POST" id="frm" name="frm">

                    <table >
                        <colgroup>
                            <col width="15%" />
                            <col width="" />
                            <col width="15%" />
                            <col width="" />
                            <col width="15%" />
                            <col width="" />
                        </colgroup>
                        <tbody>
                            <tr >
                                <th colSpan="6">{idealrealTitle}</th>

                            </tr>
                            <tr>
                                <td colSpan="6">
                                    <input type="text" value={idealrealTitle} onChange={handlerChange}></input>
                                </td>
                            </tr>

                            <tr>

                            </tr>
                            <tr>
                                <th >조회수</th>
                                <td>{idealrealCnt}</td>
                                <th >작성일</th>
                                <td>{idealrealCreatedTime}</td>
                                <th >작성자</th>
                                <td>{userId}</td>
                            </tr>

                            <div style={{ display: 'flex', flexDirection: 'row', margin: 200, width: '800px', border: '1px solid blue' }} >
                                {
                                    idealrealIdealImg.length !== 0
                                        ?
                                        <>
                                            {idealrealIdealImg.map((image, id) => (
                                                <><div key={id} >
                                                    <img src={image} style={{ width: 'auto', height: 400 }} />
                                                    <input type='file'
                                                        name='idealrealIdealImg'
                                                        ref={inputFiles1}
                                                        onChange={handlerChangeFile}
                                                    />
                                                </div>
                                                </>
                                            ))}
                                        </>
                                        :
                                        <>
                                            <input type='file'
                                                name='idealrealIdealImg'
                                                ref={inputFiles1}
                                                onChange={handlerChangeFile}
                                                style={{ width: '50%', height: 300, background: 'red' }}
                                            />

                                        </>
                                }

                                {
                                    idealrealRealImg.length !== 0
                                        ?
                                        <>
                                            {idealrealRealImg.map((image, id) => (
                                                <><div key={id}>
                                                    <img src={image} style={{ width: 'auto', height: 400 }} />
                                                    <input type='file'
                                                        name='idealrealRdealImg'
                                                        ref={inputFiles2}
                                                        onChange={handlerChangeFile}
                                                    />
                                                </div>
                                                </>
                                            ))}
                                        </>
                                        :
                                        <>
                                            <input type='file'
                                                name='idealrealRealImg'
                                                ref={inputFiles2}
                                                onChange={handlerChangeFile}
                                                style={{ width: '50%', height: 300, background: 'aqua' }}
                                            />
                                        </>
                                }

                            </div>

                            <tr>
                                <td colSpan="6">
                                    <textarea style={{ width: "1000px", height: "500px" }} onChange={handlercontents} value={idealrealContent}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button type="submit" id="edit" value="확인">확인 </button>
                    </div>
                </form>


            </div> */}
                <Button style={{ marginTop: "30px" }} sx={{ color: "white", background: "#5E8FCA", ":hover": { background: "#2d6ebd" } }} id="edit" value="수정안하기" onClick={handleSubmit}>수정할꼬야?</Button>
                {/* <div>
                    <input type="button" id="list" className="btn" value="목록으로" onClick={hanlderClickList} />
                    <input type="button" id="edit" className="btn" value="수정하기" onClick={handlerClickRetouch} />
                    <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />
                </div> */}
            </div>
        </Frame>
    )
}

export default IdealrealRetouch;