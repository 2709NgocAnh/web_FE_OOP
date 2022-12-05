import React from "react";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
export default function Category(props) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("category__list")}>
      <NavLink to={"/list"}>
        <h2>Tất cả sản phẩm </h2>
      </NavLink>
      {props.category.map((category) => {
        return (
          <li className={cx("active")} key={category._id}>
            <NavLink
              className={(nav) => ({
                active: nav.isActive,
              })}
              to={`/${category._id}`}
            >
              <span>{category.name}</span>
            </NavLink>
          </li>
        );
      })}
    </div>
  );
}
