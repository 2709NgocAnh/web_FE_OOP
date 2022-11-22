import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormInput.module.scss";

const FormInput = (props) => {
  const cx = classNames.bind(styles);
  const [focused, setFocused] = useState(false);
  const { label, err, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={cx("formInput")}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className={cx("err")}>{err}</span>
    </div>
  );
};

export default FormInput;
