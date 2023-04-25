import { useFilePicker } from "use-file-picker";
import React from "react";

export default function IdealButton() {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 50 // in megabytes
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  }

  return (
    <div>
      { filesContent.length === 0 && 
      <div style={{ width: 300, height: 300, background: 'aqua' }} onClick={() => openFileSelector()}>이상 등록</div>
      }
      {/* 사진을 등록하기전에 위 스타일이 먼저 나오도록 지정 후 퍼렁을 눌러 사진을 등록*/}

      {filesContent.map((file, index) => (
        <div key={index} onClick={() => openFileSelector()}>
         {/* 사진을 올렸지만 변경할때 다시 클릭하면 파일선택이 나오도록 지정 */}
         
          <img  style={{ width: 300, height: 400 }} alt={file.name} src={file.content}></img>
          {/* 사진을 등록후 사진 크기를 지정하는 코드 */}
        </div>
      ))}
    </div>
  );
}
