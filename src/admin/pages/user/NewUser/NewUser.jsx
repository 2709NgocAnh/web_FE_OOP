import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./NewUser.module.scss";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import * as registerService from "~/admin/services/registerService";

const cx = classNames.bind(styles);
const NewUser = () => {
  TabTitle("NewUser");
  const [focused, setFocused] = useState(false);
  const [role, setRole] = useState("admin");

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    password_confirm: "",
  });
  const arrStatus = [
    { id: 1, type: "admin", name: "active" },
    { id: 0, type: "user", name: "active" },
  ];
  const handleFocus = (e) => {
    setFocused(true);
  };
  const INPUT_lOGIN = [
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Phải là một địa chỉ email hợp lệ!",
      label: "Email",
      pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
      required: true,
      icon: "fa-solid fa-envelope",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Mật khẩu phải bao gồm ký tự in hoa, in thường, chữ số và ký tự đặc biệt",
      label: "Password",
      pattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`,
      required: true,
      icon: "fa-solid fa-lock",
    },
  ];
  const INPUT_REGISTER = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Username",
      errorMessage: "Tên người dùng phải từ 3-16 ký tự! ",
      label: "Username",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      required: true,
      icon: "fa-solid fa-user",
    },

    {
      id: 2,
      name: "phoneNumber",
      type: "tel",
      placeholder: "Số điện thoại",
      errorMessage: "Phải là số điện thoại hợp lệ!",
      label: "Số điện thoại",
      pattern: "^[0-9]{10,11}$",
      required: true,
      icon: "fa-solid fa-phone",
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Địa chỉ",
      errorMessage: "Phải nhập địa chỉ!",
      label: "Địa chỉ",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      required: true,
      icon: "fa-solid fa-location-dot",
    },

    ...INPUT_lOGIN,
    {
      id: 6,
      name: "password_confirm",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Mật khẩu không khớp!",
      label: "Confirm Password",
      reps: values.password,
      required: true,
      icon: "fa-solid fa-lock",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fetchApi = async (a, b, c, d, e, f) => {
    const response = await registerService.signUpRegister(a, b, c, d, e, f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(
      values.fullName,
      values.email,
      values.phoneNumber,
      values.password,
      values.address,
      role
    );

    setValues({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      password_confirm: "",
    });
  };
  return (
    <div className={cx("new")}>
      <div className={cx("newContainer")}>
        <div className={cx("top")}>
          <h1>Thêm Thành Viên</h1>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("right")}>
            <form onSubmit={handleSubmit}>
              {INPUT_REGISTER.map((input) => (
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
              {arrStatus.map((input) => (
                <div className={cx("formRadio")} key={input.type}>
                  <input
                    type="radio"
                    name={input.name}
                    onClick={(e) => setRole(input.type)}
                    checked={input.type === role ? true : false}
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
export default NewUser;
