import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = ({  setNumberPage,totalPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage ; i++) {
        pageNumbers.push(i);
      }
   
    return (
        <nav>
            <ul className={cx('pagination')}>
                {pageNumbers.map((number) => (
                    <li key={number} className={cx('page-item')}>
                        <NavLink onClick ={()=>setNumberPage(number)} to={`?pageIndex=${number}`} className={cx('page-link')}>
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
    
};

export default Pagination;