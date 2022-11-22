import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./SearchProduct.module.scss";
import * as productService from "~/admin/services/productService";
const cx = classNames.bind(styles);

function Search(props) {
  const { setProductList } = props;
  const [valueSearch, setValueSearch] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const response = await productService.searchProduct(valueSearch);
      setProductList(response.products);
    };
    fetchApi();
  };
  return (
    <div>
      <form  onSubmit={handleSubmit} >
      <div className={cx("search")}>
        <input
          type="text"
          placeholder="Tim kiem..."
          className={cx("search")}
          onChange={(e) => setValueSearch(e.target.value)}
          value={valueSearch}
        />
  
        <button className={cx("search-btn")} type="submit">
          <SearchOutlined />
        </button>
      </div>
      </form>
    </div>
  );
}

Search.propTypes = {};

export default Search;
