import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const TriedUpdate = () => {

    const navigate = useNavigate();
    // const location = useLocation();
    // const { imgUrl } = location.state;
    // console.log('이미지', imgUrl);

    const fileInputRef = useRef();
    const { triedIdx } = useParams();

    const [tried, setTried] = useState({});
    const [triedTitle, setTriedTitle] = useState('');
    const [triedContent, setTriedContent] = useState('');
    const [triedImg, setTriedImg] = useState([]);
    const [userId, setUserId] = useState('');
    const [triedCreatedTime, setTriedCreatedTime] = useState('');
    const [filename, setFilename] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [triedCategoryIdx, setTriedCategoryIdx] = useState('');
    const [imageFiles, setImageFiles] = useState([]);

    // 수정할 데이터 가져오기
    useEffect(() => {
        axios.get(
            `http://localhost:8080/api/tried/detail/${triedIdx}`)
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            .then(response => {
                console.log(response.data);
                // 초기값 설정
                setTried(response.data);
                setUserId(response.data.userId);
                setTriedTitle(response.data.triedTitle);
                setTriedContent(response.data.triedContent);
                setTriedCreatedTime(response.data.triedCreatedTime);
                setFilename(response.data.triedImg);
            })
            .catch(error =>
                console.log(error));
    }, [triedIdx]);

    // 파일 선택 및 이미지 미리보기
    const handleFileSelect = (e) => {
        console.log(e.target.files[0]); // Check if the file is correctly selected
        const file = e.target.files[0];
        setFilename(file.name);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        setTriedImg([imageUrl]); // Ensure this line is updating the state correctly
    };

    // 버튼 => 파일(이미지) 수정
    const handlerUpdateImage = () => {
        fileInputRef.current.click();  // 파일 선택 input 요소를 클릭하여 이미지 선택 창 열기
    }

    // 제목 수정
    const handlerTitleChange = (e) => {
        setTriedTitle(e.target.value);
    };

    // 내용 수정
    const handlerContentChange = (e) => {
        setTriedContent(e.target.value);
    };

    // 버튼 => 목록 페이지로 이동
    const handlerClickList = () => {
        console.log(navigate);
        navigate('/tried');
    };

    // formData를 저장할 상태 변수 설정 => 변수 이름 : 값
    let datas = {
        triedTitle: triedTitle,
        triedContent: triedContent,
        triedImg: triedImg
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

    // Multipart/formData 형식으로 서버로 전달
    const handlerSubmit = (e) => {
        // console.log(datas);
        // console.log(formData);
        e.preventDefault();
        if (window.confirm("글을 작성하시겠습니까?")) {
            axios.put(`http://localhost:8080/reupload/${triedIdx}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                    // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                })
                .then(response => {
                    console.log(response)
                    console.log('왜 안되지 타이틀', response.data.triedTitle)
                    console.log('왜 안되지 이미지', response.data.triedImg)
                    alert('수정 완료')
                    navigate(`/tried/detail/${triedIdx}`)
                })
                .catch(error => {
                    console.log(error)
                    alert(error.message)
                })
        };
    };

    return (
        <>
            <div className="triedDetail-container">
                <form  onSubmit={handlerSubmit} action="" method="POST" id="frm" name="frm">
                <h2>게시판 수정</h2>
                    <div type="text" name="userId" > 작성자: {tried.userId} </div>
                    <div type="date" name="triedCreatedTime"> 작성일 : {tried.triedCreatedTime}</div>
                    <div>
                        <div> 제목  </div>
                        <input type="text" name="triedTitle" value={triedTitle || ''}
                            onChange={handlerTitleChange} />
                    </div>
                    <div className="update-img" style={{ width: '500px' }}>
                        <input
                            type="file"
                            name="triedImg"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />
                        {imageUrl && (
                            <img src={imageUrl} style={{ width: '500px' }} alt="이미지" />
                        )}
                        <button type="button" onClick={handlerUpdateImage}>
                            이미지 수정
                        </button>
                    </div>
                    <div>
                        <div> 내용 </div>
                        <input type="text" name="triedContent" value={triedContent || ''}
                            onChange={handlerContentChange} />
                        {/* <input type="button" id="update" className="btn" value="완료"
                            onClick={handlerClickUpdate} /> */}
                    </div>
                <input type="button" id="list" className="btn" value="목록"
                    onClick={handlerClickList} />
                <input type="submit" id="update" className="btn" value="완료" />
                    </form>
            </div>
        </>
    );
};

export default TriedUpdate;


    // // // 파일(이미지) 선택 input 변경 시 호출되는 함수
    // const handlerChangeFile = (e) => {
    //     handlerFileSelect(e);
    // };

            // if (fileInputRef.current.files[0]) {
        //     formData.append("triedImg", fileInputRef.current.files[0]);
        // }

        
    // // // 파일(이미지) 선택
    // const handlerFileSelect = (e) => {
    //     const file = e.target.files[0];
    //     setFilename(file.name);
    //     const imageUrl = URL.createObjectURL(file);
    //     setImageUrl(imageUrl);
    //     ;
    // }

        // const handlerChangeFile = (e) => {
    //     const name = e.target.name;
    //     const file = e.target.file;

    //     if (e.target.name == 'triedImg') {
    //         const imageArr = e.target.file;
    //         let imageURLs = [];
    //         let image;
    //         let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;
    //         for (let i = 0; i < imagesLength; i++) {
    //             image = imageArr[i];

    //             // 이미지 미리보기
    //             const reader = new FileReader();
    //             reader.onload = () => {
    //                 console.log(reader.result);
    //                 imageURLs[i] = reader.result;
    //                 setTriedImg([...imageURLs]);
    //             };
    //             reader.readAsDataURL(image);
    //         }
    //     }
    //     if (e.target.name == 'triedImg') {
    //         const imageArr = e.target.files;
    //         let imageURLs = [];
    //         let image;
    //         let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

    //         for (let i = 0; i < imagesLength; i++) {
    //             image = imageArr[i];

    //             const reader = new FileReader();
    //             reader.onload = () => {
    //                 console.log(reader.result);
    //                 imageURLs[i] = reader.result;
    //                 setTriedImg([...imageURLs]);
    //             };
    //             reader.readAsDataURL(image);
    //         }
    //     }
    //     const unchangedImageFiles = imageFiles.filter(file => file.name !== name)
    //     setImageFiles([...unchangedImageFiles, { name, file }]);
    // };


      // const changeImageFiles = (data, type) => {
    //     console.log(data, type);
    //     const newImageFiles = [...imageFiles];

    //     if (type === 'tried')
    //         newImageFiles[0] = data
    //     setImageFiles(newImageFiles);
    // };

    //   // 이미지 수정 및 미리보기 리셋
    //   const handleUpdateImage = () => {
    //     setFilename('');
    //     setImageUrl('');
    //     fileInputRef.current.click();
    // };

    

    // // 파일(이미지) 수정 버튼 클릭 및 저장 요청
    // const handlerClickUpdate = () => {
    //     // 서버로 전송할 FormData 객체 생성
    //     const formData = new FormData();
    //     formData.append('triedTitle', triedTitle);
    //     formData.append('triedImg', fileInputRef.current.files[0]);

    //     axios.put(`http://localhost:8080/api/tried/${triedIdx}`,
    //         { "triedTitle": triedTitle, "triedContent": triedContent },
    //         // { headers: { 'Authorization': `Bearer ${sessionStor
    //     ).then(response => {
    //         console.log(response);
    //         alert('수정 완료');
    //         navigate(`/tried/detail/${triedIdx}`);
    //     })
    //         .catch(error => {
    //             console.log(error);
    //             alert(`수정 실패 (${error.response.data.message})`);
    //         });
    // };

    
    // 파일(이미지) 호출
    // useEffect(() => {
    //     if (filename) {
    //         const imageUrl = `http://localhost:8080/api/getImage/${filename}`;
    //         axios.get(imageUrl, { responseType: 'arraybuffer' })
    //             .then(response => {
    //                 const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
    //                 const imageUrl = URL.createObjectURL(imageBlob);
    //                 setImageUrl(imageUrl);
    //                 console.log(imageUrl);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }, [filename]);

    
// 수정
// const handlerClickUpdate = () => {
//     if (window.confirm('수정하시겠습니까?')) {
//         axios.put(`http://localhost:8080/api/tried/reupload/${triedIdx}`,
//             // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
//             { "triedTitle": triedTitle, "triedContent": triedContent })
//             .then(response => {
//                 console.log(response);
//                 if (response.data === 1) {
//                     alert('수정 완료');
//                     navigate(`/tried/detail/${triedIdx}`)
//                 } else {
//                     alert(`수정 실패 : (${response.message})`);
//                     return;
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 alert(`수정 실패 : (${error.message})`);
//                 return;
//             });
//     };
// };