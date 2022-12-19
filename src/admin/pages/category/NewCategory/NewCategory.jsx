import { useState, useEffect } from "react";
import * as categoryService from "~/admin/services/categoryService";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NewCategory.module.scss";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import Swal from "sweetalert2";

const NewCategory = () => {
  const cx = classNames.bind(styles);
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();
  const arrStatus = [
    { id: 1, type: true, name: "Đang hoạt động" },
    { id: 0, type: false, name: "Tạm dừng" },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await categoryService.newCategory(name,active);
    if (res.data.success === true) {
        await Swal.fire(`Bạn đã thêm Danh mục ${name} thành công🥰`);
        navigate("/admin/category");
      }
    
  };
  return (
    <div>
      <Navbar />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
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

                    <div className={cx("formRadio")}>
                      <label>Trạng thái</label>

                      {arrStatus.map((input) => (
                        <div key={input.id}>
                          <input
                            type="radio"
                            name={input.name}
                            onClick={(e) => setActive(input.type)}
                            checked={input.type === active ? true : false}
                          />

                          <p>{input.name}</p>
                        </div>
                      ))}
                    </div>
                    <button className={cx("link")}>Thêm</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
