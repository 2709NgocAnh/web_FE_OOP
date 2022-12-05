import classNames from "classnames/bind";
import styles from "./FormRegister.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const cx = classNames.bind(styles);
const FormRegister = (props) => {
  const {
    //props_input
    icon,
    label,
    name,
    type,
    onChange,
    errorMessage,
    //props_formik
    value,
    errors,
    touched,
  } = props;

  return (
    <>
      <div className={cx("form-group")}>
        <div className={cx("form-group--icon")}>{icon}</div>
        <label htmlFor={name}>{label} *</label>
        <input
          type={type}
          id={name}
          onChange={onChange}
          value={value}
          className={cx("form-input")}
        />
        {touched && errors && <span className={cx("form-group--err")}>{errorMessage}</span>}
      </div>
    </>
  );
};

export default FormRegister;
