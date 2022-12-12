import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { DataContext } from "~/customer/components/dataProvider/DataProvider";
import Header from "~/customer/Layout/components/header/Header";
import Price from "../shop/component/price/Price";
import "./Cart.scss";
import CartItem from "./component/CartItem/CartItem";
import NoProduct from "./component/noproduct/NoProduct";

function Cart(props) {
  TabTitle("Giỏ hàng");
  const value = useContext(DataContext);
  const [cart, setCart] = value.cart;
  const [search, setSearch] = useState();
  const [total, setTotal] = useState(0);
  /// total bill
  useEffect(() => {
    const res = cart.reduce((total, item) => {
      return (
        total +
        (item.price_sale != null
          ? item.price_sale * item.cartNum
          : item.price * item.cartNum)
      );
    }, 0);
    setTotal(res);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <>
        <Header search={search} onChange={(e) => setSearch(e.target.value)} />
        <NoProduct />
      </>
    );
  } else {
    return (
      <>
        <Header search={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="container__wrapper">
          <div className="main-header">
            <a href="/" className="logo">
              <h1 className="logo-text">Girl Bag</h1>
            </a>
            <div className="breadcrumb-small">
              <NavLink to="/">Trang chủ /</NavLink>
              <span>Giỏ hàng của bạn</span>
            </div>
          </div>
          <form className="cart table-wrap medium--hide small--hide">
            <table className="cart-table full table--responsive">
              <thead className="cart__row cart__header-labels">
                <tr>
                  <th colspan="2" className="text-center">
                    Thông tin chi tiết sản phẩm
                  </th>
                  <th className="text-center">Đơn giá</th>
                  <th className="text-center">Số lượng</th>
                  <th className="text-center">Tổng giá</th>
                </tr>
              </thead>
              <CartItem cart={cart} setCart={setCart} />
            </table>
            <div className="cart__row">
              <div className="grid__item text-center one-third small--one-whole">
                <p>
                  <span className="cart__subtotal-title">Tổng tiền</span>
                  <span className="cart__subtotal">
                    {total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
                <button className="btnCart">
                  <NavLink to="/payment">Thanh toán</NavLink>
                </button>
              </div>
              
              
            </div>
            
          </form>
        </div>
      </>
    );
  }
}

Cart.propTypes = {};

export default Cart;
