import React from "react";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";
import { NavLink } from "react-router-dom";

import Image from "~/components/image/Image";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function Logo(props) {
  return (
    <div className={cx("logo")}>
      <NavLink className={cx("logo--link")} to="/shop">
        <Image src={images.logo} alt="Outerity" className={cx("logo--img")} />
      </NavLink>
    </div>
  );
}

Logo.propTypes = {};

export default Logo;
