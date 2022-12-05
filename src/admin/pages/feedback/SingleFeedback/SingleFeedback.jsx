import styles from './Single.module.scss';
import classNames from 'classnames/bind';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';

function SingleFeedback() {
    const cx = classNames.bind(styles);
    const { id } = useParams();

    const [feedback, setFeedback] = useState();

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/tttn_be/public/api/feedback/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                },
            )
            .then(function (response) {
                setFeedback(response.data.feedback);
                console.log(feedback);
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }, [id]);

    return (
        <div className={cx('single')}>
            <div className={cx('singleContainer')}>
                <div className={cx('top')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>Chi tiết phản hồi</h1>

                        <div className={cx('item')} key={feedback?.id}>
                            <div className={cx('details')}>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Email:</span>
                                    <span className={cx('itemValue')}>{feedback?.email}</span>
                                </div>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Nội dung:</span>
                                    <span className={cx('itemValue')}>{feedback?.content}</span>
                                </div>
                                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Ngày gửi:</span>
                                    <span className={cx('itemValue')}>
                                        {moment(feedback?.created_at).format('DD/MM/YYYY HH:mm:ss')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleFeedback;