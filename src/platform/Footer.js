import styles from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <ul className={styles.footerContainer}>
                    <li>개인정보처리방침</li>
                    <li>찾아오시는길</li>
                    <li>사이트맵</li>
                </ul>
                <div>서울 종로구 인사동길 12 대일빌딩 7층, 15층 Tel 02-723-0008</div>
                <div>COPYRIGHT@ 프로젝트.ALL RIGHTS RESERVED</div>
            </div>
        </>
    )
}

export default Footer;