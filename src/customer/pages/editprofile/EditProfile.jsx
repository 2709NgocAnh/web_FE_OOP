import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./EditProfile.module.scss";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import * as registerService from "~/admin/services/registerService";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import Cookies from "js-cookie";
import Header from "~/customer/Layout/components/header/Header";
import SideBar from "../vieworder/component/sidebar/SideBar";

const cx = classNames.bind(styles);
const EditProfile = () => {
  TabTitle("EditProfile");
  const [focused, setFocused] = useState(false);
  const [values, setValues] = useState({
    // id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    // password: "",
    address: "",
    // password_confirm: "",
    // role: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      const response = await registerService.getRegister();
      setValues({
        id: response.account._id,
        fullName: response.account.fullName,
        phoneNumber: response.account.phoneNumber,
        address: response.account.address,
        email: response.account.email,
        // active: response.account.active,
        // role: response.account.role,
      });
    };
    Cookies.get("accessToken") && fetchApi();
  }, []);

  const handleFocus = (e) => {
    setFocused(true);
  };
 
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
        disabled:true
      },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fetchApi = async (a, b, c, d,e) => {
    await registerService.UpdateRegister(a, b, c, d,e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(
      values.id,
      values.fullName,
      values.phoneNumber,
      values.address,
      values.email,
    //   values.password,
    //   values.role,
    //   values.active
    );

    setValues({
        fullName: "",
        email: "",
        phoneNumber: "",
        // password: "",
        address: "",
    });
  };
  return (
    <>
      <Header />

      <div className={cx("wrap")}>
        <SideBar />
        <div className={cx("new")}>
          <div className={cx("newContainer")}>
            <div className={cx("top")}>
              <h1>Sửa Thông tin thành viên</h1>
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

                  <button className={cx("link")}>Cập nhật</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
