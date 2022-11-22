import styles from "./Single.module.scss";
import classNames from "classnames/bind";
// import "./Payment.scss"
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { confirm } from "react-confirm-box";
import * as orderService from "~/admin/services/orderService";
import Image from "~/components/image/Image";

function SingleOrder() {
  const cx = classNames.bind(styles);
  const { id } = useParams();

  const [order, setOrder] = useState();
  const [orderdetail, setOrderdetail] = useState();
  const [orderstatus, setOrderstatus] = useState(1);
  const listorderstatus = [
    { id: 2, name: "Xác nhận đơn hàng" },
    { id: 3, name: "Đang giao" },
    { id: 4, name: "Đã giao" },
  ];
  useEffect(() => {
    const fetchApi = async () => {
      const response = await orderService.getAOrder(id);
      setOrder(response.order[0]);
      setOrderstatus(response.order[0].status)
      setOrderdetail(response.order[0].orderProducts);
    };
    fetchApi();
  }, [id]);

  const handleOnclick =async (status_id, status_name) => {
      const result = await confirm(
        `Bạn có chắc chắn muốn chọn ${status_name} cho đơn hàng không?`
      );
      if (!result) {
        return;
      }
        const fetchApi = async () => {
          const response = await orderService.editOrder(id,status_id)
          setOrderstatus(status_id);
        };
        fetchApi();
      };
    
  return (
    <div className={cx("single")}>
      <div className={cx("singleContainer")}>
        <div className={cx("top")}>
          <div className={cx("left")}>
            <h1 className={cx("title")}>Thông tin đơn hàng</h1>

            <div className={cx("item")}>
              <div className={cx("details")}>
                <div className={cx("detailItem")}>
                  <span className={cx("itemKey")}>Mã đơn hàng:</span>
                  <span className={cx("itemKey")}>{order?.id}</span>
                </div>
                <div className={cx("detailItem")}>
                  <span className={cx("itemKey")}>Tên khách hàng:</span>
                  <span className={cx("itemValue")}> {order?.user}</span>
                </div>
                
                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Số điện thoại:</span>
                                    <span className={cx('itemValue')}>{order?.phone}</span>
                                </div>
                <div className={cx('detailItem')}>
                                    <span className={cx('itemKey')}>Địa chỉ nhận hàng:</span>
                                    <span className={cx('itemValue')}>{order?.address}</span>
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
                    {moment(order?.createdAt).format("DD/MM/YYYY HH:mm")}
                  </span>
                </div>
                <div className={cx("detailItem")}>
                  <span className={cx("itemKey")}>Thông tin sản phẩm:</span>
                </div>
                <div className={cx("detailItem")}>
                  <div className="row wrap">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div >
                        {orderdetail?.map((item) => (
                          <div key={item._id}>
                            <div
                              className={cx("sidebar")}
                            >
                              <div className={cx("sidebar-content")}>
                                <table className={cx("product-table")}>
                                  <tbody>
                                    <tr className={cx("product")}>
                                      <td className={cx("product-image")}>
                                        <div
                                          className={cx("product-thumbnail")}
                                        >
                                          <Image
                                            className={cx(
                                              "product-thumbnail-image"
                                            )}
                                            alt={item.product_name}
                                            src=""
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
                                      <td className={cx("product-description")}>
                                        <div
                                          className={cx(
                                            "product-description-name"
                                          )}
                                        >
                                          {item.product}
                                        </div>
                                        {/* {item.price_sale != null ? (
                                                <>
                                                  <del>
                                                    <span className="product-description-name order-summary-emphasis">
                                                      {item.price.toLocaleString(
                                                        "it-IT",
                                                        {
                                                          style: "currency",
                                                          currency: "VND",
                                                        }
                                                      )}{" "}
                                                    </span>
                                                  </del>
                                                  <span className="product-description-name order-summary-emphasis">
                                                    {item.price_sale.toLocaleString(
                                                      "it-IT",
                                                      {
                                                        style: "currency",
                                                        currency: "VND",
                                                      }
                                                    )}{" "}
                                                  </span>
                                                </>
                                              ) : ( */}
                                        <div
                                          className={cx(
                                            "product-description-price"
                                          )}
                                        >
                                          {item.price.toLocaleString("it-IT", {
                                            style: "currency",
                                            currency: "VND",
                                          })}{" "}
                                        </div>
                                        {/* ) */}
                                      </td>

                                      <td className={cx("product-price")}>
                                        <span
                                          className={cx("product-price-des")}
                                        >
                                          {(
                                            item.price * item.quantity
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
                        ))}
                        <div className={cx("sidebar")}>
                          <div className={cx("sidebar-content")}>
                            <table className={cx("product-table")}>
                              <thead>
                                <tr className={cx("product")}>
                                  <th style={{textAlign:'left'}}>
                                    <span>Mô tả</span>
                                  </th>
                                  <th style={{textAlign:'right',paddingRight:'35px'}}>
                                    <span>Giá</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className={cx("product")}>
                                  <td className={cx("total-line-name")}>
                                    Tạm tính
                                  </td>
                                  <td className={cx("total-line-price")}>
                                    <span>
                                      {order?.totalPrice.toLocaleString(
                                        "it-IT",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </span>
                                  </td>
                                </tr>

                                <tr>
                                  <td className={cx("total-line-name")}>
                                    Phí vận chuyển
                                  </td>
                                  <td className={cx("total-line-price")}>
                                    <span>
                                      {order?.transportFee.toLocaleString(
                                        "it-IT",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={cx("total-line-name")}>
                                    Discount
                                  </td>
                                  <td className={cx("total-line-price")}>
                                    <span>
                                      {order?.discount.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
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
                                      {(
                                        order?.totalPrice -
                                        order?.transportFee -
                                        order?.discount
                                      ).toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
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
                      {listorderstatus?.map((status) => (
                        <button
                          disabled={status.id <= orderstatus ? true : false}
                          style={{
                            backgroundColor: "#0d6efd",
                            opacity: status.id <= orderstatus ? "0.5" : "1",
                            color: "white",
                            padding: "5px 10px",
                            marginRight: "20px",
                          }}
                          onClick={() => {
                            handleOnclick(status.id, status.name);
                          }}
                        >
                          {status.name}
                        </button>
                      ))}
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

export default SingleOrder;
