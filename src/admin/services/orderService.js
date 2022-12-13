import * as httpRequest from "~/admin/utils/httpRequest";
import Swal from "sweetalert2";

export const getOrder = async (pageIndex) => {
  try {
    const res = await httpRequest.get(`order?pageIndex=${pageIndex}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const listPendingOrder = async () => {
    try {
      const res = await httpRequest.get(`order/listPendingOrder`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  
export const newOrder = async (
  orderProducts,
  phone,
  address,
  note,
  discount,
  transportFee,
  totalPrice
) => {
  try {
    const res = await httpRequest.post(`order/add`, {
        orderProducts,
        phone,
        address,
        note,
        discount,
        transportFee,
        totalPrice
    });
    return res;
  } catch (error) {
    Swal.fire({
        icon: "error",
        text: `${error.response.data.message} 🙌👀`,
      });
  }
};
export const editOrder = async (id, status) => {
  try {
    const res = await httpRequest.post(`order/update`,{ id,status});
    return res;
  } catch (error) {
    // await Swal.fire({
    //     icon: 'error',
    //     text: 'Bạn phải chọn đúng qui trình😰😰',
    //     timer:4000
    //   })
  }
};
export const cancelOrder = async (order_id) => {
    try {
      const res = await httpRequest.post(`order/cancel`, {order_id});
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
