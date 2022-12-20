import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as discountService from "~/admin/services/discountService";
import styles from "./EditDiscount.module.scss";

const EditDiscount = () => {
  const cx = classNames.bind(styles);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const arrActive = [
    { id: true, type: "Đang hoạt động", name: "active" },
    { id: false, type: "Tạm dừng", name: "active" },
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
    expiration_date: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      const response = await discountService.getADiscount(id);
      setValues({
        code: response.discount.code,
        discount: response.discount.discount,
        minium_order: response.discount.minium_order,
        purchase_limit: response.discount.purchase_limit,
        expiration_date: response.discount.expiration_date,
       
      });
      setActive(response.discount.active);
      setContent(response.discount.content);
    };
    fetchApi();
  }, [id]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => {
    setFocused(true);
  };
  const fetchApi = async (a, b, c, d, e, f, g, h) => {
    await discountService.editDiscount(a, b, c, d, e, f, g, h);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await fetchApi(
          id,
          values.code,
          values.discount,
          values.minium_order,
          values.purchase_limit,
          values.expiration_date,
          content,
          active
        );

        Swal.fire("Saved!", "", "success");
        navigate("/admin/discount");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        navigate("/admin/discount");
      }
    });
  };
  return (
    <div>
      <Navbar />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          <div className={cx("new")}>
            <div className={cx("newContainer")}>
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

export default EditDiscount;
