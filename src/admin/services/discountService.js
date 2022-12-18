import * as httpRequest from "~/admin/utils/httpRequest";

export const getDiscount = async () => {
  try {
    const res = await httpRequest.get(`discount/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getHomeDiscountList = async () => {
    try {
      const res = await httpRequest.get(`discount/homeDiscountList`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
export const removeDiscount = async (id) => {
  try {
    const res = await httpRequest.post(`discount/delete`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const newDiscount = async (
  code,
  discount,
  minium_order,
  purchase_limit,
  expiration_date,
  content,
  active
) => {
  try {
    const res = await httpRequest.post(`discount/add`, {
      code,
      discount,
      minium_order,
      purchase_limit,
      expiration_date,
      content,
      active,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const editDiscount = async (id, code,
  discount,
  minium_order,
  purchase_limit,
  expiration_date,
  content,
  active) => {
  try {
    const res = await httpRequest.post(`discount/update`, { id,  code,
      discount,
      minium_order,
      purchase_limit,
      expiration_date,
      content,
      active });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getADiscount = async (id) => {
  try {
    const res = await httpRequest.get(`discount/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getDiscountByCode = async (code) => {
    try {
      const res = await httpRequest.get(`discount/getDiscountByCode/${code}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
