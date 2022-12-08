import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { DataContext } from "~/customer/components/dataProvider/DataProvider";
import styles from "./Action.module.scss";
import * as registerService from "~/admin/services/registerService";
import Image from "~/components/image/Image";
import MenuList from "../menuList/MenuList";
import { MENU_ITEMS, USER_MENU } from "~/constant/Menu";
import { NavLink } from "react-router-dom";
import AvatarUser from "../avatarUser/AvatarUser";
import { ShoppingCartOutlined } from "@ant-design/icons";
import images from "~/assets/images";
import Cookies from "js-cookie";
function Action() {
  const cx = classNames.bind(styles);
  const [auth, setAuth] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const value = useContext(DataContext);
  const [cart] = value.cart;

  const fetchApi = async () => {
    const response = await registerService.getRegister()
    setAuth(response.account.fullName);
    setCurrentUser(true);
  };
  //call API
  useEffect(() => {
    Cookies.get("accessToken")&&fetchApi()
  }, []);

  return (
    <div>
      <div className={cx("action")}>
        <div className={cx("dropdown")}>
          <button style={{ backgroundColor: "transparent" }}>
            {currentUser ? (
              <AvatarUser Auth={auth} />
            ) : (
              <Image
                className={cx("user-avatar")}
                src={images.noImage}
                alt="Nguyen Van A"
              />
            )}
            <div className={cx("dropdown-content--right")}>
              <MenuList items={currentUser ? USER_MENU : MENU_ITEMS} />
            </div>
          </button>
        </div>
        <div className={cx("Cart")}>
          <NavLink to="/cart">
            <ShoppingCartOutlined />
          </NavLink>
          <span className={cx("Cart--quantity")}>{cart.length}</span>
        </div>
      </div>
    </div>
  );
}

Action.propTypes = {};

export default Action;
