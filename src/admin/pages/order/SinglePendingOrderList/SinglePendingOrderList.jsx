import classNames from "classnames/bind";
import { Image } from "cloudinary-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as orderService from "~/admin/services/orderService";
import Price from "~/customer/pages/shop/component/price/Price";
import styles from "./SinglePendingOrderList.module.scss";

function SinglePendingOrderList() {
  const cx = classNames.bind(styles);
  const { id } = useParams();

  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("pending");
  const [orderdetail, setOrderdetail] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await orderService.getAOrder(id);
      setOrder(response?.order[0]);
      setStatus(response?.order[0].status);
      setOrderdetail(response?.order[0].orderProducts);
    };
    fetchApi();
  }, [id]);

  const handleOnclickCancel = async () => {
    const result = await Swal.fire({
      title: `<strong>Bạn có chắc chắn muốn Hủy đơn hàng không? 🙌👀</strong>`,
      icon: "info",
      html:
        "You can use <b>bold text</b>, " +
        '<a href="//sweetalert2.github.io">links</a> ' +
        "and other HTML tags",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
    if (result.isConfirmed === true) {
      return;
    }
    const fetchApi = async () => {
      await orderService.cancelOrder(id);
    };
    fetchApi();
  };
  const handleshippedOrder = async () => {
    const result = await Swal.fire({
      title: `<strong>Bạn có chắc chắn muốn xác nhận đơn hàng không? 🙌👀</strong>`,
      icon: "info",
      html:
        "You can use <b>bold text</b>, " +
        '<a href="//sweetalert2.github.io">links</a> ' +
        "and other HTML tags",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
    if (result.isConfirmed === true) {
      return;
    }
    const fetchApi = async () => {
      await orderService.editOrder(id,status);
    };
    fetchApi();
  };
  
  return (
    <div>
      <Navbar />
      <div className={cx("container")}>
        <Sidebar />
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
                                                <div
                                                  className={cx(
                                                    "product-description-name"
                                                  )}
                                                >
                                                  {item.product?.product}
                                                </div>

                                                <div
                                                  className={cx(
                                                    "product-description-price"
                                                  )}
                                                >
                                                  <Price
                                                    price={
                                                      item.product?.price_sale
                                                    }
                                                  />
                                                </div>
                                              </td>

                                              <td
                                                className={cx("product-price")}
                                              >
                                                <span
                                                  className={cx(
                                                    "product-price-des"
                                                  )}
                                                >
                                                  <Price
                                                    price={
                                                      item.product?.price_sale *
                                                      item.quantity
                                                    }
                                                  />
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
                                      <tr className={cx("product")}>
                                        <td className={cx("total-line-name")}>
                                          Tạm tính
                                        </td>
                                        <td className={cx("total-line-price")}>
                                          <span>
                                            <Price price={order?.totalPrice} />
                                          </span>
                                        </td>
                                      </tr>

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
                                            }}
                                          >
                                            <Price
                                              price={
                                                order?.totalPrice -
                                                order?.transportFee -
                                                order?.discount
                                              }
                                            />
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
                              
                              style={{
                                backgroundColor: "#0d6efd",
                                color: "white",
                                padding: "5px 10px",
                                marginRight: "20px",
                              }}
                              onClick={() => {
                                handleOnclickCancel()
                              }}
                            >
                              Hủy đơn
                            </button>
                            
                              <button
                             
                                style={{
                                    opacity:status === "shipping" ? 1 : 0.5,
                                  backgroundColor: "#0d6efd",
                                  color: "white",
                                  padding: "5px 10px",
                                  marginRight: "20px",
                                }}
                                onClick={() => {
                                  handleshippedOrder();
                                }}
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

export default SinglePendingOrderList;


