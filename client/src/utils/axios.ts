import axios from "axios";

export const axiosGet = async (url: string, params = {}) => {
  const res = await axios({
    url,
    method: "GET",
    params,
  });
  return res.data;
};
export const axiosPost = async (url: string, data: any) => {
  console.log(data);
  try {
    const res = await axios({
      url,
      method: "post",
      data,
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
