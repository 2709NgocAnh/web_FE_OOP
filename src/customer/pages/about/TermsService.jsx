import classNames from 'classnames/bind';
import TabTitle from '~/components/tabtiltle/TabTiltle';
import Header from '~/customer/Layout/components/header/Header';
import styles from './About.module.scss';
import LinkAbout from './component/linkabout/LinkAbout';
function TermsService() {
    TabTitle('dieu-khoan-dich-vu');
  const cx = classNames.bind(styles);

    return (
        <>
        <Header/>
        <div className={cx("wrapper-row pd-page")}>
            <div className={cx("container-fluid")}>
                <div className={cx("row")}>
                    <div className={cx("col-md-3 col-sm-12 col-xs-12")}>
                       <LinkAbout/>
                    </div>
                    <div className={cx("col-md-9 col-sm-12 col-xs-12")}>
                        <div className={cx("page-wrapper")}>
                            <div className={cx("heading-page")}>
                                <h1>Điều khoản dịch vụ</h1>
                            </div>
                            <div className={cx("wrapbox-content-page")}>
                                <div className={cx("content-page ")}>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong>1. Giới thiệu</strong>
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            Chào mừng quý khách hàng đến với website chúng tôi.
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý
                                            khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa,
                                            thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào
                                            bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web
                                            mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web,
                                            sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách
                                            chấp nhận với những thay đổi đó.
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của
                                            chúng tôi.
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong>2. Hướng dẫn sử dụng website</strong>
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập
                                            dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo
                                            có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo
                                            quy định hiện hành của pháp luật Việt Nam.
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ
                                            website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng
                                            cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
                                        </span>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong></strong>
                                        </span>
                                        <span className={cx("wysiwyg-font-size-medium")}></span>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong></strong>
                                        </span>
                                        <span className={cx("wysiwyg-font-size-medium")}></span>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong></strong>
                                        </span>
                                        <span className={cx("wysiwyg-font-size-medium")}></span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}></span>
                                        <span className={cx("wysiwyg-font-size-medium")}></span>
                                        <br />
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong>3. Thanh toán an toàn và tiện lợi</strong>
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp
                                            dụng phương thức phù hợp:
                                        </span>
                                    </p>
                                    <p>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong>
                                                <u>Cách 1</u>
                                            </strong>
                                            : Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)
                                            <br />
                                        </span>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong>
                                                <u>Cách 2</u>
                                            </strong>
                                            <strong>:</strong>&nbsp;Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
                                            <br />
                                        </span>
                                        <span className={cx("wysiwyg-font-size-medium")}>
                                            <strong>
                                                <u>Cách 3</u>
                                            </strong>
                                            <strong>:</strong>&nbsp;Thanh toán online qua thẻ tín dụng, chuyển khoản
                                        </span>
                                    </p>
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
export default TermsService;