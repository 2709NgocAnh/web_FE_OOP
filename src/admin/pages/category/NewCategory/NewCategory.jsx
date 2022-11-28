import { useState, useEffect } from "react";
import * as categoryService from "~/admin/services/categoryService";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NewCategory.module.scss";

const NewCategory = () => {
  const cx = classNames.bind(styles);
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const navigate = useNavigate();
  const arrStatus = [
    { id: 1, type: "Đang hoạt động", name: "active" },
    { id: 0, type: "Tạm dừng", name: "active" },
  ];
  const userInputs = [
    {
      name: "name",
      label: "Tên danh mục",
      type: "text",
      placeholder: "Quần, áo",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      err: "Hãy nhập tên danh mục",
      required: true,
    },
  ];
  const onChange = (e) => {
    setName(e.target.value);
  };
  const handleFocus = (e) => {
    setFocused(true);
  };

  const fetchApi = async (a,b) => {
    const response = await categoryService.newCategory(a,b);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(name,status);
    navigate("/admin/category")
  };
  return (
    <div className={cx("new")}>
      <div className={cx("newContainer")}>
        <div className={cx("top")}>
          <h1>Thêm Danh mục</h1>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("right")}>
            <form onSubmit={handleSubmit}>
              {userInputs.map((input) => (
                <div className={cx("formInput")} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    {...input}
                    value={name}
                    onBlur={handleFocus}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    focused={focused.toString()}
                  />
                  <span className={cx("err")}>{input.err}</span>
                </div>
              ))}
              {arrStatus.map((input) => (
                <div className={cx("formRadio")} key={input.id}>
                  <input
                    type="radio"
                    name={input.name}
                    onClick={(e) => setStatus(input.id)}
                    checked={input.id === status ? true : false}
                  />

                  <label>{input.type}</label>
                </div>
              ))}

                <button className={cx("link")}>Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
