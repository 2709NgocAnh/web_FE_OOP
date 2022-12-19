import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);
const Sidebar = () => {
  const logout = () => {
    Cookies.remove("accessToken")
    Cookies.remove("role")

   
  };
  return (
    <div className={cx("sidebar")}>
      <div className={cx("center")}>
        <ul>
          <p className={cx("title")}>MAIN</p>
          <NavLink exact="true" to="/admin">
            <div className={cx("active_item")}>
              <li>
                <DashboardIcon className={cx("icon")} />
                <span>Dashboard</span>
              </li>
            </div>
          </NavLink>
          <p className={cx("title")}>LISTS</p>
          <NavLink
            to="/admin/user"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <PersonOutlineIcon className={cx("icon")} />
                <span>User</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/admin/category"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <CreditCardIcon className={cx("icon")} />
                <span>Category</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/admin/product"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <StoreIcon className={cx("icon")} />
                <span>Product</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/admin/order"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <CreditCardIcon className={cx("icon")} />
                <span>Order</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/admin/slider"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <LocalShippingIcon className={cx("icon")} />
                <span>Slider</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/admin/discount"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <DiscountOutlinedIcon className={cx("icon")} />
                <span>Discount</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/admin/feedback"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <FeedbackOutlinedIcon className={cx("icon")} />
                <span>Feedback</span>
              </li>
            </div>
          </NavLink>

          <p className={cx("title")}>USEFUL</p>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <div className={cx("active_item")}>
              <li>
                <AccountCircleOutlinedIcon className={cx("icon")} />
                <span>Profile</span>
              </li>
            </div>
          </NavLink>

          <NavLink
            onClick={logout}
            to="/sign-in"
            className={({ isActive }) => cx(isActive ? "active" : "inactive")}
          >
            <li>
              <ExitToAppIcon className={cx("icon")} />
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
