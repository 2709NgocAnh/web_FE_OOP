import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as categoryService from "~/admin/services/categoryService";
import * as productService from "~/admin/services/productService";

export default function Category(props) {
    const {setProductList}=props;
  const cx = classNames.bind(styles);
  const [listCategory, setListCategory] = useState([]);
  const [idCategory, setIdCategory] = useState();

//   useEffect(() => {
//     const fetchApi = async () => {
//       const response = await productService.sortProduct(idCategory);
//       setProductList(response.products);
//     };
//     fetchApi();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [idCategory]);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const response = await categoryService.getCategory();
    setListCategory(response.categories);
  };
  return (
    <div className={cx("wrapper")}>
      {listCategory.map((category, index) => {
        return (
          <div key={index} className={cx("wrapper-item")}>
            <NavLink className={cx("menu-item")} to={`/${category.name}`} onClick={(e)=>setIdCategory(category._id)}>
              <span className={cx("title")}>{category.name}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
