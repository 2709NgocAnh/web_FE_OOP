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
  const [valueSearch, setValueSearch] = useState("");
  const [numberPage, setNumberPage] = useState(1);
  const [nameSort, setNameSort] = useState("price");
  const [valueSort, setValueSort] = useState(1);
  //   const [idCategory, setIdCategory] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getProduct(
        nameSort,
        valueSort,
        numberPage
      );
      setProductList(response.products);
      setTotalPage(response.totalPage);
    };
    fetchApi();
  }, [nameSort, valueSort, numberPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const response = await productService.searchProduct(valueSearch);
      setProductList(response.products);
    };
    fetchApi();
  };
  const handleSubmitCategory = (idCategory) => {
    console.log(idCategory);

    const fetchApi = async () => {
      const response = await productService.getListProductById(idCategory);
      setProductList(response.products);
    };
    fetchApi();
  };
  //   useEffect(() => {
  //     const fetchApi = async () => {
  //       const response = await productService.getListProductById(idCategory);
  //       setProductList(response.products);
  //     };
  //     fetchApi();
  //   }, [idCategory]);

  return (
    <>
      <div className={cx("header")}>
        <Header
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
          handleSubmit={handleSubmit}
          handleSubmitCategory={handleSubmitCategory}
          //   setIdCategory={setIdCategory}
        />
        <Slider title="Shop" />
      </div>
      <div>
        <section className={cx("product")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <Sort setNameSort={setNameSort} setValueSort={setValueSort} />
              {productList?.length === 0 ? (
                <NoProduct />
              ) : (
                <Products productList={productList} />
              )}
            </div>
            <Pagination totalPage={totalPage} setNumberPage={setNumberPage} />
          </div>
        </section>
      </div>
    </>
  );
}
