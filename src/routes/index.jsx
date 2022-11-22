import config from "~/components/config";
import DefaultLayoutAdmin from "~/admin/Layout/DefaultLayoutAdmin";
import DefaultLayout from "~/customer/Layout/DefaultLayout";
import Home from "~/admin/pages/home/Home";
import ListOrder from "~/admin/pages/order/ListOrder/ListOrder";
import SingleOrder from "~/admin/pages/order/SingleOrder/SingleOrder";
//Product
import ListProduct from "~/admin/pages/product/ListProduct/ListProduct";
import NewProduct from "~/admin/pages/product/NewProduct/NewProduct";
import SingleProduct from "~/admin/pages/product/SingleProduct/SingleProduct";
import EditProduct from "~/admin/pages/product/EditProduct/EditProduct";
//User
import EditUser from "~/admin/pages/user/EditUser/EditUser";
import ListUser from "~/admin/pages/user/ListUser/ListUser";
import NewUser from "~/admin/pages/user/NewUser/NewUser";
//Category
import ListCategory from "~/admin/pages/category/ListCategory/ListCategory";
import NewCategory from "~/admin/pages/category/NewCategory/NewCategory";
import EditCategory from "~/admin/pages/category/EditCategory/EditCategory";
//Profile
import EditProfile from "~/admin/pages/profile/EditProfile/EditProfile";
import SingleProfile from "~/admin/pages/profile/SingleProfile/SingleProfile";
//Slider
import ListSlider from "~/admin/pages/slider/ListSlider/ListSlider";
import NewSlider from "~/admin/pages/slider/NewSlider/NewSlider";
import EditSlider from "~/admin/pages/slider/EditSlider/EditSlider";
//Feedback
import ListFeedBack from "~/admin/pages/feedback/ListFeedBack/ListFeedBack";
//Discount
import ListDiscount from "~/admin/pages/discount/ListDiscount/ListDiscount";
import NewDiscount from "~/admin/pages/discount/NewDiscount/NewDiscount";
import EditDiscount from "~/admin/pages/discount/EditDiscount/EditDiscount";
//user
import Shop from "~/customer/pages/shop/Shop";
import Details from "~/customer/pages/detail/Details";
import About from "~/customer/pages/about/About";
import PrivacyPolicy from "~/customer/pages/about/PrivacyPolicy";
import ReturnPolicy from "~/customer/pages/about/ReturnPolicy";
import TermsService from "~/customer/pages/about/TermsService";
import Payment from "~/customer/pages/payment/Payment";
//register
import Register from "~/customer/pages/register/Register";
import SignIn from "~/customer/pages/signin/SignIn";
import Profile from "~/customer/pages/profile/Profile";
import Contact from "~/customer/pages/contact/Contact";
import Cart from "~/customer/pages/card/Cart";
import ViewOrder from "~/customer/pages/vieworder/ViewOrder";
import FeedBack from "~/customer/pages/contact/FeedBack";
// Public routes
const PRIVATEROUTES = [
  //admin
  { path: config.routes.admin, component: Home, layout: DefaultLayoutAdmin },
  //user
  {
    path: config.routes.listuser,
    component: ListUser,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.newuser,
    component: NewUser,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.edituser,
    component: EditUser,
    layout: DefaultLayoutAdmin,
  },
  //category
  {
    path: config.routes.listcategory,
    component: ListCategory,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.newcategory,
    component: NewCategory,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.editcategory,
    component: EditCategory,
    layout: DefaultLayoutAdmin,
  },
  //product
  {
    path: config.routes.listproduct,
    component: ListProduct,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.singleproduct,
    component: SingleProduct,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.editproduct,
    component: EditProduct,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.newproduct,
    component: NewProduct,
    layout: DefaultLayoutAdmin,
  },
  //order
  {
    path: config.routes.listorder,
    component: ListOrder,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.singleorder,
    component: SingleOrder,
    layout: DefaultLayoutAdmin,
  },
  //slider
  {
    path: config.routes.listslider,
    component: ListSlider,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.newslider,
    component: NewSlider,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.editslider,
    component: EditSlider,
    layout: DefaultLayoutAdmin,
  },
  //feedback
  {
    path: config.routes.listfeedback,
    component: ListFeedBack,
    layout: DefaultLayoutAdmin,
  },
  //discount
  {
    path: config.routes.listdiscount,
    component: ListDiscount,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.newdiscount,
    component: NewDiscount,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.editdiscount,
    component: EditDiscount,
    layout: DefaultLayoutAdmin,
  },
  //profile
  {
    path: config.routes.singleprofile,
    component: SingleProfile,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.editprofile,
    component: EditProfile,
    layout: DefaultLayoutAdmin,
  },
];
const PUBLICROUTES = [
  { path: config.routes.customer, component: Shop, layout: DefaultLayout },
  { path: config.routes.shop, component: Shop, layout: DefaultLayout },
  { path: config.routes.profile, component: Profile, layout: DefaultLayout },
  { path: config.routes.payment, component: Payment, layout: DefaultLayout },
  { path: config.routes.feedback, component: FeedBack, layout: DefaultLayout },
  {
    path: config.routes.vieworder,
    component: ViewOrder,
    layout: DefaultLayout,
  },
  { path: config.routes.about, component: About, layout: DefaultLayout },
  { path: config.routes.contact, component: Contact, layout: DefaultLayout },
  { path: config.routes.cart, component: Cart, layout: DefaultLayout },
  {
    path: config.routes.privacyPolicy,
    component: PrivacyPolicy,
    layout: DefaultLayout,
  },
  {
    path: config.routes.returnPolicy,
    component: ReturnPolicy,
    layout: DefaultLayout,
  },
  {
    path: config.routes.termsService,
    component: TermsService,
    layout: DefaultLayout,
  },
  { path: config.routes.register, component: Register, layout: DefaultLayout },
  { path: config.routes.signin, component: SignIn, layout: DefaultLayout },
  {
    path: config.routes.detailproduct,
    component: Details,
    layout: DefaultLayout,
  },
];

export { PUBLICROUTES, PRIVATEROUTES };
