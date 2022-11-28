import React from "react";
import styles from "./Price.module.scss";
import classNames from "classnames/bind";
import FormatNumber from "~/customer/components/formatNumber/FormatNumber";
export default function Price(props) {
  const { price, price_sale } = props;
  const cx = classNames.bind(styles);
  return (
    <div>
      <div className={cx("price")}>
        {price_sale != null ? (
          <del className={cx("card-price--sale")}>
            <FormatNumber price={price_sale} />
          </del>
        ) : (""
        )}
        <span className={cx("card-price--nosale")}>
          <FormatNumber price={price} />
        </span>
      </div>
    </div>
  );
}
