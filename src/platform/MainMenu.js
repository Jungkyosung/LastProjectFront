import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material"; //추가
import styles from './MainMenu.module.css';
import LanguageIcon from '@mui/icons-material/Language';    //추가
import SearchIcon from '@mui/icons-material/Search';    //추가
import $ from 'jquery';

const MainMenu = () => {

    useEffect(() => {
        $(document).ready(function () {
            var gnb = $('.gnb');

            // 마우스 over 시
            gnb.mouseenter(function () {
                $('.inner_menu').show();
                // menu bg
                var menuHeight = $('.header').outerHeight();
                var inmeHegiht = $('.inner_menu').outerHeight();
                $('.hd_bg').css({
                    'top': menuHeight + 'px',
                    height: inmeHegiht + 'px'
                });
            });

            // 마우스  leave 시
            gnb.mouseleave(function () {
                $('.inner_menu').hide();
                $('.hd_bg').css('height', '0')

            });

            //dept2 hover시 dept1 active
            $('.dept1').mouseenter(function () {
                $(this).children().addClass('active');
                $(this).siblings().children().removeClass('active')
            });
            $('.dept1').mouseleave(function () {
                $(this).children().removeClass('active');
            });


        });
    }, []);



    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>
                <Link to="/">LOGO</Link>
            </h1>
            <ul className={styles.gnb}>
                <li className={styles.dept1}>
                    <Link to="/">메뉴</Link>
                    <ul className={styles.inner_menu}>
                        <li className={styles.dept2}>
                            <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.dept1}>
                    <Link to="/">메뉴</Link>
                    <ul className={styles.innermenu}>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.dept1}>
                    <Link to="/">메뉴</Link>
                    <ul className={styles.innermenu}>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.dept1}>
                    <Link to="/">메뉴</Link>
                    <ul className={styles.innermenu}>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.dept1}>
                    <Link to="/">메뉴</Link>
                    <ul className={styles.innermenu}>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                        <li className={styles.dept2}>
                           <Link to="/">메뉴2</Link>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className={styles.hd_bg}></div>

        </div>
    )
}

export default MainMenu;