import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "~/admin/component/formInput/FormInput";
import * as productService from "~/admin/services/productService";
import * as categoryService from "~/admin/services/categoryService";

import styles from "./NewProduct.module.scss";

function NewProduct(props) {
  const cx = classNames.bind(styles);
  const imgDiv = useRef();

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);
  const [listCategory, setListCategory] = useState([]);
  const [category_id, setCategory_id] = useState(0);
  const [imgList, setImgList] = useState([]);
  const [imageURLS, setImageURLS] = useState([]);
  const [imgListApi, setImgListApi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchApi = async () => {
    const response = await categoryService.getCategory();
    setListCategory(response.categories);
  };
    fetchApi();
  }, []);
  const arrActive = [
    { id: true, type: "Đang hoạt động", name: "active" },
    { id: false, type: "Tạm dừng", name: "active" },
  ];
  const [values, setValues] = useState({
    name: "",
    price: "",
    price_sale: "",
    num: "",
  });
  const productInputs = [
    {
      id: 1,
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Apple Macbook Pro",
      err: "hãy nhập tên sản phẩm",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      require: true,
    },

    {
      id: 3,
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Computers",
      pattern: "^[0-9]$",
      err: "hãy nhập giá bán",
      require: true,
    },
    {
      id: 4,
      name: "price_sale",
      label: "Price Sale",
      type: "number",
      placeholder: "Computers",
      pattern: "^[0-9]$",
      err: "hãy nhập giá bán",
      require: true,
    },
    {
      id: 5,
      name: "num",
      label: "Số lượng",
      type: "text",
      placeholder: "xanh ,đỏ,vàng",
      err: "hãy nhập màu",
      require: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    setImgList([...e.target.files]);
  };

  useEffect(() => {
    if (imgList.length < 1) return;
    const newImageUrls = [];
    imgList.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLS(newImageUrls);
  }, [imgList]);
  console.log("list img ", imageURLS);

  useEffect(() => {
    if (!imgList) return;
    const newImage = [];
    imgList.forEach((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        newImage.push(reader.result);
      };
    });
    setImgListApi(newImage);
  }, [imgList]);
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgDiv.current.style.src = `${x}% ${y}%`;
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();

    fetchApi(
      values.name,
      category_id,
      content,
      values.price,
      values.price_sale,
      values.num,
      active,
      imgListApi
    );
    setImgList("");
    setImgListApi("");
    navigate("/admin/product");
  };
  const handleFocus = (e) => {
    setFocused(true);
  };
  const fetchApi = async (a, b, c, d, e, f, g, h) => {
    const response = await productService.newProduct(a, b, c, d, e, f, g, h);
  };

  return (
    <div className={cx("new")}>
      <div className={cx("newContainer")}>
        <div className={cx("top")}>
          <h1>Thêm Sản Phẩm</h1>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("left")}>
            <div className={cx("imgContainer")}>
              <img
                className={cx("cellImg")}
                src={imageURLS.length >0 ? imageURLS[index] :("https://vsam1040chicago.com/noimage.png")}
                onMouseMove={handleMouseMove}
                ref={imgDiv}
                onMouseLeave={() =>
                  (imgDiv.current.style.src = `center`)
                }
                alt=""
              />
              <div className={cx("thumb")}>
                {imageURLS.length <=4 &&
                  imageURLS.map((img, index) => (
                    <img
                      src={img}
                      alt=""
                      key={index}
                      onClick={() => setIndex(index)}
                    />
                  ))
                 
                }
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            <form onSubmit={handleSubmitFile}>
              <div className={cx("formInput")}>
                <label htmlFor="file">
                  Image:{" "}
                  <DriveFolderUploadOutlinedIcon className={cx("icon")} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                  multiple
                />
              </div>
              <div className={cx("formInput-category")}>
                <select
                  required
                  onChange={(e) => {
                    setCategory_id(e.target.value);
                  }}
                  style={{height:'32px'}}
                >
                  <option value="">Chọn danh mục sản phẩm</option>
                  {listCategory.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {productInputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              {arrActive.map((input) => (
                <div className={cx("formRadio")} key={input.id}>
                  <input
                    type="radio"
                    name={input.name}
                    onClick={(e) => setActive(input.id)}
                    checked={input.id === active ? true : false}
                  />

                  <label>{input.type}</label>
                </div>
              ))}
              <div className={cx("formInput-desc")}>
                <label>Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></textarea>
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
