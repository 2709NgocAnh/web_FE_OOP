import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import * as productService from "~/admin/services/productService";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Pagination from "~/customer/components/pagination/Pagination";
import Sort from "~/customer/components/sort/Sort";
import Header from "~/customer/Layout/components/header/Header";
import Slider from "~/customer/Layout/components/slider/Slider";
import NoProduct from "./component/noproduct/NoProduct";
import Products from "./component/products/Products";
import styles from "./Shop.module.scss";

export default function Shop() {
  TabTitle("Shop");
  const cx = classNames.bind(styles);
  const [totalPage, setTotalPage] = useState();
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getProduct(1);
      setProductList(response.products);
      setTotalPage(response.totalPage);
    };
    fetchApi();
  }, []);
  
  return (
    <>
      <div className={cx("header")}>
        <Header setProductList={setProductList} />
        <Slider title="Shop" />
      </div>
      <div>
        <section className={cx("product")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <Sort setProductList={setProductList} />
              {productList?.length === 0 ? (
                <NoProduct />
              ) : (
                <Products productList={productList} />
              )}
            </div>
            <Pagination
            totalPage={totalPage}
            setProductList={setProductList}
            />
          </div>
        </section>
      </div>
    </>
  );
}
