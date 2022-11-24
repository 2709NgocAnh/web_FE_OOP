import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import "./Payment.scss";
import { DataContext } from "~/customer/components/dataProvider/DataProvider";
import config from "~/components/config";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import * as orderService from "~/admin/services/orderService";
import * as registerService from "~/admin/services/registerService";
import Price from "../shop/component/price/Price";
import Header from "~/customer/Layout/components/header/Header";
import Slider from "~/customer/Layout/components/slider/Slider";

export default function Payment() {
  TabTitle("Thanh toán");
  const value = useContext(DataContext);
  const navigate = useNavigate();

  const status = 0;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");
  const [err3, setErr3] = useState("");
  const [err4, setErr4] = useState("");

  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);
  const [f4, setF4] = useState(false);

  const [cart] = value.cart;
  const [total, setTotal] = useState(0);
  const [priceAll, setPriceall] = useState(0);
  const [discount, setDiscount] = useState(20000);
  const [search, setSearch] = useState();
  const priceShip = 30000;
  const [idUser, setIdUser] = useState();

  const fetchApi1 = async () => {
    const response = await registerService.getRegister();
    setIdUser(response.account._id);
    setFullName(response.account.fullName);
    setPhone(response.account.phoneNumber);
    setEmail(response.account.email);
  };
  useEffect(() => {
    fetchApi1();
  }, []);
  useEffect(() => {
    setPriceall(total + 30000 - discount);
  }, [total]);
  useEffect(() => {
    if (fullName === "" && f1) {
      setErr1("Hãy nhập họ và tên");
    } else {
      setErr1("");
    }
  }, [f1, fullName]);
  useEffect(() => {
    if (phone === "" && f2) {
      setErr2("Hãy nhập số điện thoại");
    }
  }, [f2, phone]);
  useEffect(() => {
    if (address === "" && f3) {
      setErr3("Hãy nhập địa chỉ");
    }
  }, [address, f3]);
  useEffect(() => {
    if (email === "" && f4) {
      setErr4("Hãy nhập email");
    }
  }, [email, f4]);
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((total, item) => {
        return item.price_sale
          ? total + item.price_sale * item.cartNum
          : total + item.price * item.cartNum;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);
  const orderProducts = cart.map((item) => ({
    product: item._id,
    quantity: item.cartNum,
    price: item.price_sale,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchApi(
      idUser,
      orderProducts,
      phone,
      address,
      note,
      discount,
      priceShip,
      priceAll,
      status
    );
    localStorage.removeItem("cart");
    navigate("/shop");
  };

  const fetchApi = async (a, b, c, d, e, f, g, h, i) => {
    const response = await orderService.newOrder(a, b, c, d, e, f, g, h, i);
  };

  return (
    <>
      <Header search={search}  onChange={(e) => setSearch(e.target.value)}/>
      <div className="row wrap">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="main">
            <div className="main-header">
              <a href="/" className="logo">
                <h1 className="logo-text">Outerity</h1>
              </a>

              <ul className="breadcrumb">
                <li className="breadcrumb-item breadcrumb-item-current">
                  <NavLink
                    className={(nav) => ({ active: nav.isActive })}
                    to={config.routes.payment}
                  >
                    Giỏ hàng
                  </NavLink>
                </li>

                <li className="breadcrumb-item breadcrumb-item-current">
                  Thông tin giao hàng
                </li>
              </ul>
            </div>
            <div className="main-content">
              <div className="step">
                <div className="step-sections steps-onepage" step="1">
                  <div className="section">
                    <div className="section-header">
                      <h2 className="section-title">Thông tin giao hàng</h2>
                    </div>
                    <div className="section-content section-customer-information no-mb">
                      <div className="fieldset">
                        <div className="field field-required  ">
                          <div className="field-input-wrapper">
                            <label
                              className="field-label"
                              htmlFor="billing_address_full_name"
                            >
                              Họ và tên
                            </label>
                            <input
                              className="field-input"
                              placeholder="Họ và tên"
                              type="text"
                              required
                              onChange={(e) => {
                                setFullName(e.target.value);
                                setF1(true);
                              }}
                              value={fullName}
                            />
                            <span>{err1}</span>
                          </div>
                        </div>

                        <div className="field  field-two-thirds  ">
                          <div className="field-input-wrapper">
                            <label
                              className="field-label"
                              htmlFor="checkout_user_email"
                            >
                              Email
                            </label>
                            <input
                              placeholder="Email"
                              className="field-input"
                              type="email"
                              required
                              name="email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setF4(true);
                              }}
                              value={email}
                            />
                            <span>{err4}</span>
                          </div>
                        </div>
                        <div className="field field-required field-third  ">
                          <div className="field-input-wrapper">
                            <label
                              className="field-label"
                              htmlFor="billing_address_phone"
                            >
                              Số điện thoại
                            </label>
                            <input
                              placeholder="Số điện thoại"
                              className="field-input"
                              name="phone"
                              onChange={(e) => {
                                setPhone(e.target.value);
                                setF2(true);
                              }}
                              value={phone}
                            />
                            <span>{err2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section-content">
                      <div className="fieldset">
                        <form onSubmit={handleSubmit} className="field default">
                          <div>
                            <div className="field-input-wrapper">
                              <label className="field-label">Địa chỉ</label>
                              <input
                                placeholder="Địa chỉ"
                                className="field-input"
                                type="text"
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                  setF3(true);
                                }}
                                value={address}
                              />
                              <span>{err3}</span>
                            </div>
                          </div>
                          <div>
                            <div className="field-input-wrapper">
                              <label
                                className="field-label"
                                for="billing_address_address1"
                              >
                                Chú Thích
                              </label>
                              <textarea
                                placeholder="Chú thích"
                                className="field-input"
                                onChange={(e) => {
                                  setNote(e.target.value);
                                }}
                                value={note}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div id="change_pick_location_or_shipping">
                      <div id="section-payment-method" className="section">
                        <div className="section-header">
                          <h2 className="section-title">
                            Phương thức thanh toán
                          </h2>
                        </div>
                        <div className="section-content">
                          <div className="content-box">
                            <div className="radio-wrapper content-box-row">
                              <label className="radio-label">
                                <div className="radio-input payment-method-checkbox">
                                  <input
                                    className="input-radio"
                                    type="radio"
                                    checked=""
                                  />
                                </div>
                                <div className="radio-content-input">
                                  <img
                                    className="main-img"
                                    src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                                    alt=""
                                  />
                                  <div>
                                    <span className="radio-label-primary">
                                      Thanh toán khi giao hàng (COD)
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step-footer">
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="step-footer-continue-btn btn"
                    >
                      <span className="btn-content">Hoàn tất đơn hàng</span>
                      <i className="btn-spinner icon icon-button-spinner"></i>
                    </button>
                  </div>
                  <NavLink to={config.routes.cart}>Giỏ hàng</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-xs-12 content">
          {cart.map((item) => (
            <div key={item._id}>
              <div className="sidebar">
                <div className="sidebar-content">
                  <table className="product-table">
                    <tbody>
                      <tr className="product">
                        <td className="product-image">
                          <div className="product-thumbnail">
                            <Image
                              className="product-thumbnail-image"
                              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                              publicId={item.images[1]}
                            />
                            <div className="product-thumbnail-quantity">
                              {item.cartNum}
                            </div>
                          </div>
                        </td>
                        <td className="product-description">
                          <div className="product-description-name">
                            {item.name}
                          </div>
                          {item.price_sale != null ? (
                            <Price price={item.price_sale} />
                          ) : (
                            <div className="product-description-price">
                              <Price price={item.price} />
                            </div>
                          )}
                        </td>
                        <td className="product-price">
                          <div className="product-price-des">
                            <Price
                              price={
                                item.price_sale !== null
                                  ? item.price_sale * item.cartNum
                                  : item.price * item.cartNum
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
          <div className="sidebar">
            <div className="sidebar-content">
              <table className="product-table">
                <thead>
                  <tr className="product">
                    <th style={{ textAlign: "left" }}>
                      <div>Mô tả</div>
                    </th>
                    <th style={{ textAlign: "right", paddingRight: "35px" }}>
                      <div>Giá</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="product">
                    <td className="total-line-name">Tạm tính</td>
                    <td className="total-line-price">
                      <div>
                        {total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="total-line-name">Phí vận chuyển</td>
                    <td className="total-line-price">
                      <div>
                        {priceShip.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="total-line-name">Discount</td>
                    <td className="total-line-price">
                      <div>
                        {discount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <strong>Tổng cộng:</strong>
                    </td>
                    <td className="total-line-price">
                      <strong
                        style={{
                          fontSize: "1.6rem",
                        }}
                      >
                        {priceAll.toLocaleString("it-IT", {
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
    </>
  );
}
