import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as categoryService from "~/admin/services/categoryService";
import styles from "./EditCategory.module.scss";

const EditCategory = () => {
  const cx = classNames.bind(styles);
  const { id } = useParams();
  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const arrActive = [
    { id: true, type: "Đang hoạt động", name: "active" },
    { id: false, type: "Tạm dừng", name: "active" },
  ];
  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getACategory(id);
      setName(response.category[0].name);
      setActive(response.category[0].active);
    };
    fetchApi();
  }, [id]);

  const [focused, setFocused] = useState(false);

  const userInputs = [
    {
      id: 1,
      name: "name",
      label: "Tên danh mục",
      type: "text",
      placeholder: "john_doe",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      err: "hãy nhập tên danh mục",
      required: true,
    },
  ];

  const handleFocus = (e) => {
    setFocused(true);
  };
  const fetchApi = async (a, b, c) => {
    await categoryService.editCategory(a, b, c);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(id, name, active);
    navigate("/admin/category");
    window.location.reload();
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
                <h1>Cập nhật danh mục</h1>
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
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          onBlur={handleFocus}
                          focused={focused.toString()}
                        />
                        <span className={cx("err")}>{input.err}</span>
                      </div>
                    ))}
                     <div className={cx("formRadio")}>
                      <label>Trạng thái</label>

                      {arrActive.map((input) => (
                        <div key={input.id}>
                          <input
                            type="radio"
                            name={input.name}
                            onClick={(e) => setActive(input.id)}
                            checked={input.id === active ? true : false}
                          />

                          <p>{input.type}</p>
                        </div>
                      ))}
                    </div>
                    <button className={cx("link")}>Cập nhật</button>
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

export default EditCategory;
