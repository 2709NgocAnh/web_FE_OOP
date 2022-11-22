import classNames from 'classnames/bind';
import TabTitle from '~/components/tabtiltle/TabTiltle';
import Header from '~/customer/Layout/components/header/Header';
import styles from './About.module.scss';
import LinkAbout from './component/linkabout/LinkAbout';

function PrivacyPolicy() {
  const cx = classNames.bind(styles);
    TabTitle('chinh-sach-bao-mat');
    return (
        <>
        <Header/>
        <div className={cx("pageAbout-us page-layout")}>
            <div className={cx("wrapper-row pd-page")}>
                <div className={cx("container-fluid")}>
                    <div className={cx("row")}>
                        <div className={cx("col-md-3 col-sm-12 col-xs-12")}>
                            <LinkAbout/>
                        </div>
                        <div className={cx("col-md-9 col-sm-12 col-xs-12")}>
                            <div className={cx("page-wrapper")}>
                                <div className={cx("heading-page")}>
                                    <h1>Chính sách bảo mật</h1>
                                </div>
                                <div className={cx("wrapbox-content-page")}>
                                    <div className={cx("content-page ")}>
                                        <p>
                                            Chính sách bảo mật này nhằm giúp Quý khách hiểu về cách website thu thập và
                                            sử dụng thông tin cá nhân của mình thông qua việc sử dụng trang web, bao gồm
                                            mọi thông tin có thể cung cấp thông qua trang web khi Quý khách đăng ký tài
                                            khoản, đăng ký nhận thông tin liên lạc từ chúng tôi, hoặc khi Quý khách mua
                                            sản phẩm, dịch vụ, yêu cầu thêm thông tin dịch vụ từ chúng tôi.
                                        </p>
                                        <p>
                                            Chúng tôi sử dụng thông tin cá nhân của Quý khách để liên lạc khi cần thiết
                                            liên quan đến việc Quý khách sử dụng website của chúng tôi, để trả lời các
                                            câu hỏi hoặc gửi tài liệu và thông tin Quý khách yêu cầu.
                                        </p>
                                        <p>
                                            <span className={cx("wysiwyg-font-size-medium")}>
                                                Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các
                                                biện pháp tốt nhất để bảo vệ thông tin cũng như việc thanh toán của
                                                khách hàng.&nbsp;
                                            </span>
                                        </p>
                                        <p>
                                            <span className={cx("wysiwyg-font-size-medium")}>
                                                Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ
                                                quan pháp luật yêu cầu.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default PrivacyPolicy;