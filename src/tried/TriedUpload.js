import axios from "axios";
import { useRef } from "react";

const TriedUpload = ({ triedImg, setTriedImg }) => {
    // 파일 선택창 값 직접 제어하기 위해 ref 객체 변수 정의
    const inputFiles = useRef();

    // 제어할 파일 크기와 개수
    const MAX_FILE_COUNT = 1 * 1024 * 1024;  // 1MB
    const MAX_FILE_SIZE = 3;

    // 파일의 종류, 크기, 개수 제한을 만족하지 않는 경우,
    // 메세지 보여주고 파일 입력창 값 초기화
    const invalidFile = msg => {
        alert(msg);
        inputFiles.current.values = '';
        setTriedImg([]);
    };

    const handleChangeFile = e => {
        const name = e.target.name;
        const files = e.target.files;
        const formData = new FormData();

        if (files.length > MAX_FILE_COUNT) {
            invalidFile("이미지는 최대 3개 가능합니다");
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image/.*")) {
                invalidFile("이밈지 파일만 업로드 가능합니다.");
                return;
            } else if (files[i].size > MAX_FILE_SIZE) {
                invalidFile("이미지 크기는 1MB를 초과할 수 없습니다.");
                return;
            }
            formData.append(name, files[i]);
        }
        setTriedImg([ name, files ]);
    };
   
    // 설정한 폼 데이터를 multipart/form-data 형식으로 서버 전달
    const handlerUploadDataWithFile = () => {
        const formData = new FormData();
        Object.values(triedImg).forEach(
            fio => Object.values(fio.files).forEach(f => formData.append(fio.name, f))
        );
        axios({
            method: 'POST',
            url: `http://localhost:8080/api/tried/upload`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        })
            .then(response => {
                response.data.split('\n')
                .forEach(d => console.log(d));
                alert(`${response.data}\n 업로드 완료`);
            })
            .catch(error => {
                console.log(error);
                alert(`업로드 오류`);
            });
    };

    return (
        <>
            <div>
                <input
                    type="file"
                    name="img"
                    ref={triedImg}
                    onChange={handleChangeFile}
                    accept="img/*"
                />
            </div>
            <div>
                <button
                    type="btn"
                    onClick={handlerUploadDataWithFile}>
                    업로드
                </button>
            </div>
        </>
    );
};
export default TriedUpload;