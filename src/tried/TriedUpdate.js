import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const TriedUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { imgUrl } = location.state;
    console.log('이미지', imgUrl);

    const { triedIdx } = useParams();

    const [userId, setUserId] = useState('');
    const [tried, setTried] = useState({});
    const [triedTitle, setTriedTitle] = useState('');
    const [triedContent, setTriedContent] = useState('');
    const [triedImg, setTriedImg] = useState([]);
    const [triedCreatedTime, setTriedCreatedTime] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [filename, setFilename] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]); //1 
    const [imageUrl, setImageUrl] = useState('');

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

    // 제목 수정
    const handlerTitleChange = (e) => {
        setTriedTitle(e.target.value);
    };

    // 내용 수정
    const handlerContentChange = (e) => {
        setTriedContent(e.target.value);
    };

    // 리스트 페이지로 이동
    const handlerClickList = () => {
        console.log(navigate);
        navigate('/tried');
    };

    // const handlerClickUpdate = () => {
    //     navigate(`/tried/update/${triedIdx}`, 
    //     { state: { imgUrl: tried.triedImg } });
    // };

    // 이미지 가져오기
    useEffect(() => {
        if (triedImg) {
          const imageUrl = `http://localhost:8080/api/getImage/${triedImg}`;
          axios.get(imageUrl, { responseType: 'arraybuffer' })
            .then(response => {
              const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
              const imageUrl = URL.createObjectURL(imageBlob);
              setImageUrl(imageUrl);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, [triedImg]);

    // 이미지 수정 
    const handleFileChange = (e) => {
        const files = e.target.files;
        // setSelectedFiles([...selectedFiles, ...files]);
        // setSelectedFiles([...triedImg, ...files]);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
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

    Object.values(imageFiles).forEach((files) => {
        files.forEach((file) => {
            formData.append('triedImg', file);
        });
    });
    triedImg.forEach((img) => {
        formData.append('triedImg', img);
    });

    // Multipart/formData 형식으로 서버로 전달
    const handlerSubmit = (e) => {
        // console.log(datas);
        // console.log(formData);
        e.preventDefault();
        if (window.confirm("글을 작성하시겠습니까?")) {
            const formData = new FormData(); // 새로운 FormData 인스턴스를 생성

            // 업데이트된 tried 데이터를 formData에 추가
            formData.append('triedTitle', triedTitle);
            formData.append('triedContent', triedContent);
            // if (selectedFiles) {    // 2
            //     formData.append('triedImg', selectedFiles);
            // }

            if (selectedFiles.length > 0) {
                // 새로운 이미지 파일을 전송
                selectedFiles.forEach((file) => {
                    formData.append('triedImg', file);
                });
            } else {
                // 이미지 변경이 없을 경우 기존의 이미지 파일을 전송
                formData.append('triedImg', triedImg);
            }
            axios.put(`http://localhost:8080/reupload/${triedIdx}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                    // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                })
                .then(response => {
                    console.log(response)
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
                <form onSubmit={handlerSubmit} action="" method="POST" id="frm" name="frm">
                    <h2>게시판 수정</h2>
                    <div value={triedIdx}>글번호: {tried.triedIdx}</div>
                    <div value={userId}>작성자: {tried.userId}</div>
                    <div value={triedCreatedTime}>작성일: {tried.triedCreatedTime}</div>
                    <div>
                        <div> 제목 </div>
                        <input type="text" name="triedTitle" value={triedTitle || ''}
                            onChange={handlerTitleChange} />
                    </div>
                    <div className="update-img">
                        {/* <img src={imgUrl} style={{ width: '500px' }} /> */}
                        {imageUrl && <img src={imageUrl} style={{ width: '500px' }} />}
                    </div>
                    <div className="update-img">
                        {selectedFiles.map((file, index) => (
                            <img key={index}
                                src={URL.createObjectURL(file)}
                                style={{ width: '500px' }} />
                        ))}
                        <input type="file" multiple onChange={handleFileChange} />
                    </div>
                    <div>
                        <div> 내용 </div>
                        <input type="btn" name="triedContent" value={triedContent || ''}
                            onChange={handlerContentChange} />
                    </div>
                    <input type="button" id="list" className="btn" value="목록"
                        onClick={handlerClickList} />
                    <input type="submit" id="update" className="btn" value="수정" />
                </form>
            </div>
        </>
    );
};

export default TriedUpdate;