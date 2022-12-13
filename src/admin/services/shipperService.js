import * as httpRequest from "~/admin/utils/httpRequest";
import Swal from "sweetalert2";

export const getListOrderProcessing = async () => {
  try {
    const res = await httpRequest.get(`order/listForShipper`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const shipperAssignOrder = async(order_id) => {
    try {
      const res = await httpRequest.post(`order/shipperAssignOrder`,{order_id});
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  export const shippedOrder = async (order_id) => {
    try {
      const res = await httpRequest.post(`order/shippedOrder`,{order_id});
      return res;
    } catch (error) {
      console.log(error);
    }
  };