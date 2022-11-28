import * as httpRequest from "~/admin/utils/httpRequest";

export const getCategory = async () => {
  try {
    const res = await httpRequest.get(`category/`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const removeCategory = async (id) => {
  try {
    const res = await httpRequest.post(`category/delete`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const newCategory = async (name, status) => {
  try {
    const res = await httpRequest.post(`category/add`, { name, status });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const editCategory = async (id, name, active) => {
  try {
    const res = await httpRequest.post(`category/update`, { id, name, active});
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getACategory = async (id) => {
  try {
    const res = await httpRequest.get(`category/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
