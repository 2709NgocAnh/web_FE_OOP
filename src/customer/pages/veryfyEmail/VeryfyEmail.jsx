import { MailOutlined, SyncOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as registerService from "~/admin/services/registerService";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Header from "~/customer/Layout/components/header/Header";
import styles from "./VeryfyEmail.module.scss";

const cx = classNames.bind(styles);
const VeryfyEmail = () => {
  TabTitle("VeryfyEmail");
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      OTP: "",
    },
    onSubmit: async (values, actions) => {
    fetchApiVeryfyEmail(values.email, values.OTP);
      actions.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
      OTP: Yup.string().required("Vui lòng điền vào trường này"),
    }),
  });

  const fetchApiVeryfyEmail = async (a, b) => {
    const response = await registerService.veryfyEmail(a, b);
    response.data.success === true ? navigate("/sign-in") : navigate("/register");
  };
  return (
    <div className={cx("container")}>
      <Header search={search} onChange={(e) => setSearch(e.target.value)} />

      <form className={cx("form-Register")} onSubmit={formik.handleSubmit}>
        <h3 className={cx("form-heading")}>XÁC THỰC EMAIL </h3>
        <div className={cx("form-heading-header")}>
          <SyncOutlined className={cx("form-group--icon")} />
          <p>Quên mật khẩu</p>
        </div>
        <div className={cx("form-group")}>
          <MailOutlined className={cx("form-group--icon")} />
          <input
            placeholder="Nhập email của bạn *"
            type="email"
            id="email"
            className={cx("form-input")}
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <span className={cx("form-group--err")}>{formik.errors.email}</span>
        )}
        <div className={cx("form-group")}>
          <MailOutlined className={cx("form-group--icon")} />
          <input
            placeholder="Nhâp mã OTP *"
            type="text"
            id="OTP"
            className={cx("form-input")}
            {...formik.getFieldProps("OTP")}
          />
        </div>
        {formik.touched.OTP && formik.errors.OTP && (
          <span className={cx("form-group--err")}>{formik.errors.OTP}</span>
        )}
        <div className={cx("form-group")}>
          <button type="submit" className={cx("form-submit")}>
            Gửi
          </button>
        </div>
        <div className={cx("form-text")}>
          <NavLink
            to="/sign-in"
            style={{
              color: "black",
              textDecoration: "underline",
              fontWeight: "300",
            }}
          >
            Hủy
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default VeryfyEmail;
