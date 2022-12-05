import { DeleteOutlined } from "@ant-design/icons";
import { Image } from "cloudinary-react";
import { NavLink } from "react-router-dom";
import Price from "~/customer/pages/shop/component/price/Price";
import "./CartItem.scss";

function CartItem(props) {
  const { cart, setCart } = props;

  return (
    <>
      {cart?.map((item, index) => (
        <tbody key={index}>
          <tr className="cart__row table__section">
            <td data-label="Sản phẩm">
              <NavLink
                to={`/product/detail/${item._id}`}
                className="cart__image"
              >
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                  publicId={item.images[0]}
                />
              </NavLink>
            </td>
            <td className="cart-product-title">
              <NavLink to={`/product/detail/${item._id}`} className="h4">
                {item.name}
              </NavLink>
              <button
                className="cart__remove"
                onClick={(e) => {
                e.preventDefault()
                  setCart((prev) => prev.filter((val) => val._id !== item._id));
                }}
              >
                <DeleteOutlined />
              </button>
            </td>
            <td className="cart-product-price" data-label="Đơn giá">
              <Price
                price={item.price_sale != null ? item.price_sale : item.price}
              />
            </td>
            <td data-label="Số lượng">
              <div className="cart-product-amount">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    const newCart = [...cart];
                    if (newCart[index].cartNum > 1) newCart[index].cartNum -= 1;
                    setCart(newCart);
                  }}
                >
                  -
                </button>
                <span>{item.cartNum}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    const newCart = [...cart];
                                        if (newCart[index].num > newCart[index].cartNum) newCart[index].cartNum += 1;
                                        setCart(newCart);
                  }}
                >
                  +
                </button>
              </div>
            </td>
            <td data-label="Tổng giá" className="cart-product-price text-right">
              <span className="h3">
                <Price
                  price={
                    item.price_sale !== null
                      ? item.price_sale * item.cartNum
                      : item.price * item.cartNum
                  }
                />
              </span>
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}

CartItem.propTypes = {};

export default CartItem;
