const routes = {
  admin: "/admin",
  customer: "/",
  shop:"/shop",
  payment:"/payment",
  profile:"/profile",
  cart:"/cart",
  vieworder:"/vieworder",
  //contact
  feedback:"/feedback",
  contact:"/contact",
  //about
  about:"/about",
  privacyPolicy:"/privacyPolicy",
  returnPolicy:"/returnPolicy",
  termsService:"/TermsService",
  //user
  listuser: "/admin/user",
  newuser: "/admin/user/newuser",
  edituser: "/admin/user/edituser/:id",

  //Product
  listproduct: "/admin/product",
  singleproduct: "/admin/product/:id",
  detailproduct: "/product/detail/:id",
  newproduct: "/admin/product/newproduct",
  editproduct: "/admin/product/editproduct/:id",

  //category
  listcategory: "/admin/category",
  newcategory: "/admin/category/newcategory",
  editcategory: "/admin/category/editcategory/:id",
  //order
  listorder: "/admin/order",
  singleorder: "/admin/order/:id",
  //Slider
  listslider: "/admin/slider",
  newslider: "/admin/slider/newslider",
  editslider: "/admin/slider/editslider/:id",
  //feedback
  listfeedback: "/admin/feedback",
  //discount
  listdiscount: "/admin/discount",
  newdiscount: "/admin/discount/newdiscount",
  editdiscount: "/admin/discount/editdiscount/:id",

  singleprofile: "/admin/profile",
  editprofile: "/admin/profile/editprofile",
  //register
  register: "/register",
  signin:"/sign-in"
};

export default routes;
