import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

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
        axios.get(`http://localhost:8080/api/listidealreal/detail/${idealrealIdx}`,
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
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
        axios.put(`http://localhost:8080/api/listidealreal/${idealrealIdx}`,  // 요청 URL
            { "idealrealTitle": idealrealTitle, "idealrealContent": idealrealContent },
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )           // 요청 본문을 통해서 서버로 전달할 값
            .then(response => {                                         // 200번대 응답코드가 반환되는 경우
                console.log(response);
                alert("오 수정")
                navigate('/listidealreal')
            })
            .catch(error => {                                           // 200번대를 제외한 응답코드가 반환되는 경우
                console.log(error);
                alert(`정수 오 (${error.response.data.message})`);
                return;
            });
    };
    const handlerChange = (e) => {
        setIdealrealTitle(e.target.value)
    }
    const handlercontents = (e) => {
        setIdealrealContent(e.target.value)
    }
    const sytles = {
        display: 'flex',
        flexDirection: 'comlum',
        width: '1200px',
        margin: '0 auto',
        position: 'relative',
        marginLeft: '5',
        border: '1px solid aqua',
    }



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
            url: `http://localhost:8080/reupload/${idealrealIdx}`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        })
            .then(response => {
                console.log("xxxxxxxxxxxxx")
                console.log(response)
                alert(`${response.data}\n오 수정`)
                navigate('/listidealreal')
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

    const idealImg = `http://localhost:8080/api/getimage/${idealrealIdealImg}`;
    const realImg = `http://localhost:8080/api/getimage/${idealrealRealImg}`;


    return (
        <>
            <div style={sytles}>
                {/* <h2>리뷰 상세</h2> */}
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


            </div>
        </>
    )
}

export default IdealrealRetouch;