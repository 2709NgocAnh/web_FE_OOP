import styles from './Single.module.scss';
import classNames from 'classnames/bind';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';

function SingleUser() {
    const cx = classNames.bind(styles);
    const { id } = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/tttn_be/public/api/user/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })

            .then((response) => {
                setUser(response.data.user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    return (
        <div className={cx('single')}>
            <div className={cx('singleContainer')}>
                <div className={cx('top')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>Thông tin tài khoản</h1>

                        <div className={cx('item')} key={user?.id}>
                            <NavLink
                                className={(nav) => cx({ active: nav.isActive })}
                                to={`/Users/EditUser/${user?.id}`}
                            >
                                <div className={cx('editButton')}>Edit</div>
                            </NavLink>
                            <img src={user?.avatar} alt="Ảnh đại diện" className={cx('itemImg')} />

                            <div className={cx('details')}>
                                <h1 className={cx('title')}>{user?.name}</h1>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Loại tài khoản:</span>
                                    <span className={cx('itemValue')}>
                                        {user?.type_id === 1 ? 'Admin' : 'Khách hàng'}
                                    </span>
                                </div>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Email:</span>
                                    <span className={cx('itemValue')}>{user?.email}</span>
                                </div>
                                {/* <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Email:</span>
                                    <span className={cx('itemValue')}>{user?.email}</span>
                                </div> */}
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Số điện thoại:</span>
                                    <span className={cx('itemValue')}>{user?.phone}</span>
                                </div>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Địa chỉ:</span>
                                    <span className={cx('itemValue')}>{user?.address}</span>
                                </div>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Ngày tạo:</span>
                                    <span className={cx('itemValue')}>
                                        {moment(user?.created_at).format('DD/MM/YYYY HH:mm')}
                                    </span>
                                </div>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Ngày chỉnh sửa:</span>
                                    <span className={cx('itemValue')}>
                                        {moment(user?.updated_at).format('DD/MM/YYYY HH:mm')}
                                    </span>
                                </div>
                                {/* {user?.created_by && (
                                    <div className={cx('detailItem')}>
                                        <span className={cx('itemKey')}>Người tạo:</span>
                                        <span className={cx('itemValue')}>{user?.created_by}</span>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleUser;