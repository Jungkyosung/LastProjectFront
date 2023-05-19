import Frame from "../main/Frame";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './AccompanyWrite.css';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "./AccompanyWrite.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const ariaLabel = { 'aria-label': 'description' };

const AccompanyWrite = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [image, setImage] = useState('');
    const [numbers, setNumbers] = useState('');
    const [region, setRegion] = useState('');

    const regions = [
        { name: "서울", value: "category1" },
        { name: "강원도", value: "category2" },
        { name: "제주도", value: "category3" },
        { name: "부산", value: "category4" },
        { name: "경기도", value: "category5" },
        { name: "인천", value: "category6" },
        { name: "충청도", value: "category7" },
        { name: "경상도", value: "category8" },
        { name: "전라도", value: "category9" }
    ];

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeStartTime = (e) => {
        setStartTime(e);
    };

    const handleChangeEndTime = (e) => {
        setEndTime(e);
    };

    const handleChangeNumbers = (e) => {
        setNumbers(e.target.value);
    };

    // const handleChangeRegion = (e) => {
    //     setRegion(e.target.value);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/accompany/write`,
            { "accompanyTitle": title, "accompanyContent": content, "accompanyStartTime": startTime, "accompanyEndtTime": endTime, "accompanyImage": image, "accompanyNumbers": numbers, "accompanyRegion": region },
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response)
                alert("정상처리 되었습니다");
                navigate('/accompany')
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            })

    };

    const handlerChangeFile = (e) => {
        const name = e.target.name;
        const files = e.target.files;
    }

    return (
        <Frame>
            <div id="accompany-main-write-img">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/1280px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg" />
            </div>
            <div id="accompany-write-wrap">
                <ul id="accompany-write-area-ul">
                    {/* <li>서울</li>
                    <li>강원도</li>
                    <li>제주도</li>
                    <li>부산</li>
                    <li>경기도</li>
                    <li>인천</li>
                    <li>충청도</li>
                    <li>경상도</li>
                    <li>전라도</li> */}
                </ul>
                <div id="accompany-date-pick">
                    <div>시작 날짜</div>
                    <DatePicker value={startTime} onChange={handleChangeStartTime} />
                    <div>종료 날짜</div>
                    <DatePicker value={endTime} onChange={handleChangeEndTime} />
                </div>
                <div id="accompany-img">
                    <img src="https://hanok.seoul.go.kr/images/sub/hanok_definition1.jpg" />
                    {/* <div key={id} className={styles.imgWidth}>
                      <img src={image} className={styles.imgHi} />
                      <label htmlFor="fileSltRight" className={styles.label}>Select File</label>
                      <input id="fileSltRight" type='file' name='idealrealRealImg' ref={inputFiles2} onChange={handlerChangeFile} className={styles.input} />
                    </div> */}
                </div>
                <div id="accompany-upload-btn">
                    <Button variant="contained">
                        {/* <label htmlFor="fileSltLeft" className={styles.imgSelect} >Select File</label>
                  <input id="fileSltLeft"  type='file' name='idealrealIdealImg' ref={inputFiles1} onChange={handlerChangeFile} className={styles.input} /> */}
                        IMG UPLOAD
                    </Button>
                    {/* <Button variant="contained">IMG UPLOAD</Button> */}
                </div>
                <div id="accompany-title-write">
                    <div>TITLE</div>
                    <Input placeholder="Placeholder" inputProps={ariaLabel} value={title} onChange={handleChangeTitle} />
                </div>
                <div id="accompany-content-write">
                    <div>CONTENTS</div>
                    {/* <Input placeholder="Placeholder" inputProps={ariaLabel} /> */}
                    <div className={styles.editor}>
                        <CKEditor
                            editor={ClassicEditor}
                            data="</br></br></br></br></br></br></br></br></br></br></br></br>"
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                                setContent(data);
                            }}
                        // onBlur={ ( event, editor ) => {
                        //     console.log( 'Blur.', editor );
                        // } }
                        // onFocus={ ( event, editor ) => {
                        //     console.log( 'Focus.', editor );
                        // } }
                        />
                    </div>
                </div>
                <div className={styles.accompanySubWrite}>
                    <div className={styles.member}>
                        <div>Member</div>
                        <Input placeholder="Placeholder" inputProps={ariaLabel} value={numbers} onChange={handleChangeNumbers} />
                    </div>
                    {/* <div className={styles.region}>
                        <div>Region</div>
                        <Input placeholder="Placeholder" inputProps={ariaLabel} value={region} />
                    </div> */}
                </div>
                <div id="accompany-write-btn">
                    <Button variant="contained" onClick={handleSubmit}>WRITE</Button>
                </div>
            </div>
        </Frame>
    )
}

export default AccompanyWrite;