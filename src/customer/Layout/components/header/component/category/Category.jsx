import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as categoryService from "~/admin/services/categoryService";

export default function Category(props) {
  const { setIdCategory, handleSubmitCategory } = props;
  const cx = classNames.bind(styles);
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getCategory();
      setListCategory(response.categories);
    };
    fetchApi();
  }, []);

  return (
    <div className={cx("wrapper")}>
      {listCategory.map((category, index) => {
        return (
          <div
            key={index}
            className={cx("wrapper-item")}
          >
            <NavLink
              className={cx("menu-item")}
            // onClick={handleSubmitCategory(category._id)}

            >
              <span className={cx("title")}>{category.name}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
