import * as httpRequest from "~/admin/utils/httpRequest";

export const getFeedBack = async () => {
  try {
    const res = await httpRequest.get(`feedback/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addFeedBack = async (content,rating) => {
    try {
      const res = await httpRequest.post(`feedback/add`,{content,rating});
      return res;
    } catch (error) {
      console.log(error);
    }
  };
export const removeFeedBack = async (id) => {
  try {
    const res = await httpRequest.post(`feedback/delete`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAFeedBack = async (id) => {
  try {
    const res = await httpRequest.get(`feedback/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
