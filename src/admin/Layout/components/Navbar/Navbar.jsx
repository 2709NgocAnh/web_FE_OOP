import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as registerService from "~/admin/services/registerService";
import images from "~/assets/images";
import Image from "~/components/image/Image";
import Search from "../search/Search";
import styles from "./Navbar.module.scss";

const cx = classNames.bind(styles);

const Navbar = ({ valueSearch, handleSubmit, setValueSearch }) => {
  const [auth, setAuth] = useState([]);
  useEffect(() => {
  const fetchApi = async () => {
    const response = await registerService.getRegister();
    setAuth(response?.account);
  };
    fetchApi();
  }, []);
  return (
    <div className={cx("navbar")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo")}>
          <NavLink to={"/admin"}>
            <Image
              itemProp="logo"
              src={images.logo}
              alt="Outerity"
              className={cx("img-responsive logoimg")}
            />
          </NavLink>
        </div>

        <Search
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
          handleSubmit={handleSubmit}
        />

        <div className={cx("items")}>
          <div className={cx("item")}>
            <div className={cx("user-avatar", "user-avatar--work")}>
              {auth.fullName?.split(" ").pop().slice(0, 1)}
            </div>
          </div>
          <div className={cx("item")}>
            <h4 className={cx("name")}>{auth?.fullName}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
