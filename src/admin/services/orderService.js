import * as httpRequest from "~/admin/utils/httpRequest";

export const getOrder = async () => {
  try {
    const res = await httpRequest.get(`order`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const newOrder = async (
  user,
  orderProducts,
  phone,
  address,
  note,
  discount,
  transportFee,
  totalPrice,status
) => {
  try {
    const res = await httpRequest.post(`order/add`, {
        user,
        orderProducts,
        phone,
        address,
        note,
        discount,
        transportFee,
        totalPrice,status
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const editOrder = async (id, status) => {
  try {
    const res = await httpRequest.post(`order/update`, { id, status });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAOrder = async (id) => {
  try {
    const res = await httpRequest.get(`order/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getListOrder = async () => {
  try {
    const res = await httpRequest.get(`order/listOrderByUser`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
