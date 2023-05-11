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

    const [lang, setLang] = useState(15);
    
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
                        </ul>
                    </li>
                    <li ><Link to="/" className={styles.main}>여행정보</Link>
                        <ul>
                            <li className={styles.sub}><DetailMenu2 /></li>
                        </ul>
                    </li>
                    <li ><Link to="/" className={styles.main}>커뮤니티</Link>
                        <ul>
                            <li className={styles.sub}><DetailMenu3 /></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className={styles.language}>
                <LanguageIcon style={{ fontSize: "30px" }} />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={lang}
                        defaultValue={15}
                        onChange={handleChange}
                        label="lang"
                    >
                        <MenuItem value={15}>
                            <em>Kor</em>
                        </MenuItem>
                        <MenuItem value={10}>Eng</MenuItem>
                        <MenuItem value={20}>Jap</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div></div>
        </div>
    )
}

export default MainMenu;