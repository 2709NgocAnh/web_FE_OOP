import { MailOutlined, SyncOutlined } from "@ant-design/icons";
import { Backdrop, Fade, Modal } from "@mui/material";
import Swal from "sweetalert2";

import { Box } from "@mui/system";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as registerService from "~/admin/services/registerService";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Header from "~/customer/Layout/components/header/Header";
import styles from "./ForgetPassWord.module.scss";

const cx = classNames.bind(styles);
const ForgetPassword = () => {
  TabTitle("ForgetPassword");
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [open, setOpen] = useState(false);
  const formikForgetPassWord = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values, actions) => {
      fetchApiForgetPassword(values.email);
      actions.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
    }),
  });
  const formikOTP = useFormik({
    initialValues: {
      email: "",
      OTP: "",
    },
    onSubmit: async (values, actions) => {
      fetchApiVeryfyForgetPassword(values.email, values.OTP);
      actions.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
      OTP: Yup.string().required("Vui lòng điền vào trường này"),
    }),
  });
  const fetchApiForgetPassword = async (a) => {
    const response = await registerService.forgetPassword(a);
    if (response.data.success === true) {
        
     await Swal.fire("Thank You!","Hãy check lại mail để lấy mã OTP", "success");
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const fetchApiVeryfyForgetPassword = async (a, b) => {
    const response = await registerService.veryfyForgetPassword(a, b);
    if (response.data.success === true) {
        setOpen(false);
        await Swal.fire("Thank You!","Hãy check lại mail để lấy mật khẩu mới nhé 🙌👀", "success");
        navigate("/sign-in")
       } else {
        navigate("/forgetPassword");
       }
    
  };
  const handleClose = () => setOpen(false);

  return (
    <div className={cx("container")}>
      <Header search={search} onChange={(e) => setSearch(e.target.value)} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open}>
          <Box className={cx("modal")}>
            <form
              className={cx("form-Register")}
              onSubmit={formikOTP.handleSubmit}
            >
              <h3 className={cx("form-heading")}>ĐĂNG NHẬP </h3>
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
                  {...formikOTP.getFieldProps("email")}
                />
              </div>
              {formikOTP.touched.email && formikOTP.errors.email && (
                <span className={cx("form-group--err")}>
                  {formikOTP.errors.email}
                </span>
              )}
              <div className={cx("form-group")}>
                <MailOutlined className={cx("form-group--icon")} />
                <input
                  placeholder="Nhâp mã OTP *"
                  type="text"
                  id="OTP"
                  className={cx("form-input")}
                  {...formikOTP.getFieldProps("OTP")}
                />
              </div>
              {formikOTP.touched.OTP && formikOTP.errors.OTP && (
                <span className={cx("form-group--err")}>
                  {formikOTP.errors.OTP}
                </span>
              )}
              <div className={cx("form-group")}>
                <button
                  type="submit"
                  className={cx("form-submit")}
                  onClick={() => {
                    if (open === true) {
                    }
                  }}
                >
                  Gửi
                </button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
      <form
        className={cx("form-Register")}
        onSubmit={formikForgetPassWord.handleSubmit}
      >
        <h3 className={cx("form-heading")}>ĐĂNG NHẬP </h3>
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
            {...formikForgetPassWord.getFieldProps("email")}
          />
        </div>
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

export default ForgetPassword;
