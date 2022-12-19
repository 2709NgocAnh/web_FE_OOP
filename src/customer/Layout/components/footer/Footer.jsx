import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import config from '~/components/config';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <>
            <div className={cx('header')}>
                <FontAwesomeIcon className={cx('header-icon')} icon={faPhone} />
                <div className={cx('header-title')}>
                    <span>Hỗ trợ/ Mua hàng:</span>
                    <a href="tel:0343803696">0343803696</a>
                </div>
            </div>
            <div className={cx('container-fluid')}>
                <div className={cx('row')}>
                    <div className={cx('col-xs-12 col-sm-6 col-md-4 col-lg')}>
                        <div className={cx('footer-col footer-content1')}>
                            <h4 className={cx('footer-title')}>Giới thiệu</h4>
                            <div className={cx('footer-content')}>
                                <div className={cx('logo-footer')}>
                                    <a href="/" target="_blank" rel="nofollow noreferrer">
                                        <img
                                            src="https://file.hstatic.net/1000300454/file/logo_bct_019590229b4c4dfda690236b67f7aff4.png"
                                            alt="Bộ Công Thương"
                                        />
                                    </a>
                                    <div className={cx('footer-content-title')}>
                                        <ul>Chi Nhánh Hồ Chí Minh</ul>

                                        <li className={cx('footer-content-item')}>
                                            - Quận 10 - 561 Sư Vạn Hạnh, Phường 13.
                                        </li>
                                        <li className={cx('footer-content-item')}>
                                            - Quận Tân Bình - 136 Nguyễn Hồng Đào, Phường 14. Quận 1
                                        </li>

                                        <li className={cx('footer-content-item')}>
                                            - Central Market 4 Phạm Ngũ Lão, Phường Phạm Ngũ Lão.
                                        </li>
                                        <li className={cx('footer-content-item')}>
                                            - Quận Gò Vấp - 41 Quang Trung, Phường 3.
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('col-xs-12 col-sm-6 col-md-2 col-lg')}>
                        <div className={cx('footer-col footer-block')}>
                            <h4 className={cx('footer-title')}>Liên kết</h4>
                            <div className={cx('footer-content toggle-footer')}>
                                <ul className="tree-menu">
                                    <li className="active">
                                        <span></span>
                                        <NavLink
                                            className={(nav) => cx('item', (nav) => ({ active: nav.isActive }))}
                                            to={config.routes.about}
                                        >
                                            Giới thiệu
                                        </NavLink>
                                    </li>

                                    <li className="">
                                        <span></span>
                                        <NavLink
                                            className={(nav) => cx('item', (nav) => ({ active: nav.isActive }))}
                                            to={config.routes.returnPolicy}
                                        >
                                            Chính sách đổi trả
                                        </NavLink>
                                    </li>

                                    <li className="">
                                        <span></span>
                                        <NavLink
                                            className={(nav) => cx('item', (nav) => ({ active: nav.isActive }))}
                                            to={config.routes.privacyPolicy}
                                        >
                                            Chính sách bảo mật
                                        </NavLink>
                                    </li>

                                    <li className="">
                                        <span></span>
                                        <NavLink
                                            className={(nav) => cx('item', (nav) => ({ active: nav.isActive }))}
                                            to={config.routes.termsService}
                                        >
                                            Điều khoản dịch vụ
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={cx('col-xs-12 col-sm-6 col-md-3 col-lg')}>
                        <div className={cx('footer-col')}>
                            <h4 className={cx('footer-title')}>Thông tin liên hệ</h4>
                            <div className={cx('footer-content footer-contact')}>
                                <ul>
                                    <li className={cx('contact-1')}>TP.HCM</li>
                                    <li className={cx('contact-2')}>
                                        <a href="tel:0343803696">0343803696</a>
                                    </li>
                                    <li className={cx('contact-3')}>coming soon</li>
                                    <li className={cx('contact-4')}>
                                        <a href="mailto:phanthingocanh2001.ptna@gmail.com">
                                            phanthingocanh2001.ptna@gmail.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* <div className={cx('col-xs-12 col-sm-6 col-md-3 col-lg')}>
                        <div className={cx('footer-col')}>
                            <h4 className={cx('footer-title')}>Fanpage</h4>
                            <div className={cx('footer-content footer-contact')}>
                                <div className={cx('footer-static-content')}>
                                    <div
                                        className={cx('fb-page fb_iframe_widget')}
                                        data-href="https://www.facebook.com/profile.php?id=100028613112511"
                                    >
                                        <span>
                                            <iframe
                                                name="f2f3cf4bebfefb8"
                                                width="200px"
                                                height="150px"
                                                scrolling="no" 
                                                style={{overflow: 'hidden'}}
                                                allowfullscreen
                                                title="fb:page Facebook Social Plugin"
                                                src="https://www.vascara.com/"
                                            ></iframe>
                                          
                                        </span>
                                    </div>
                                </div>
                                <div style={{ clear: 'both' }}></div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Footer;