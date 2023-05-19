import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material"; //추가
import styles from './MainMenu.module.css';
import LanguageIcon from '@mui/icons-material/Language';    //추가
import SearchIcon from '@mui/icons-material/Search';    //추가
import DetailMenu1 from "./DetailMenu1";
import DetailMenu2 from "./DetailMenu2";
import DetailMenu3 from "./DetailMenu3";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 


const MainMenu = () => {

    const [lang, setLang] = useState('');
    
    const handleChange = (event) => {
      setLang(event.target.value);
    };
    
    return (
        <div className={styles.header}>
            <div></div>
            <div className={styles.logo}>
                <Link to="/">
                    <img src="https://via.placeholder.com/150x60" alt="샘플이미지"></img>
                </Link>
            </div>
            <nav className={styles.dropmenu}>
                <ul>
                    <li ><Link to="/" className={styles.main}>ABOUT_US</Link></li>
                    <li ><Link to="/" className={styles.main}>지금 한국은</Link>
                        <ul>
                            <li className={styles.sub}><DetailMenu1 /></li>
                            {/* <li ><Link to="/" className={styles.sub}>패션</Link></li>
                            {/* <li ><Link to="/" className={styles.sub}>음식</Link></li>
                            <li ><Link to="/" className={styles.sub}>문화</Link></li> */}
                        </ul>
                    </li>
                    <li ><Link to="/" className={styles.main}>여행정보</Link>
                        <ul>
                            <li className={styles.sub}><DetailMenu2 /></li>
                            {/* <li ><Link to="/" className={styles.sub}>날씨</Link></li>
                            <li ><Link to="/" className={styles.sub}>여행코스</Link></li>
                            <li ><Link to="/" className={styles.sub}>카드뉴스</Link></li> */}
                        </ul>
                    </li>
                    <li ><Link to="/" className={styles.main}>커뮤니티</Link>
                        <ul>
                            <li className={styles.sub}><DetailMenu3 /></li>
                            {/* <li ><Link to="/" className={styles.sub}>글로벌 채팅</Link></li>
                            <li ><Link to="/" className={styles.sub}>웹 만화</Link></li>
                            <li ><Link to="/" className={styles.sub}>어디까지</Link></li>
                            <li ><Link to="/" className={styles.sub}>여행 친구</Link></li>
                            <li ><Link to="/" className={styles.sub}>이상과 현실</Link></li>
                            <li><Link to="/"  className={styles.sub}>물가 체험</Link></li> */}
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className={styles.language}>
                <LanguageIcon style={{ fontSize: "30px" }} />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Korea</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={lang}
                        onChange={handleChange}
                        label="lang"
                    >
                        <MenuItem value={15}>
                            <em>Kor</em>
                        </MenuItem>
                        <MenuItem value={10}>Eng</MenuItem>
                        <MenuItem value={20}>Jap</MenuItem>
                        {/* <MenuItem value={30}></MenuItem> */}
                    </Select>
                </FormControl>
            </div>
            <div></div>
        </div>
    )
}

export default MainMenu;