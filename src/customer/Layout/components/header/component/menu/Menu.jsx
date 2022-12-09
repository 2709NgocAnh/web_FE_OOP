import PropTypes from "prop-types";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import MenuItem from "../menuItem/MenuItem";
import Category from "../category/Category";
import { MENU_HEADER } from "~/constant/Menu";

const cx = classNames.bind(styles);
function Menu({handleSubmitCategory,handleSubmitAllProduct}) {
  //call API

  return (
    <div className={cx("menu-link")}>
      {MENU_HEADER.map((item, index) => {
        if (item.dropdown === true) {
          return (
            <li>
              <div className={cx("dropdown")} key={index}>
                <MenuItem title={item.title} to={item.to} />
                <div className={cx("dropdown-content")}>
                  <Category handleSubmitCategory={handleSubmitCategory} handleSubmitAllProduct={handleSubmitAllProduct}/>
                </div>
              </div>
            </li>
          );
        } else {
          return (
            <li key ={index}>
              <MenuItem title={item.title} to={item.to} />
            </li>
          );
        }
      })}
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
