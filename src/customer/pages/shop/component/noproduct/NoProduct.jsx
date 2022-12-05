import React from 'react'
import styles from "./NoProduct.module.scss"
import classNames from 'classnames/bind'

export default function NoProduct() {
  const cx = classNames.bind(styles);
  return (
    <div>
       <div className="col-xl-10 col-sm-12 col-xs-12 ">
                  <div className={cx("row")}>
                    <img
                      src="https://vietnam.extranet-aec.com/img/empty-cart.png"
                      alt="ảnh lỗi"
                      className={cx("cardimg")}
                    />
                    <h1 className={cx("noproduct")}>Không có sản phẩm</h1>
                  </div>
                </div>
    </div>
  )
}
