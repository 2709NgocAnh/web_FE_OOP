import classNames from "classnames/bind";
import styles from "./DetailOrder.module.scss";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as orderService from "~/admin/services/orderService";
import Price from "~/customer/pages/shop/component/price/Price";
import Swal from "sweetalert2";
import Header from "~/customer/Layout/components/header/Header";
import { Image } from "cloudinary-react";
import SideBar from "../sidebar/SideBar";
import * as discountService from "~/admin/services/discountService";

function DetailOrder() {
  const cx = classNames.bind(styles);
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [orderdetail, setOrderdetail] = useState([]);
  const [orderStatus, setOrderStatus] = useState();
  const [codeDiscount, setCodeDiscount] = useState(0);
const status="received"
  useEffect(() => {
    const fetchApi = async () => {
      const response = await orderService.getAOrder(id);
      setOrder(response?.order[0]);
      setOrderStatus(response?.order[0].status);
      setOrderdetail(response?.order[0].orderProducts);
      setCodeDiscount(response?.order[0].discount);
    };
    fetchApi();
  }, [id]);

  const handleOnclick = async () => {
    const result = await Swal.fire({
      title: `<strong>Bạn có chắc chắn muốn Hủy đơn hàng không? 🙌👀</strong>`,
      icon: "info",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
    if (result.isConfirmed === true) {
      const fetchApi = async () => {
        const res = await orderService.cancelOrder(id);
        if (res.data.success === true) {
          Swal.fire("Hủy đơn hàng thành công");
          setOrderStatus("cancel");
        }
      };
      fetchApi();
    }
  };
  const handleOrderReceviced = async (e) => {
    e.preventDefault();
      const fetchApi = async () => {
        const res = await orderService.editOrder(id,status);
        if (res.data.success === true) {
            await Swal.fire("Cảm ơn bạn đã mua hàng tại shop💑");
            await setOrderStatus("received");
          await navigate("/shop");

        }
      };
      fetchApi();
    }
  return (
    <>
      <Header />
      <div className={cx("wrap")}>
        <SideBar />
        <div className={cx("single")}>
          <div className={cx("singleContainer")}>
            <div className={cx("top")}>
              <div className={cx("left")}>
                <h1 className={cx("title")}>Thông tin đơn hàng</h1>

                <div className={cx("item")}>
                  <div className={cx("details")}>
                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>Mã đơn hàng:</span>
                      <span className={cx("itemKey")}>{order.id}</span>
                    </div>
                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>Tên khách hàng:</span>
                      <span className={cx("itemValue")}>
                        {" "}
                        {order.user?.fullName}
                      </span>
                    </div>

                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>Số điện thoại:</span>
                      <span className={cx("itemValue")}>
                        {order.user?.phoneNumber}
                      </span>
                    </div>
                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>Địa chỉ nhận hàng:</span>
                      <span className={cx("itemValue")}>
                        {order.user?.address}
                      </span>
                    </div>
                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>
                        Trạng thái đơn hàng:
                      </span>
                      <span
                        className={cx("itemValue")}
                        style={{
                          color: orderStatus === "cancelled" ? "red" : "black",
                        }}
                      >
                        {orderStatus}
                      </span>
                    </div>
                    {order?.note != null ? (
                      <div className={cx("detailItem")}>
                        <span className={cx("itemKey")}>Chú thích:</span>
                        <span className={cx("itemValue")}>{order?.note}</span>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>Ngày đặt hàng:</span>
                      <span className={cx("itemValue")}>
                        {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                      </span>
                    </div>
                    <div className={cx("detailItem")}>
                      <span className={cx("itemKey")}>Thông tin sản phẩm:</span>
                    </div>
                    <div className={cx("detailItem")}>
                      <div className="row wrap">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                          <div>
                            {orderdetail?.map((item) => {
                              return (
                                <div key={item.product?._id}>
                                  <div className={cx("sidebar")}>
                                    <div className={cx("sidebar-content")}>
                                      <table className={cx("product-table")}>
                                        <tbody>
                                          <tr className={cx("product")}>
                                            <td className={cx("product-image")}>
                                              <div
                                                className={cx(
                                                  "product-thumbnail"
                                                )}
                                              >
                                                <Image
                                                  className={cx(
                                                    "product-thumbnail-image"
                                                  )}
                                                  cloudName={
                                                    process.env
                                                      .REACT_APP_CLOUDINARY_NAME
                                                  }
                                                  publicId={
                                                    item.product?.images[0]
                                                  }
                                                />

                                                <span
                                                  className={cx(
                                                    "product-thumbnail-quantity"
                                                  )}
                                                  aria-hidden="true"
                                                >
                                                  {item.quantity}
                                                </span>
                                              </div>
                                            </td>
                                            <td
                                              className={cx(
                                                "product-description"
                                              )}
                                            >
                                              <div
                                                className={cx(
                                                  "product-description-name"
                                                )}
                                              >
                                                {item.product?.product}
                                              </div>

                                              {item.product?.price_sale > 0 ? (
                                                <div className="product-description-price">
                                                  {item.product?.price_sale.toLocaleString(
                                                    "it-IT",
                                                    {
                                                      style: "currency",
                                                      currency: "VND",
                                                    }
                                                  )}
                                                </div>
                                              ) : (
                                                <div className="product-description-price">
                                                  {item.product?.price.toLocaleString(
                                                    "it-IT",
                                                    {
                                                      style: "currency",
                                                      currency: "VND",
                                                    }
                                                  )}
                                                </div>
                                              )}
                                            </td>

                                            <td className={cx("product-price")}>
                                              <span
                                                className={cx(
                                                  "product-price-des"
                                                )}
                                              >
                                                {(item.product?.price_sale > 0
                                                  ? item.product?.price_sale *
                                                    item.quantity
                                                  : item.product?.price *
                                                    item.quantity
                                                ).toLocaleString("it-IT", {
                                                  style: "currency",
                                                  currency: "VND",
                                                })}
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div className={cx("sidebar")}>
                              <div className={cx("sidebar-content")}>
                                <table className={cx("product-table")}>
                                  <tbody>
                                    {/* <tr className={cx("product")}>
                                      <td className={cx("total-line-name")}>
                                        Tạm tính
                                      </td>
                                      <td className={cx("total-line-price")}>
                                        <span>
                                          <Price price={order?.totalPrice} />
                                        </span>
                                      </td>
                                    </tr> */}

                                    <tr>
                                      <td className={cx("total-line-name")}>
                                        Phí vận chuyển
                                      </td>
                                      <td className={cx("total-line-price")}>
                                        <span>
                                          <Price price={order?.transportFee} />
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className={cx("total-line-name")}>
                                        Discount
                                      </td>
                                      <td className={cx("total-line-price")}>
                                        <span>
                                          <Price price={order?.discount} />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td>
                                        <strong>Tổng cộng:</strong>
                                      </td>
                                      <td className={cx("total-line-price")}>
                                        <strong
                                          style={{
                                            fontSize: "1.6rem",
                                            paddingRight: "50px",
                                          }}
                                        >
                                          {order.totalPrice?.toLocaleString(
                                            "it-IT",
                                            {
                                              style: "currency",
                                              currency: "VND",
                                            }
                                          )}
                                        </strong>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={cx("bottom")}>
                          <button
                            disabled={orderStatus === "pending" ? false : true}
                            style={{
                              backgroundColor: "#0d6efd",
                              opacity:
                                orderStatus !== "cancel" &&
                                (orderStatus === "pending" ||
                                  orderStatus === "processing")
                                  ? "1"
                                  : "0.5",
                              color: "white",
                              padding: "5px 10px",
                              marginRight: "20px",
                            }}
                            onClick={handleOnclick}
                          >
                            Hủy đơn
                          </button>
                          {orderStatus === "shipped" ? (
                            <button
                              style={{
                                backgroundColor: "#0d6efd",
                                color: "white",
                                padding: "5px 10px",
                                marginRight: "20px",
                              }}
                              onClick={handleOrderReceviced}
                            >
                              Xác nhận nhận hàng
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailOrder;
