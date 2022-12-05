import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
export const DataContext = createContext();
export const DataProvider = (props) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [numCart, setNumCart] = useState(0);
  useEffect(() => {
    const num = cart.reduce((total, val) => total + val.num, 0);
    setNumCart(num);
  }, [cart]);
  const addCart = (product, num) => {
    const prdIndex = cart.findIndex((val) => val._id === product._id);
    if (prdIndex === -1) {
      setCart([...cart, { ...product, cartNum: num }]);
    } else {
      const newCart = [...cart];
      newCart[prdIndex].cartNum += num;
      setCart(newCart);
    }
    Swal.fire("Thank You!", "Sản phẩm đã được thêm vào giỏ hàng!", "success");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const value = {
    cart: [cart, setCart],
    numCart: [numCart, setNumCart],
    addCart: addCart,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
