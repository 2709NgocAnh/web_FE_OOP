import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    MailOutlined
} from "@ant-design/icons";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as registerService from "~/admin/services/registerService";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Header from "~/customer/Layout/components/header/Header";
import styles from "./SignIn.module.scss";

const cx = classNames.bind(styles);
const SignIn = () => {
  TabTitle("SignIn");
  const showPass = true;
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const password = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      fetchApiSignIn(values.email, values.password);
      actions.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
        password: Yup.string()
        .matches(password, "Mật khẩu phải bao gồm ký tự in hoa, in thường, chữ số và ký tự đặc biệt")
        .required("Vui lòng điền vào trường này"),
    }),
  });

  const fetchApiSignIn = async (a, b) => {
    const response = await registerService.signInRegister(a, b);
    const token = "Bearer " + response.headers.authorization;
    Cookies.set("accessToken", token, { expires: 7 });

    if (response.data.success === true) {
      const response1 = await registerService.LoginRegister(
        response.headers.authorization
      );
      await Cookies.set("role", response1?.data.account.role, { expires: 7 });
      if (response1?.data.account.role === "admin") {
        return navigate("/admin"),window.location.reload();
      } else if (response1?.data.account.role === "user") {
        return navigate("/shop"),window.location.reload();
      } else if (response1?.data.account.role === "shipper") {
        return navigate("/shipper/listOrder"),window.location.reload();
      }
    }
  };
  return (
    <div className={cx("container")}>
      <Header search={search} onChange={(e) => setSearch(e.target.value)} />
      <form className={cx("form-Register")} onSubmit={formik.handleSubmit}>
        <h3 className={cx("form-heading")}>ĐĂNG NHẬP </h3>
        <div className={cx("form-group")}>
          <MailOutlined className={cx("form-group--icon")} />
          <input
            type="email"
            id="email"
            className={cx("form-input")}
            {...formik.getFieldProps("email")}
            placeholder="Email *"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <span className={cx("form-group--err")}>{formik.errors.email}</span>
        )}
        <div className={cx("form-group")}>
          <LockOutlined className={cx("form-group--icon")} />
          <input
            type={showPass ? "password" : "text"}
            id="password"
            className={cx("form-input")}
            placeholder="password *"
            {...formik.getFieldProps("password")}
            iconRender={(showPass) =>
              showPass ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <span className={cx("form-group--err")}>
            {formik.errors.password}
          </span>
        )}
        <div className={cx("form-group")}>
          <button type="submit" className={cx("form-submit")}>
            Đăng Nhập
          </button>
        </div>
        <div className={cx("form-register")}>
            <span>Bạn chưa có tài khoản ?</span>
            <NavLink
              to="/register"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Đăng ký
            </NavLink>
        </div>
        <div className={cx("forget-password")}>
          <NavLink
            to="/forgetPassword"
            style={{ color: "black", textDecoration: "underline" }}
          >
            Quên mật khẩu
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
