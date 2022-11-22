import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import * as productService from "~/admin/services/productService";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

/* const Pagination = ({ listpage, setCurrentpage, currentpage, totalpage }) => { */
const Pagination = ({totalPage,setProductList }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage ; i++) {
        pageNumbers.push(i);
      }
     const handleSubmit =(numberPage)=>{
        const fetchApi = async () => {
          const response = await productService.getProduct(numberPage);
          setProductList(response.products);
        };
        fetchApi();
      }
   
    return (
        <nav>
            <ul className={cx('pagination')}>
                {pageNumbers.map((number) => (
                    <li key={number} className={cx('page-item')}>
                        <NavLink onClick ={handleSubmit(number)} to={`/product?pageIndex=${number}`} className={cx('page-link')}>
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
    /*  return (
        <nav>
            <ul className={cx('pagination')}>
                {listpage?.map((page, index) => (
                    <li key={index} className={cx('page-item')}>
                        <a  href={`?page=${page}`}  className={cx('page-link')}>{page.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    ); */
};

export default Pagination;