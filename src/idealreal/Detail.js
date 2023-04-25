import { useEffect, useState } from 'react';
import axios from 'axios';

function Detail({ boardIdx }) {
    useEffect(() => { 
        axios.get(`http://localhost:8080/api/listRealShit/{idealrealIdx}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }, [])

    

    return (
        <>
            <div className="container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    
                    <input type="hidden" name="boardIdx" />
                
                    <table className="board_detail">
                        <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">글번호</th>
                                <td></td>
                                <th scope="row">조회수</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td></td>
                                <th scope="row">작성일</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <input type="text" id="title" name="title" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="view_text">
                                    <textarea title="내용" id="contents" name="contents"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                
                <input type="button" id="list"   className="btn" value="목록으로" />
                <input type="button" id="edit"   className="btn" value="수정하기" />
                <input type="button" id="delete" className="btn" value="삭제하기" />
               
            </div>
        </>
    );
}

export default Detail;
