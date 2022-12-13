import classNames from "classnames/bind";
import { Image } from "cloudinary-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import * as shipperService from "~/admin/services/shipperService";
import * as orderService from "~/admin/services/orderService";

import Price from "~/customer/pages/shop/component/price/Price";
import styles from "./DetailOrder.module.scss";
import Header from "~/shipper/Layout/Header/Header";

function DetailOrderShipper() {
  const cx = classNames.bind(styles);
  const { id } = useParams();

  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState();
  const [orderdetail, setOrderdetail] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await orderService.getAOrder(id);
      setOrder(response?.order[0]);
      setOrderStatus(response?.order[0].status);
      setOrderdetail(response?.order[0].orderProducts);
    };
    fetchApi();
  }, [id]);

  const handleshipperAssignOrder = async (e) => {
    e.preventDefault();
      const res = await shipperService.shipperAssignOrder(id);
      if (res.data.success === true) {
        Swal.fire("Xác nhận giao hàng thành công");
        setOrderStatus("shipping");
      }
  };
  const handleshippedOrder = async (e) => {
    e.preventDefault();
      const res = await shipperService.shippedOrder(id);
      if (res.data.success === true) {
        Swal.fire("Đơn hàng đã giao thành công");
        setOrderStatus("shipped");
      }
  };

  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>
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
                        <span className={cx("itemKey")}>
                          Địa chỉ nhận hàng:
                        </span>
                        <span className={cx("itemValue")}>
                          {order.user?.address}
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
                        <span className={cx("itemKey")}>
                          Thông tin sản phẩm:
                        </span>
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
                                              <td
                                                className={cx("product-image")}
                                              >
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
                                                {/* <div
                                                className={cx(
                                                  "product-description-name"
                                                )}
                                              >
                                                {item.product?.name}
                                              </div> */}

                                                {item.product?.price_sale >
                                                0 ? (
                                                  <div
                                                    className={cx(
                                                      "product-description-price"
                                                    )}
                                                  >
                                                    {item.product?.price_sale.toLocaleString(
                                                      "it-IT",
                                                      {
                                                        style: "currency",
                                                        currency: "VND",
                                                      }
                                                    )}
                                                  </div>
                                                ) : (
                                                  <div
                                                    className={cx(
                                                      "product-description-price"
                                                    )}
                                                  >
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

                                              <td
                                                className={cx("product-price")}
                                              >
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
                                            <Price
                                              price={order?.transportFee}
                                            />
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
                              disabled={
                                orderStatus === "shipping" ? true : false
                              }
                              style={{
                                backgroundColor: "#0d6efd",
                                opacity: orderStatus === "processing" ? 1 : 0.5,
                                color: "white",
                                padding: "5px 10px",
                                marginRight: "20px",
                              }}
                              onClick={handleshipperAssignOrder}
                              
                            >
                              Xác nhận giao hàng
                            </button>

                            <button
                              disabled={
                                orderStatus === "shipping" ? false : true
                              }
                              style={{
                                opacity: orderStatus === "shipping" ? 1 : 0.5,
                                backgroundColor: "#0d6efd",
                                color: "white",
                                padding: "5px 10px",
                                marginRight: "20px",
                              }}
                              onClick={handleshippedOrder}
                            >
                              Giao hàng thành công
                            </button>
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
      </div>
    </div>
  );
}

export default DetailOrderShipper;
