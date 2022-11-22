import * as httpRequest from "~/admin/utils/httpRequest";

export const getRegister = async (email, password) => {
  try {
    const res = await httpRequest.get(`auth/secret`, { email, password });
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
