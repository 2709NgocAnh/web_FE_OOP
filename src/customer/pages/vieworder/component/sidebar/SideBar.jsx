import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";
export default function SideBar() {
  const cx = classNames.bind(styles);
  return (
    <div>
      <div className={cx("sidebar-page")}>
        <div className="group-menu">
          <div className="page_menu_title title_block">
            <h2>Danh mục trang</h2>
          </div>
          <div className="layered layered-category">
            <div className="layered-content">
              <ul className="tree-menu">
                <li className="active">
                  <span></span>
                  <NavLink to="/profile">Tài khoản của tôi</NavLink>
                </li>

                <li className="">
                  <span></span>
                  <NavLink to="/vieworder">Đơn hàng của tôi</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
