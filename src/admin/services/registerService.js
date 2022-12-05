import axios from "axios";
import * as httpRequest from "~/admin/utils/httpRequest";

export const LoginRegister = async (accessToken) => {
  try {
    const res = await axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).get(`auth/secret`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getRegister = async () => {
    try {
        const res = await httpRequest.get(`auth/secret`,
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
export const signInRegister = async (email, password) => {
  try {
    const res = await httpRequest.post(`auth/signIn`, { email, password });
    return res;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};
