import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.scss";

function Sidebar(props) {
  const cx = classNames.bind(styles);

  return (
    <div>
      {" "}
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
                  <NavLink
                    className={(nav) => ({ active: nav.isActive })}
                    to='/contact'
                  >
                    Thông tin cửa hàng
                  </NavLink>
                </li>

                <li className="">
                  <span></span>
                  <NavLink
                    className={(nav) => ({ active: nav.isActive })}
                    to='/feedback'
                  >
                    Góp ý khách hàng
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

Sidebar.propTypes = {};

export default Sidebar;
