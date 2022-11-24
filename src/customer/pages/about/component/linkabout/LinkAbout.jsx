import React from "react";
import classNames from "classnames/bind";
import styles from "./LinkAbout.module.scss";
import { NavLink } from "react-router-dom";
import config from "~/components/config";

export default function LinkAbout() {
  const cx = classNames.bind(styles);

  return (
    <div>
      <div className={cx("sidebar-page")}>
        <div className={cx("group-menu")}>
          <div className={cx("page_menu_title title_block")}>
            <h2>Danh mục trang</h2>
          </div>
          <div className={cx("layered layered-category")}>
            <div className={cx("layered-content")}>
              <ul className={cx("tree-menu")}>
                <li className={cx("active")}>
                  <span></span>
                  <NavLink to={config.routes.about}>Giới thiệu</NavLink>
                </li>

                <li className={cx("")}>
                  <span></span>
                  <NavLink to={config.routes.returnPolicy}>
                    Chính sách đổi trả
                  </NavLink>
                </li>

                <li className={cx("")}>
                  <span></span>
                  <NavLink to={config.routes.privacyPolicy}>
                    Chính sách bảo mật
                  </NavLink>
                </li>

                <li className={cx("")}>
                  <span></span>
                  <NavLink
                    className={(nav) => cx({ active: nav.isActive })}
                    to={config.routes.termsService}
                  >
                    Điều khoản dịch vụ
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
