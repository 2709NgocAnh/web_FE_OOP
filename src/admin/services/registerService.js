import axios from "axios";
import * as httpRequest from "~/admin/utils/httpRequest";
import Swal from "sweetalert2";

export const LoginRegister = async (accessToken) => {
  try {
    const res = await axios
      .create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .get(`auth/secret`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getRegister = async () => {
  try {
    const res = await httpRequest.get(`auth/secret`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const veryfyEmail = async (email, otp) => {
  try {
    const res = await httpRequest.post(`auth/verify-email`, { email, otp });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const veryfyForgetPassword = async (email, otp) => {
  try {
    const res = await httpRequest.post(`auth/verify-forgot-password`, {
      email,
      otp,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const forgetPassword = async (email) => {
  try {
    const res = await httpRequest.post(`auth/forgot-password`, { email });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const signInRegister = async (email, password) => {
  try {
    const res = await axios
      .create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post(`auth/signIn`, { email, password });
    return res;
  } catch (error) {
    if (error.response.data.message === "Login failed") {
        return(
      await Swal.fire({
        icon: "error",
        text: "Tài khoản này cần xác thực mail😰😰",
        timer: 4000,
            }));
    } else {
      await Swal.fire({
        icon: "error",
        text: "Email hoặc mật khẩu chưa chính xác😰😰",
        timer: 4000,
      });
    }
  }
};
export const signUpRegister = async (
  fullName,
  email,
  phoneNumber,
  password,
  address,
  role
) => {
  try {
    const res = await httpRequest.post(`auth/signUp`, {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      role,
    });
    return res;
  } catch (error) {
    console.log(error.response.data.details[0].message)
    Swal.fire({
      icon: "error",
      text: `${error.response.data.details[0].message} 🙌👀`,
    });
  }
};
export const UpdateRegister = async (
  id,
  fullName,
  email,
  phoneNumber,
  password,
  address,
  role,
  active
) => {
  try {
    const res = await httpRequest.post(`user/update`, {
      id,
      fullName,
      email,
      phoneNumber,
      password,
      address,
      role,
      active,
    });
    return res;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Email này đã tồn tại  🙌👀",
    });
  }
};
