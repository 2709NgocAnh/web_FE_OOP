import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as categoryService from "~/admin/services/categoryService";
import styles from "./Category.module.scss";

export default function Category(props) {
  const { handleSubmitCategory,handleSubmitAllProduct } = props;
  const cx = classNames.bind(styles);
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getCategory();
      setListCategory(response.categories.filter((category)=>{
        return(category.active===true)
      }));
    };
    fetchApi();
  }, []);

  return (
    <div className={cx("wrapper")}>
        <div  className={cx("wrapper-item")}>
            <NavLink
              className={cx("menu-item")}
              onClick={handleSubmitAllProduct}
              >
            
              <span className={cx("title")}>TẤT CẢ</span>
            </NavLink>
          </div>
      {listCategory.map((category, index) => {
        return (
          <div key={index} className={cx("wrapper-item")}>
            <NavLink
              className={cx("menu-item")}
              onClick={()=>handleSubmitCategory(category._id)}
            >
              <span className={cx("title")}>{category.name}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
