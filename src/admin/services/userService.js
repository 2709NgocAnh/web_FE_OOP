import * as httpRequest from "~/admin/utils/httpRequest";

export const getUser = async (page) => {
  try {
    const res = await httpRequest.get(`user?pageIndex=${page}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const searchUser = async (search) => {
    try {
      const res = await httpRequest.get(`user?search=${search}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
export const removeUser = async (id) => {
  try {
    const res = await httpRequest.post(`user/delete`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (id, name, active) => {
  try {
    const res = await httpRequest.post(`user/update`, { id, name, active });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAUser = async (id) => {
  try {
    const res = await httpRequest.get(`user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
