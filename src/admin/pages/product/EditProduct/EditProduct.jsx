import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormInput from "~/admin/component/formInput/FormInput";
import * as productService from "~/admin/services/productService";
import * as categoryService from "~/admin/services/categoryService";
import styles from "./EditProduct.module.scss";
import { Image } from "cloudinary-react";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import Swal from "sweetalert2";

const EditProduct = () => {
  const cx = classNames.bind(styles);
  const { id } = useParams();
  const [changedImg, setChangedImg] = useState(false);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);
  const [listCategory, setListCategory] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [imgList, setImgList] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [imgListApi, setImgListApi] = useState([]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: "",
    price_sale: "",
    num: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getCategory();
      setListCategory(response.categories);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getAProduct(id);
      setValues({
        name: response.product[0].name,
        price: response.product[0].price,
        num: response.product[0].num,
        price_sale: response.product[0].price_sale,
      });
      setImage(response.product[0].images);
      setContent(response.product[0].content);
      setActive(response.product[0].active);
      setCategory_id(response.product[0].category_id);
    };
    fetchApi();
  }, [id]);
  const arrActive = [
    { id: true, type: "Đang hoạt động", name: "active" },
    { id: false, type: "Tạm dừng", name: "active" },
  ];
  const productInputs = [
    {
      id: 1,
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Apple Macbook",
      err: "hãy nhập tên sản phẩm",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      require: true,
    },
    {
      id: 2,
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "100.000 đ",
      pattern: "^[0-9]$",
      err: "hãy nhập giá bán",
      require: true,
    },
    {
      id: 3,
      name: "price_sale",
      label: "Price Sale",
      type: "number",
      placeholder: "100.000 đ",
      pattern: "^[0-9]$",
      err: "hãy nhập giá bán",
      require: true,
    },
    {
      id: 4,
      name: "num",
      label: "Số lượng",
      type: "text",
      placeholder: "10",
      err: "hãy nhập màu",
      require: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = (e) => {
    setImgList([...e.target.files]);
    setChangedImg(true);
  };

  useEffect(() => {
    if (imgList.length < 1) return;
    const newImageUrls = [];
    imgList.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [imgList]);
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

  const handleSubmitFile = (e) => {
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
          changedImg,
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
        Swal.fire("Saved!", "", "success");
        navigate("/admin/product");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        navigate("/admin/product");

      }
    });
  };
 
  const fetchApi = async (a, b, c, d, e, f, g, h, y, k) => {
    await productService.editProduct(a, b, c, d, e, f, g, h, y, k);
  };

  return (
    <div>
      <Navbar />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          <div className={cx("new")}>
            <div className={cx("newContainer")}>
              <div className={cx("top")}>
                <h1>Chỉnh sửa Sản Phẩm</h1>
              </div>
              <div className={cx("bottom")}>
                <div className={cx("left")}>
                  <div className={cx("imgContainer")}>
                    {changedImg && imageURLS.length > 0 ? (
                      <>
                        <img
                          className={cx("cellImg")}
                          src={
                            imageURLS.length > 0
                              ? imageURLS[index]
                              : "https://vsam1040chicago.com/noimage.png"
                          }
                          alt=""
                        />
                        <div className={cx("thumb")}>
                          {imageURLS.length <= 4 &&
                            imageURLS.map((img, index) => (
                              <img
                                src={img}
                                alt=""
                                key={index}
                                onClick={() => setIndex(index)}
                              />
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          className={cx("cellImg")}
                          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                          publicId={image[index]}
                        />
                        <div className={cx("thumb")}>
                          {image.map((img, index) => (
                            <Image
                              className={cx("cellImg")}
                              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                              publicId={img}
                              onClick={() => setIndex(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
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
                      >
                        <option value="">Chọn danh mục sản phẩm</option>
                        {listCategory.map((category) => (
                          <option
                            value={category._id}
                            selected={
                              category._id == category_id ? true : false
                            }
                          >
                            {console.log(category._id)}
                            {category.name}
                          </option>
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
                        value={content}
                      />
                    </div>
                    <button>Send</button>
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

export default EditProduct;
