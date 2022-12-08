import "./Widget.scss";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import * as productService from "~/admin/services/productService";
import * as categoryService from "~/admin/services/categoryService";
import * as orderService from "~/admin/services/orderService";
import * as userService from "~/admin/services/userService";
import Cookies from "js-cookie";

// import { Link } from 'react-router-dom';
const Widget = ({ type }) => {
  const [countProduct, setCountProduct] = useState(0);
  const [countCategory, setCountCategory] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [countUser, setCountUser] = useState(0);

  let data;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getListProduct(1);
      const response1 = await categoryService.getCategory(1);
      const response2 = await orderService.getOrder(1);
      const response3 = await userService.getUser(1);

      setCountProduct(response?.totalItem);
      setCountCategory(response1?.totalItem);
      setCountOrder(response2?.totalItem);
      setCountUser(response3?.totalItem);
    };
    Cookies.get("role")==="admin"&& fetchApi();
  }, []);
  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        to: "user",
        count: "",
        isMoney: false,
        link: "See all users",
        count: countUser,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        count: countOrder,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCT",
        isMoney: false,
        link: "View net earnings",
        count: countProduct,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "category":
      data = {
        title: "CATEGORY",
        isMoney: false,
        link: "See details",
        count: countCategory,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget ">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.count}
        </span>
        {/* <Link to={`${data.to}`} className="link">
                    {data.link}
                </Link> */}
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
