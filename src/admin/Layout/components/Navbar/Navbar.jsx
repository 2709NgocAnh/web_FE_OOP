import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Image from "~/components/image/Image";
import images from "~/assets/images";
import styles from "./Navbar.module.scss";
import Search from "../Search/Search";
import * as registerService from "~/admin/services/registerService";
import { useState } from "react";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const Navbar = (props) => {
  const { setValueSearch, valueSearch, handleSubmit, disabled } = props;

  const [auth, setAuth] = useState([]);
  const fetchApi = async () => {
    const response = await registerService.getRegister();
    setAuth(response.account);
  };
  useEffect(() => {
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
          disabled={disabled}
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
          handleSubmit={handleSubmit}
        />

        <div className={cx("items")}>
          <div className={cx("item")}>
            <Image src="" alt="avatar" className={cx("avatar")} />
          </div>
          <div className={cx("item")}>
            <h4 className={cx("name")}>{auth.fullName}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
