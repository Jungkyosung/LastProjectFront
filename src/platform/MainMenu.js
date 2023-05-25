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
        <>
            {/* <div className={styles.header}>
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
                        <InputLabel className="demo-simple-select-standard-label">Korea</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            className="demo-simple-select-standard"
                            value={lang}
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
            </div> */}
            <div className={styles.wrapper}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <img src="https://via.placeholder.com/150x60" alt="샘플이미지"></img>
                        </Link>
                    </div>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__menu}>
                            <div><Link to ="/aboutus">ABOUT US</Link></div>
                        </li>
                        <li className={styles.menu__menu}>
                            <div>지금 한국은</div>
                            <div className={styles.subwrapper}>
                                <nav className={styles.subnav}>
                                    <ul className={styles.submenu__list}>
                                        <li className={styles.submenu__menu}><Link to="/koreaissue">한국이슈</Link></li>
                                        <li className={styles.submenu__menu}><Link to="/koreaprice">물가체험</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </li>
                        <li className={styles.menu__menu}>
                            <div>여행정보</div>
                            <div className={styles.subwrapper}>
                                <nav className={styles.subnav}>
                                    <ul className={styles.submenu__list}>
                                        <li className={styles.submenu__menu}><Link to="/weather">날씨</Link></li>
                                        <li className={styles.submenu__menu}><Link to="/course">여행코스</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </li>
                        <li className={styles.menu__menu}>
                            <div>커뮤니티</div>
                            <div className={styles.subwrapper}>
                                <nav className={styles.subnav}>
                                    <ul className={styles.submenu__list}>
                                        <li className={styles.submenu__menu}><Link to="/tried">어디까지</Link></li>
                                        <li className={styles.submenu__menu}><Link to="/accompany">여행친구</Link></li>
                                        <li className={styles.submenu__menu}><Link to="/idealreal">이상과현실</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.language}>
                        <LanguageIcon style={{ fontSize: "30px" }} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel className="demo-simple-select-standard-label">Korea</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                className="demo-simple-select-standard"
                                value={lang}
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
                </nav>
            </div>
        </>
    )
}

export default MainMenu;