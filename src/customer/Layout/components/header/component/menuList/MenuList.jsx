import classNames from "classnames/bind";
import styles from "./MenuList.module.scss";
import Cookies from "js-cookie";
import MenuItem from "../menuItem/MenuItem";

export default function MenuList({ items }) {
  const cx = classNames.bind(styles);
  const logout = () => {
    Cookies.set("accessToken", { expires: 0 });
    localStorage.removeItem("cart");
    window.location.reload();
  };
  return (
    <div className={cx("wrapper")}>
      {items.map((item, index) => {
        if (item.separate === true) {
          return (
            <div key={index} className={cx("wrapper-item")}>
              <button onClick={logout} className={cx("menu-item--btn")}>
                <MenuItem to={item.to} title={item.title} />
              </button>
            </div>
          );
        } else {
          return (
            <div key={index} className={cx("wrapper-item")}>
              <MenuItem to={item.to} title={item.title} />
            </div>
          );
        }
      })}
    </div>
  );
}
