import axios from "axios";
import React, { useRef, useState } from "react";

const TriedUpload = ({ triedImg, setTriedImg }) => {

    const inputFiles = useRef();

    const MAX_FILE_SIZE = 1 * 1024 * 1024    // 1MB
    const MAX_FILE_COUNT = 1;

    const invalidFile = msg => {
        alert(msg);
        inputFiles.current.value = '';
        setTriedImg([]);
    };

    const [imageFiles, setImageFiles] = useState([]);

    const handleChangeFile = e => {
        const files = e.target.files;

        if (files.length > MAX_FILE_COUNT) {
            invalidFile("이미지는 1개만 등록 가능합니다.");
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image/.*")) {
                invalidFile("이미지 파일만 업로드 가능합니다.");
                return;
            } else if (files[i].size > MAX_FILE_SIZE) {
                invalidFile("이미지 크기는 1MB를 초과할 수 없습니다.");
                return;
            }
        }
        setImageFiles([...files]);

        let datas = {
            userId, 
          };
        

        const formData = new FormData();
        formData.append(
            'data',
            new Blob([JSON.stringify(datas)], { type: 'application/json' })
        );
        Object.values(imageFiles).forEach(file => formData.append('files', file));

        const handlerUploadDataWithFile = () => {
            axios({
                method: 'POST',
                url: `http://localhost:8080/api/tried`,
                headers: { 'Content-Type': 'multipart/form-data;' },
                data: formData
            })
                .then(response => {
                    console.log(response.data);
                    alert(`${response.data}\n정상적으로 업로드했습니다.`);
                })
                .catch(error => {
                    console.log(error);
                    alert(`업로드 중 오류가 발생했습니다.`);
                });
        };
    }

    return (
        <>
            <div>
                <input
                    type="file" name="img" ref={inputFiles} accept="image/*"
                    onChange={handleChangeFile}
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