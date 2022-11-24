import {
  faCircleQuestion,
  faEarthAsia,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "Đăng Ký",
    to: "/register",
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Đăng nhập",
    to: "/sign-in",
  },
];
const USER_MENU = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "View profile",
    to: "/profile",
  },
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: "Log out",
    to: "/sign-in",
    separate: true,
  },
];
const MENU_HEADER = [
    {
      title: "SHOP",
      to: "/shop",
      dropdown:true
    },
    {
      title: "NEW",
      to: "/product/new",
    },
    {
        title: "ABOUT",
        to: "/about",
      },
      {
        title: "SALE",
        to: "/product/sale",
      },
      {
        title: "CONTACT",
        to: "/contact",
      },
  ];
export { USER_MENU, MENU_ITEMS,MENU_HEADER };
