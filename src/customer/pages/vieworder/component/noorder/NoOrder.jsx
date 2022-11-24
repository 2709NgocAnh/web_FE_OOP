import React from "react";
import styles from "./NoOrder.module.scss";
import classNames from "classnames/bind";
export default function NoOrder() {
  const cx = classNames.bind(styles);
  return (
    <div>
      <img
        src="https://vietnam.extranet-aec.com/img/empty-cart.png"
        alt="ảnh lỗi"
        className={cx("cardimg")}
      />
      <h1 className={cx("noproduct")}>
        Chưa có đơn hàng
      </h1>
    </div>
  );
}
