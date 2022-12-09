
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './DefaultLayoutAdmin.module.scss';
import classNames from 'classnames/bind';

function DefaultLayoutAdmin({ children }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            {children}
            {/* <Navbar />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div> */}
        </div>
    );
}

export default DefaultLayoutAdmin;