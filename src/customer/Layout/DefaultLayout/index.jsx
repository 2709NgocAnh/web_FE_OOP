import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;