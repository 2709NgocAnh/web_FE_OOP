import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as discountService from "~/admin/services/discountService";
import styles from "./NewDiscount.module.scss";

const NewDiscount = () => {
  const cx = classNames.bind(styles);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const arrActive = [
    { id: 1, type: "Đang hoạt động", name: "active" },
    { id: 0, type: "Tạm dừng", name: "active" },
  ];

  const userInputs = [
    {
      name: "code",
      label: "Mã Code",
      type: "text",
      placeholder: "SUMMER",
      pattern: "^[[A-Z]]{6}$",
      err: "Hãy nhập tên danh mục",
      required: true,
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      placeholder: "50000",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      err: "Hãy nhập discount",
      required: true,
    },
    {
      name: "minium_order",
      label: "Số đơn hàng",
      type: "number",
      placeholder: "Quần, áo",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      err: "Hãy nhập tên danh mục",
      required: true,
    },
    {
      name: "purchase_limit",
      label: "Giới hạn người mua",
      type: "number",
      placeholder: "Quần, áo",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      err: "Hãy nhập giới hạn người mua",
      required: true,
    },
    {
      name: "expiration_date",
      label: "Ngày hết hạn discount",
      type: "date",
      placeholder: "27/9/2001",
      err: "Hãy nhập Ngày hết hạn",
      required: true,
    },
  ];

  const [values, setValues] = useState({
    code: "",
    discount: "",
    minium_order: "",
    purchase_limit: "",
    purchase_limit: "",
    expiration_date: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => {
    setFocused(true);
  };
  const fetchApi = async (a, b, c, d, e, f, g) => {
    const response = await discountService.newDiscount(a, b, c, d, e, f, g);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(
      values.code,
      values.discount,
      values.minium_order,
      values.purchase_limit,
      values.expiration_date,
      content,
      active
    );
    navigate("/admin/discount");
  };
  return (
    <div className={cx("new")}>
      <div className={cx("newContainer")}>
        <div className={cx("top")}>
          <h1>Thêm DisCount</h1>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("right")}>
            <form onSubmit={handleSubmit}>
              {userInputs.map((input) => (
                <div className={cx("formInput")} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    {...input}
                    value={values[input.name]}
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
                {arrActive.map((input) => (
                  <div key={input.id}>
                    <input
                      type="radio"
                      name={input.name}
                      onClick={(e) => setActive(input.id)}
                      checked={input.id === active ? true : false}
                    />

                    <label>{input.type}</label>
                  </div>
                ))}
              </div>
              <div className={cx("formInput-desc")}>
                <label>Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                ></textarea>
              </div>
              <button className={cx("link")}>Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDiscount;
