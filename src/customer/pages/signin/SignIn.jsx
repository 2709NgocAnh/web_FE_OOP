import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [role, setRole] = useState("");

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
        .required("Vui lòng điền vào trường này")
        .min(6, "Mật khẩu quá ngắn - vui lòng nhập trên 6 kí tự"),
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
      setRole(response1?.data.account.role);
    }
  };
  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
      window.location.reload();
    } else if (role === "user") {
      navigate("/shop");
      window.location.reload();
    } else {
      navigate("/sign-in");
    }
  }, [role]);

  return (
    <div className={cx("container")}>
      <Header search={search} onChange={(e) => setSearch(e.target.value)} />

      <form className={cx("form-Register")} onSubmit={formik.handleSubmit}>
        <h3 className={cx("form-heading")}>ĐĂNG NHẬP </h3>
        <div className={cx("form-group")}>
          <MailOutlined className={cx("form-group--icon")} />
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            className={cx("form-input")}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <span className={cx("form-group--err")}>{formik.errors.email}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <LockOutlined className={cx("form-group--icon")} />
          <label htmlFor="password">Mật khẩu</label>
          <input
            type={showPass ? "password" : "text"}
            id="password"
            className={cx("form-input")}
            {...formik.getFieldProps("password")}
            iconRender={(showPass) =>
              showPass ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {formik.touched.password && formik.errors.password && (
            <span className={cx("form-group--err")}>
              {formik.errors.password}
            </span>
          )}
        </div>
        <div className={cx("form-group")}>
          <button type="submit" className={cx("form-submit")}>
            Đăng Nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
