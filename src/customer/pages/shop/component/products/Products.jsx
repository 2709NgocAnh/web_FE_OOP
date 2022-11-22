import React from "react";
import { useContext } from "react";
import { DataContext } from "~/customer/components/dataProvider/DataProvider";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";

import { Link, NavLink } from "react-router-dom";
import { Image } from "cloudinary-react";
import Price from "../price/Price";

function Products(props) {
  const { productList } = props;
  const cx = classNames.bind(styles);
  const value = useContext(DataContext);
  const addCart = value.addCart;

  return (
    <div>
      <div className="col-xl-12 col-sm-12 col-xs-12">
        <div className={cx("row")}>
          {productList?.map((product) => {
            return (
              <div
                className={cx("col-xl-3 col-lg-3 col-md-3", "product-item")}
                key={product._id}
              >
                <NavLink to={`/product/detail/${product._id}`}>
                  <Image
                    className={cx("card-img")}
                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                    publicId={product.images[1]}
                  />
                </NavLink>

                <div className={cx("content")}>
                  <h3>
                    <Link
                      to={`/product/detail/${product._id}`}
                      className={cx("card-title")}
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <Price
                    price={product.price}
                    price_sale={product.price_sale}
                  />
                  <button
                    className={cx("card-button")}
                    onClick={() => {
                      addCart(product, 1);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Products.propTypes = {};

export default Products;
