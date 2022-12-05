import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./NoProduct.module.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
function NoProduct(props) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("no-product")}>
      <ShoppingCartOutlined />
      <div className={cx("no-product-text")}>
        không có sản phẩm nào trong giỏ hàng
      </div>
      <div className={cx("no-product-btn")}>
        <NavLink to={"/"}>
          <button>Tiếp tục mua hàng</button>
        </NavLink>
      </div>
    </div>
  );
}

NoProduct.propTypes = {};

export default NoProduct;
