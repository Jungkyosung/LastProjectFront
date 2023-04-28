import axios from "axios";
import jwtDecode from "jwt-decode";


const Footer = () => {

    //[번역핸들러]
    const handlerTranslate = ()=> {
        const token = sessionStorage.getItem('token');
        const tempText = 'hello, I like kimchi, hi 승요';

        axios.get(`http://localhost:8080/translate/${tempText}`,
            {
                headers : { 'Authorization' : `Bearer ${token}`}
            })
        .then((response)=> {
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    };

    return (
        <>
            <div>
                <ul>
                    <li>개인정보처리방침</li>
                    <li>찾아오시는길</li>
                    <li>사이트맵</li>
                </ul>
                <div>서울 종로구 인사동길 12 대일빌딩 7층, 15층 Tel 02-723-0008</div>
                <div>COPYRIGHT@ 프로젝트.ALL RIGHTS RESERVED</div>
                <button type="button" onClick={handlerTranslate}>번역버튼</button>
            </div>
        </>
    )
}

export default Footer;