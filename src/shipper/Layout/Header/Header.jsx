import React from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Image from "~/components/image/Image";
import images from "~/assets/images";
import styles from "./Header.module.scss";
import Search from "../Search/Search";
import * as registerService from "~/admin/services/registerService";
import { useState } from "react";
import { useEffect } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";

export default function Header() {
  const cx = classNames.bind(styles);
  const [auth, setAuth] = useState([]);
  const fetchApi = async () => {
    const response = await registerService.getRegister();
    setAuth(response.account);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const logout = () => {
    Cookies.remove("accessToken");
  };
  return (
    <div className={cx("navbar")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo")}>
          <NavLink to={"/shipper/listOrder"}>
            <Image
              itemProp="logo"
              src={images.logo}
              alt="Outerity"
              className={cx("img-responsive logoimg")}
            />
          </NavLink>
        </div>

        {/* <Search /> */}

        <div className={cx("items")}>
          <div className={cx("item")}>
            <Image src="" alt="avatar" className={cx("avatar")} />
          </div>
          <div className={cx("item")}>
            <h4 className={cx("name")}>{auth.fullName}</h4>
          </div>
          <div className={cx("item")}>
            <NavLink
              onClick={logout}
              to="/sign-in"
            >
              <ExitToAppIcon className={cx("icon")} />logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
