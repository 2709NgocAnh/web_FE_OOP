import Swal from "sweetalert2";
import * as httpRequest from "~/admin/utils/httpRequest";

export const getSlider = async () => {
  try {
    const res = await httpRequest.get(`slider/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const removeSlider = async (id) => {
  try {
    const res = await httpRequest.post(`slider/delete`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const newSlider = async (name, content, active, image) => {
  try {
    const res = await httpRequest.post(`slider/add`, {
      name,
      content,
      active,
      image,
    });
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
export const editSlider = async (
  id,
  name,
  content,
  active,
  changedImg,
  image
) => {
  try {
    const res = await httpRequest.post(`slider/update`, {
      id,
      name,
      content,
      active,
      changedImg,
      image,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getASlider = async (id) => {
  try {
    const res = await httpRequest.get(`slider/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
