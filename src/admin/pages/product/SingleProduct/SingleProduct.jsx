import classNames from "classnames/bind";
import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Image } from "cloudinary-react";
import styles from "./SingleProduct.module.scss";
import moment from "moment";
import * as productService from "~/admin/services/productService";
import * as categoryService from "~/admin/services/categoryService";

function SingleProduct() {
  const cx = classNames.bind(styles);
  const { id } = useParams();
  const imgDiv = useRef();
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState();
  const [category_id, setCategory_id] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getAProduct(id);
      setProduct(response.product[0]);
    };
    fetchApi();
  }, [id]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getCategory();
      setCategory_id(response.categories);
    };
    fetchApi();
  }, []);
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgDiv.product.style.backgroundPosition = `${x}% ${y}%`;
  };

  return product ? (
    <div className={cx("single")}>
      <div className={cx("singleContainer")}>
        <div className={cx("top")}>
          <div className={cx("left")}>
            <NavLink
              className={(nav) => cx({ active: nav.isActive })}
              to={`/admin/product/editproduct/${product?._id}`}
            >
              <div className={cx("editButton")}>Edit</div>
            </NavLink>

            <div className={cx("item")} key={product?._id}>
              <div className={cx("details")}>
                <div className={cx("imgContainer")}>
                  <Image
                    className={cx("cellImg")}
                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                    publicId={
                      product.images.length
                        ? product.images[index]
                        : product.images
                    }
                    onMouseMove={handleMouseMove}
                    ref={imgDiv}
                    onMouseLeave={() =>
                      (imgDiv.product.style.backgroundPosition = `center`)
                    }
                  />

                  <div className={cx("thumb")}>
                    {product.images?.map((img, index) => (
                      <Image
                        className={cx("cellImg")}
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                        publicId={img}
                        onClick={() => setIndex(index)}
                      />
                      // <Image src={img.image} alt="" key={index} onClick={() => setIndex(index)} />
                    ))}
                  </div>
                </div>
                <div
                  className={cx("details_box")}
                  style={{ marginLeft: "60px" }}
                >
                  <h1 className={cx("title")}>{product?.name}</h1>

                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Trạng thái:</span>
                    <span className={cx("itemValue")}>
                      {product?.active === true ? "Đang hoạt động" : "Tạm dừng"}
                    </span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Danh mục sản phẩm:</span>
                    <span className={cx("itemValue")}>
                      {category_id.map((category) =>
                        category._id === product?.category_id
                          ? category.name
                          : ""
                      )}
                    </span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Giá gốc:</span>
                    <span className={cx("itemValue")}>
                      {" "}
                      {product?.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Giá sale:</span>
                    <span className={cx("itemValue")}>
                      {product?.price_sale != null
                        ? product?.price_sale.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                        : ""}
                    </span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Số lượng trong kho:</span>
                    <span className={cx("itemValue")}>{product?.num}</span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Số lượng đã bán:</span>
                    <span className={cx("itemValue")}>
                      {product?.mun_buy ? product?.mun_buy : 0}
                    </span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Ngày tạo:</span>
                    <span className={cx("itemValue")}> {moment(product?.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Ngày chỉnh sửa:</span>
                    <span className={cx("itemValue")}> {moment(product?.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
                  </div>
                  <div className={cx("detailItem")}>
                    <span className={cx("itemKey")}>Content </span>
                    <span className={cx("itemValue")}>{product?.content}</span>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", margin: 50 }}>
      <Skeleton height={300} width={300} />
      <div style={{ display: "flex", direction: "collumn" }}>
        <Skeleton
          count={5}
          height={30}
          width={250}
          style={{ marginBottom: 20 }}
        />
      </div>
    </div>
  );
}

export default SingleProduct;
